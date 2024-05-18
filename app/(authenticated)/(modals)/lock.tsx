import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const lock = () => {
  const { user } = useUser();
  const router = useRouter()
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);

  useEffect(() => {
    if (code.length === 6) {
      console.log('code => ', code);
      if (code.join('') === '123456') {
        router.push('/(authenticated)/(tabs)/home');
      } else {
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
    // Perform biometric authentication here
  }

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome Back, {firstName}</Text>
      <View style={styles.codeView}>
        {codeLength.map((_, index) => (
          <View key={index} style={[styles.codeEmpty, {
            backgroundColor: code[index] ? Colors.primary : '#ccc',
          }]} />
        ))}
      </View>

      <View style={styles.numbersView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity style={{padding: 12}} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity style={{padding: 12}} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity style={{padding: 12}} key={number} onPress={() => onNumberPress(number)}>
              <Text style={styles.numbers}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{padding: 12}} onPress={onBiometricAuthPress}>
              <MaterialCommunityIcons name='face-recognition' size={26} color='#000' />
            </TouchableOpacity>

            <TouchableOpacity style={{padding: 12}} onPress={() => onNumberPress(0)}>
              <Text style={styles.numbers}>0</Text>
            </TouchableOpacity>

          <View style={{minWidth: 30}}>
            {code.length > 0 && (
            <TouchableOpacity style={{padding: 12}} onPress={numberBackspace}>
              <MaterialCommunityIcons name='backspace-outline' size={26} color='#000' />
            </TouchableOpacity>
            )}
          </View>
        </View>
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
    // backgroundColor: '#ccc',
  },
  numbersView: {
    marginHorizontal: 60,
    gap: 40
  },
  numbers: {
    fontSize: 28
  }
});
