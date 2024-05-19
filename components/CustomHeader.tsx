import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    return (
        <BlurView intensity={90} tint="extraLight" style={{ paddingTop: top }}>
            <View style={styles.container}>
                <Link href='/(authenticated)/(modals)/account' asChild>
                    <TouchableOpacity style={styles.roundBtn}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>TA</Text>
                    </TouchableOpacity>
                </Link>

                <View style={styles.searchSection}>
                    <Ionicons name='search' size={24} color={Colors.dark} style={styles.icon} />
                    <TextInput placeholder='Search' placeholderTextColor={Colors.dark} style={styles.input} />
                </View>

                <View style={[styles.roundBtn, { backgroundColor: Colors.lightGray }]}>
                    <Ionicons name='stats-chart' size={24} color={Colors.dark} />
                </View>
                <View style={[styles.roundBtn, { backgroundColor: Colors.lightGray }]}>
                    <Ionicons name='card' size={24} color={Colors.dark} />
                </View>
            </View>
        </BlurView>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        gap: 8,
        paddingHorizontal: 16
    },
    roundBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.lightGray,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        paddingRight: 8,
        paddingLeft: 0
    },
    icon: {
        padding: 8
    }
});
