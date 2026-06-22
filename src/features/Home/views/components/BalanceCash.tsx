import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { Text } from '../../../../core/components/Text'
import { Row } from '../../../../core/components/Row'

interface BalanceCashProps {
  balanceCash: () => string
}

const BalanceCash: React.FC<BalanceCashProps> = ({ balanceCash }) => {
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
