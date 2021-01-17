import React, { useState, useEffect } from 'react'
import { Card, Text } from 'react-native-elements'
import { View } from 'react-native'
import auth from '@react-native-firebase/auth'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'

import DatabaseService from '../../services/DatabaseService'
import { numberToReal } from '../../utils/numberToReal'

import styles from './style'

interface SaldoProps {
  variant: number
}

const SaldoCaixa: React.FC<SaldoProps> = ({ variant }) => {
  const [saldoValue, setSaldoValue] = useState<number>(0)
  const [visibleShimmer, setVisibleShimmer] = useState<boolean>(true)
  const isFocused = useIsFocused()

  const loadSaldo = async () => {
    try {
      const response = await DatabaseService.get('/movimentacao_caixa/saldo/' + auth().currentUser?.uid)
      const { saldo } = response.data
      setSaldoValue(saldo)
      setVisibleShimmer(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadSaldo()
  }, [saldoValue, loadSaldo, isFocused])

  if (variant === 1) {
    return (
      <View style={styles.viewConfig}>
        <Card containerStyle={styles.cardConfig}>
          <ShimmerPlaceHolder style={{ height: 22, width: 150, borderRadius: 10 }} visible={!visibleShimmer}>
            <Text style={styles.textCard}>{numberToReal(Number(saldoValue))}</Text>
          </ShimmerPlaceHolder>
        </Card>
      </View>
    )
  }

  return (
    <ShimmerPlaceHolder style={{ height: 22, marginTop: -20, width: 150, borderRadius: 10 }} visible={!visibleShimmer}>
      {!visibleShimmer && (
        <Text style={styles.textCardInfo}>
          <Ionicons name='wallet-outline' size={25} /> Saldo: {numberToReal(Number(saldoValue))}
        </Text>
      )}
    </ShimmerPlaceHolder>
  )
}

export default SaldoCaixa
