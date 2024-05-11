import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

const lock = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [code, setCode] = useState<number[]>([]);

  useEffect(() => {
    if (code.length === 6) {
      console.log('code => ', code);
    }
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome Back, {firstName}</Text>
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
});
