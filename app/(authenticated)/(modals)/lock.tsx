import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

const lock = () => {
  const { user } = useUser();
  const router = useRouter()
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const offset = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value },
      ],
    };
  })
  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      console.log('code => ', code);
      if (code.join('') === '555555') {
        router.push('/(authenticated)/(tabs)/home');
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        )
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  }

  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  }

  const onBiometricAuthPress = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.push('/(authenticated)/(tabs)/home');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.log('Biometric authentication failed');
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome Back, {firstName}</Text>
      <Animated.View style={[styles.codeView, style]}>
        {codeLength.map((_, index) => (
          <View key={index} style={[styles.codeEmpty, {
            backgroundColor: code[index] ? Colors.primary : '#ccc',
          }]} />
        ))}
      </Animated.View>

      <View style={styles.numbersView}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity style={{ padding: 12 }} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity style={{ padding: 12 }} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity style={{ padding: 12 }} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={{ padding: 12 }} onPress={onBiometricAuthPress}>
            <MaterialCommunityIcons name='face-recognition' size={26} color='#000' />
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 12 }} onPress={() => onNumberPress(0)}>
            <Text style={styles.numbers}>0</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 26 }}>
            {code.length > 0 && (
              <TouchableOpacity style={{ padding: 12 }} onPress={numberBackspace}>
                <MaterialCommunityIcons name='backspace-outline' size={26} color='#000' />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.forgot}>Forgot your passcode?</Text>
      </View>
    </SafeAreaView>
  );
};

export default lock;

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 80,
    alignSelf: 'center',
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
    gap: 20
  },
  codeEmpty: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  numbersView: {
    marginHorizontal: 60,
    gap: 40
  },
  numbers: {
    fontSize: 28
  },
  forgot: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: Colors.primary,
  },
});
