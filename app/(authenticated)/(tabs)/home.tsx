import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import RoundBtn from '@/components/RoundBtn';
import Dropdown from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const { balance, transactions, runTransactions, clearTransactions } =
    useBalanceStore();
  const onAddMoney = () => {
    runTransactions({
      id: Math.random().toString(36).substring(7),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: 'Added Money',
    });
  };
  return (
    <ScrollView style={{ backgroundColor: Colors.background }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn text="Add money" icon={'add'} onPress={onAddMoney} />
        <RoundBtn
          text="Exchange"
          icon={'refresh'}
          onPress={clearTransactions}
        />
        <RoundBtn text="Details" icon={'list'} />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <View style={styles.transaction}>
        {transactions.length === 0 && (
          <Text style={styles.noTrans}>No transaction yet</Text>
        )}
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transDetails}>
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? 'add' : 'remove'}
                color={Colors.dark}
                size={24}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '500' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction?.date.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text>{transaction.amount}$</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  account: {
    margin: 70,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  balance: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  },
  transaction: {
    marginHorizontal: 18,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 12,
  },
  noTrans: {
    padding: 4,
    color: Colors.gray,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
});
