import { SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Details = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  console.log('id => ', id);
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: 'Bitcoin' }} />
      <SectionList
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        sections={[{ data: [{ title: 'Chart' }] }]}
        keyExtractor={(i) => i.title}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}>
            <Text style={styles.subTitle}>BTC</Text>
          </View>
        )}
        renderItem={({ item }) => <React.Fragment>
            <View style={[defaultStyles.block, {marginTop: 18}]}>
                <Text style={styles.subTitle}>Overview</Text>
            </View>
        </React.Fragment>}
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
    color: Colors.gray
  }
});
