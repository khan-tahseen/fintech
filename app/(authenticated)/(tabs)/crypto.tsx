import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/interfaces/crypto'
import { Link } from 'expo-router'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

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
      {currencies.data?.map((currency: Currency) => (
        <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Image style={{ width: 32, height: 32 }} source={{ uri: data?.[currency.id].logo }} alt={currency.name} />
            <Text>{currency.name}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  )
}

export default Crypto

const styles = StyleSheet.create({})