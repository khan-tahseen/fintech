import { Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

const Details = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();

    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
            return info[+id];
        },
    });
    console.log('id => ', id);
    return (
        <React.Fragment>
            <Stack.Screen options={{ title: data?.name }} />
            <SectionList
                style={{ marginTop: headerHeight }}
                contentInsetAdjustmentBehavior="automatic"
                sections={[{ data: [{ title: 'Chart' }] }]}
                keyExtractor={(i) => i.title}
                ListHeaderComponent={() => (
                    <React.Fragment>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.subTitle}>{data?.symbol}</Text>
                            <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8, margin: 12 }}>
                            <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primary, flexDirection: 'row', gap: 14 }]}>
                                <Ionicons name='add' size={24} color={'#fff'} />
                                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 14 }]}>
                                <Ionicons name='arrow-back' size={24} color={Colors.primary} />
                                <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                )}
                renderItem={({ item }) => (
                    <React.Fragment>
                        <View style={[defaultStyles.block, { marginTop: 18 }]}>
                            <Text style={styles.subTitle}>Overview</Text>
                            <Text style={{ color: Colors.gray }}>
                                Bitcoin is the first decentralized cryptocurrency. Nodes in the
                                peer-to-peer bitcoin network verify transactions through
                                cryptography and record them in a public distributed ledger,
                                called a blockchain, without central oversight.
                            </Text>
                        </View>
                    </React.Fragment>
                )}
            />
        </React.Fragment>
    );
};

export default Details;

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 14,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        color: Colors.gray,
    },
});
