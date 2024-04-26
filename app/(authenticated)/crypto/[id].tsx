import { Image, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';

const categories = ['Overview', 'News', 'Orders', 'Transaction'];

const Details = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);

    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
            return info[+id];
        },
    });

    return (
        <React.Fragment>
            <Stack.Screen options={{ title: data?.name }} />
            <SectionList
                style={{ marginTop: headerHeight }}
                contentInsetAdjustmentBehavior="automatic"
                sections={[{ data: [{ title: 'Chart' }] }]}
                keyExtractor={(i) => i.title}
                renderSectionHeader={() => (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.sectionHeader}>
                        {categories.map((item, index) => (
                            <TouchableOpacity style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                onPress={() => setActiveIndex(index)}
                                key={index}>
                                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                ListHeaderComponent={() => (
                    <React.Fragment>
                        <View style={styles.listHeader}>
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
                        <View style={{height: 500, backgroundColor: 'green'}}></View>
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
    listHeader: {
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
    sectionHeader: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 8,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.lightGray,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    categoryText: {
        fontSize: 14,
        color: Colors.gray,
    },
    categoryTextActive: {
        fontSize: 14,
        color: Colors.dark,
    },
    categoriesBtn: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18
    },
    categoriesBtnActive: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: '#fff',
    }
});
