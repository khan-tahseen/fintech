import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MARGIN, SIZE } from './Config';
import { useBalanceStore } from '@/store/balanceStore';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface TileProps {
    id: string;
    onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
    const { transactions } = useBalanceStore();

    if (id === 'spent') {
        return (
            <View style={styles.container} pointerEvents="none">
                <Text style={styles.text}>Spent this month</Text>
                <Text style={styles.spentValue}>2024$</Text>
            </View>
        );
    }

    if (id === 'cashback') {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: 'center', alignItems: 'center' },
                ]}
                pointerEvents="none"
            >
                <View style={styles.cashbackContainer}>
                    <View style={styles.cashbackValueContainer}>
                        <Text style={[styles.spentValue, {color: 'white', marginBottom: 8}]}>5%</Text>
                    </View>
                    <Text style={styles.text}>Cashback</Text>
                </View>
            </View>
        );
    }

    if (id === 'recent') {
        return (
            <View style={styles.container} pointerEvents="none">
                <Text style={styles.text}>Recent Transactions</Text>

                {transactions.length === 0 && (
                    <Text style={[styles.text, { paddingTop: 12 }]}>No transactions</Text>
                )}

                {transactions.length > 0 && (
                    <React.Fragment>
                        <Text style={[styles.spentValue, { paddingBottom: 12 }]}>
                            {transactions[transactions.length - 1].amount}
                        </Text>
                        <Text style={styles.text}>
                            {transactions[transactions.length - 1].title}
                        </Text>
                    </React.Fragment>
                )}
            </View>
        );
    }

    if (id === 'cards') {
        return (
            <View style={styles.container} pointerEvents="none">
                <Text style={styles.text}>Cards</Text>
                <Ionicons
                    name="card"
                    size={48}
                    color={Colors.primaryMuted}
                    style={{ marginTop: 18, alignSelf: 'center' }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: SIZE - 20,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 12,
        alignSelf: 'center',
    },
    text: {
        color: Colors.gray,
        fontWeight: '500',
        fontSize: 16,
    },
    spentValue: {
        color: Colors.dark,
        fontWeight: 'bold',
        fontSize: 24,
        paddingTop: 12,
    },
    cashbackValueContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cashbackContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },
});

export default Tile;
