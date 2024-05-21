import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { BlurView } from 'expo-blur';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';

const ICONS = [
    {
        name: 'Default',
        icon: require('@/assets/images/icon.png'),
    },
    {
        name: 'Dark',
        icon: require('@/assets/images/icon-dark.png'),
    },
    {
        name: 'Vivid',
        icon: require('@/assets/images/icon-vivid.png'),
    }
]

const Account = () => {
    const { user } = useUser();
    const { signOut } = useAuth();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [edit, setEdit] = useState(false);
    const [activeIcon, setActiveIcon] = useState('Default');

    useEffect(() => {
        const loadCurrentIconPref = async () => {
            const icon = await getAppIcon();
            setActiveIcon(icon);
        }

        loadCurrentIconPref();
    }, [])

    const onCaptureImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.75,
            base64: true,
        });

        if (!result.canceled) {
            const base64 = `data:image/png;base64,${result.assets[0].base64}`;
            user?.setProfileImage({ file: base64 });
        }
    }

    const onChangeAppIcon = async (icon: string) => {
        await setAppIcon(icon.toLowerCase())
        setActiveIcon(icon);
    }

    const onSaveUser = async () => {
        try {
            await user?.update({
                firstName: firstName!,
                lastName: lastName!,
            })
            setEdit(false)
        } catch (error) {
            console.log('error saving user', error)
        }
    }

    return (
        <BlurView intensity={60} tint='dark' style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingTop: 80 }}>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={onCaptureImage} style={styles.captureBtn}>
                    {user?.imageUrl && <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />}
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
                                <TouchableOpacity onPress={onSaveUser}>
                                    <Ionicons name='checkmark-outline' size={24} color='#fff' />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.btn} onPress={() => console.log('Logout user')}>
                        <Ionicons name='log-out' size={24} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 18 }}>Log out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => console.log('Account')}>
                        <Ionicons name='person' size={24} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 18 }}>Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => console.log('Learn')}>
                        <Ionicons name='bulb' size={24} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 18 }}>Learn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => console.log('Inbox')}>
                        <Ionicons name='megaphone' size={24} color='#fff' />
                        <Text style={{ color: '#fff', fontSize: 18 }}>Inbox</Text>
                        <View style={styles.notify}>
                            <Text style={{ color: '#fff' }}>14</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.actions}>
                    {ICONS.map((icon, index) => (
                        <TouchableOpacity key={index} style={styles.btn} onPress={() => onChangeAppIcon(icon.name)}>
                            <Image source={icon.icon} style={{ width: 24, height: 24 }} />
                            <Text style={{ color: '#fff', fontSize: 18 }}>{icon.name}</Text>
                            {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
                                <Ionicons name='checkmark-outline' size={24} color='#fff' />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
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
        width: 130,
        height: 130,
        borderRadius: 70,
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
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 70
    },
    actions: {
        backgroundColor: 'rgba(256, 256, 256, 0.1)',
        borderRadius: 12,
        gap: 2,
        margin: 18,
        width: 320
    },
    btn: {
        padding: 12,
        gap: 18,
        flexDirection: 'row'
    },
    notify: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
        position: 'absolute',
        right: 8,
        top: 16,
        padding: 4
    }

});
