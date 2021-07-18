import React from 'react'
import { Card } from 'react-native-elements'
import { ActivityIndicator, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { useUser } from '../../context/AuthContext'
import { getBalanceCash } from '../../services/movimentacao'
import { Text } from '../Text'
import { Row } from '../Row'

import { numberToReal } from '../../utils/numberToReal'
import styles from './style'

interface SaldoProps {
  variant: number
}

const BalanceCash: React.FC<SaldoProps> = ({ variant }) => {
  const isFocused = useIsFocused()
  const { uid } = useUser()

  const { data: dataBalance, isLoading: isGettingBalance } = useQuery(['balanceGetter', isFocused, uid], () =>
    getBalanceCash({ uid })
  )

  if (variant === 1) {
    return (
      <Row justifyContent='center' alignItems='center'>
        <Card containerStyle={styles.cardConfig}>
          <Text fontSize={16} fontWeight='bold'>
            {dataBalance?.data && numberToReal(dataBalance?.data[0].balance)}
          </Text>
        </Card>
      </Row>
    )
  }

  return (
    <Row minWidth={110} alignItems='center' px='8px' py='4px' backgroundColor='white' borderRadius={14}>
      <Ionicons name='wallet-outline' size={25} />
      {isGettingBalance ? (
        <Row ml='6px'>
          <ActivityIndicator size='small' color='#4db476' />
        </Row>
      ) : (
        <Text fontSize={16} fontWeight='bold' color='black' ml='6px' mr='6px'>
          {dataBalance?.data && numberToReal(dataBalance?.data[0].balance)}
        </Text>
      )}
    </Row>
  )
}

export default BalanceCash
