import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { isClerkAPIResponseError, useSignIn } from '@clerk/clerk-expo';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const router = useRouter();
  const { signIn } = useSignIn();
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 85 : 0;

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        // @ts-ignore
        const { supportedFirstFactors } = await signIn?.create({
          identifier: fullPhoneNumber,
        });
        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor: any) => {
            return factor.strategy === 'phone_code';
          }
        );
        const { phoneNumberId } = firstPhoneFactor;

        await signIn?.prepareFirstFactor({
          strategy: 'phone_code',
          phoneNumberId,
        });

        router.push({
          pathname: '/verify/[phone]',
          params: { phone: fullPhoneNumber, signin: 'true' },
        });
      } catch (error) {
        console.log('Error while signing in: ', error);
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === 'form_identifier_not_found') {
            Alert.alert('Error', error.errors[0].message);
          }
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your mobile number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="+1"
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber ? styles.enabled : styles.disabled,
            { marginVertical: 18 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={styles.oneLine} />
          <Text style={{ color: Colors.gray, fontSize: 18 }}>OR</Text>
          <View style={styles.oneLine} />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[defaultStyles.pillButton, styles.socialButton]}
        >
          <Ionicons name="mail" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[defaultStyles.pillButton, styles.socialButton]}
        >
          <Ionicons name="logo-google" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[defaultStyles.pillButton, styles.socialButton]}
        >
          <Ionicons name="logo-apple" size={24} color={'#000'} />
          <Text style={[defaultStyles.buttonText, { color: '#000' }]}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 18,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 18,
    borderRadius: 12,
    fontSize: 18,
    marginRight: 12,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  oneLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
  },
  socialButton: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#fff',
    marginTop: 18,
  },
});

export default Login;
