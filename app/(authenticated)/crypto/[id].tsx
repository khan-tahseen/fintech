import { Image, ScrollView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { SharedValue } from 'react-native-reanimated';

const categories = ['Overview', 'News', 'Orders', 'Transaction'];
// const DATA = Array.from({ length: 31 }, (_, i) => ({
//     day: i,
//     highTmp: 40 + 30 * Math.random(),
// }));
function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
    return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const Details = () => {
    const { id } = useLocalSearchParams();
    const headerHeight = useHeaderHeight();
    const [activeIndex, setActiveIndex] = useState(0);
    const font = useFont(require('@/assets/fonts/SpaceMono-Regular.ttf'), 12);
    const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

    useEffect(() => {
        console.log(isActive);
        if (isActive) Haptics.selectionAsync();
    }, [isActive])

    const { data } = useQuery({
        queryKey: ['info', id],
        queryFn: async () => {
            const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
            return info[+id];
        },
    });

    const { data: tickers } = useQuery({
        queryKey: ['tickers'],
        queryFn: async (): Promise<any[]> => await fetch('/api/tickers').then(res => res.json())
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
                        <View style={[defaultStyles.block, { height: 500 }]}>
                            {tickers && (
                                <React.Fragment>
                                    {!isActive && <View>
                                        <Text style={{fontSize: 28, fontWeight: 'bold', color: Colors.dark}}>
                                            {tickers[tickers.length - 1]?.price.toFixed(2)} $
                                        </Text>
                                        <Text style={{fontSize: 16, color: Colors.gray}}>Today</Text>
                                    </View>}
                                    <CartesianChart data={tickers!} xKey="timestamp" yKeys={["price"]}
                                        chartPressState={state}
                                        axisOptions={{
                                            font,
                                            tickCount: 6,
                                            labelOffset: { x: -2, y: 0 },
                                            labelColor: Colors.gray,
                                            formatYLabel: (v) => `${v} $`,
                                            formatXLabel: (ms) => format(new Date(ms), 'MM/yy'),
                                        }}>
                                        {({ points }) => (
                                            <React.Fragment>
                                                <Line points={points.price} color="green" strokeWidth={3} />
                                                {isActive && <ToolTip x={state.x.position} y={state.y.price.position} />}
                                            </React.Fragment>
                                        )}
                                    </CartesianChart>
                                </React.Fragment>
                            )}
                        </View>
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
