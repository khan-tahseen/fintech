import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { BlurView } from 'expo-blur';

const Account = () => {
    const { user } = useUser();
    const {signOut} = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);
  return (
    <BlurView intensity={60} style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      {user && (
        <View style={{alignItems: 'center'}}>
            {!edit && (
                <View style={styles.editRow}>
                    <Text>{firstName}</Text>
                </View>
            )}
        </View>
      )}
    </BlurView>
  );
};

export default Account;

const styles = StyleSheet.create({
    editRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },

});
