import { ReportListProps } from '../../models/TransactionModel'
import { Button, Column, Row, Text } from '../../../../core/components'
import { formatCurrency } from '../../../../core/utils/formatters'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamsList } from '../../../../core/navigation/type'
import CaixaImage from '../../../../assets/caixa-reg.png'
import { ImageCashRegister } from '../styles/style'

export const TransactionReportItem = React.memo(
  ({
    item,
    type,
    navigationName
  }: {
    item: ReportListProps
    type: 'TransactionsByYear' | 'TransactionsByMonth'
    navigationName: 'TransactionDetailYear' | 'TransactionDetailMonth'
  }) => {
    const { navigate } =
      useNavigation<NativeStackNavigationProp<ParamsList, 'TransactionDetailYear' | 'TransactionDetailMonth'>>()

    return (
      <Button onPress={() => navigate(navigationName, { transactionDate: item.reportType, type: type })}>
        <Row width={1} height={80} p={18} border='0.5px solid #c1c1c1' justifyContent='flex-start' alignItems='center'>
          <ImageCashRegister source={CaixaImage} />
          <Column width={200} px={16} alignItems='flex-start'>
            <Text fontSize={16} color='text' fontWeight='bold'>
              {item.reportType}
            </Text>
            <Text fontSize={16} color='text'>
              {formatCurrency(item.balanceEntries - item.balanceOutflows)}
            </Text>
          </Column>
        </Row>
      </Button>
    )
  }
)
