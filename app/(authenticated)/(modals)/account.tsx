import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);

    const onCaptureImage = () => {
        // Handle image capture logic here
        console.log('inside capture image..')
    }

    return (
        <BlurView intensity={60} tint='dark' style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingTop: 80 }}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
                    {user?.imageUrl && <Image />}
                </TouchableOpacity>

                {user && (
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        {!edit && (
                            <View style={styles.editRow}>
                                <Text style={[defaultStyles.sectionHeader, { color: '#fff' }]}>
                                    {firstName} {lastName}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons name='ellipsis-horizontal' size={24} color='#fff' />
                                </TouchableOpacity>
                            </View>
                        )}
                        {edit && (
                            <View style={styles.editRow}>
                                <TextInput
                                    placeholder='First Name'
                                    value={firstName || ''}
                                    onChangeText={setFirstName}
                                    style={styles.inputField}
                                />
                                <TextInput
                                    placeholder='Last Name'
                                    value={lastName || ''}
                                    onChangeText={setLastName}
                                    style={styles.inputField}
                                />
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons name='ellipsis-horizontal' size={24} color='#fff' />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </BlurView>
    );
};

export default Account;

const styles = StyleSheet.create({
    editRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    captureBtn: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 12
    },
    inputField: {
        width: 130,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 10,
        textAlign: 'center'
    }

});
