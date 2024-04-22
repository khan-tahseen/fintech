import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/interfaces/crypto'
import { Link } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Ionicons } from '@expo/vector-icons'

const Crypto = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryKey: ['listings'],
    queryFn: () => fetch('/api/listings').then(res => res.json())
  })

  const ids = currencies.data?.map((currency: Currency) => currency.id).join(',');
  
  const { data } = useQuery({
    queryKey: ['info', ids],
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    enabled: !!ids
  })

  return (
    <ScrollView style={{ backgroundColor: Colors.background }} contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity style={{ flexDirection: 'row', gap: 14, alignItems: 'center' }}>
              <Image style={{ width: 32, height: 32 }} source={{ uri: data?.[currency.id].logo }} alt={currency.name} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={{ fontWeight: '600', color: Colors.dark }}>{currency.name}</Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View style={{gap: 6, alignItems: 'flex-end'}}>
                <Text>{currency.quote.EUR.price.toFixed(2)} $</Text>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <Ionicons
                    name={currency.quote.EUR.percent_change_1h > 0 ? 'arrow-up' : 'arrow-down'}
                    size={16}
                    color={currency.quote.EUR.percent_change_1h > 0 ? '#02bc02' : '#ff0000'} />
                  <Text style={{ color: currency.quote.EUR.percent_change_1h > 0 ? '#02bc02' : '#ff0000', fontWeight: '600' }}>
                    {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  )
}

export default Crypto

const styles = StyleSheet.create({})