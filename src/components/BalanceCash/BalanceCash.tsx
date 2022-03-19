import React, { useCallback, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused } from '@react-navigation/native'

import { useUser } from '../../context/AuthContext'
import { Text } from '../Text'
import { Row } from '../Row'

import { formatCurrency } from '../../utils/formatters'
import { useRealm } from '../../context/RealmContext'

interface BalanceCashProps {
  needUpdateBalance?: boolean
}

const BalanceCash: React.FC<BalanceCashProps> = ({ needUpdateBalance }) => {
  const { uid } = useUser()
  const { getBalanceCash } = useRealm()
  const isFocused = useIsFocused()

  const balanceCash = useCallback(() => formatCurrency(getBalanceCash(uid)), [
    getBalanceCash,
    uid,
    isFocused,
    needUpdateBalance
  ])

  useEffect(() => {
    if (needUpdateBalance) balanceCash()
  }, [needUpdateBalance, balanceCash])

  return (
    <Row minWidth={110} alignItems='center' px='8px' py='4px' backgroundColor='white' borderRadius={14}>
      <Ionicons name='wallet-outline' size={25} />
      <Text fontSize={16} fontWeight='bold' color='black' ml='6px' mr='6px'>
        {balanceCash()}
      </Text>
    </Row>
  )
}

export default BalanceCash
