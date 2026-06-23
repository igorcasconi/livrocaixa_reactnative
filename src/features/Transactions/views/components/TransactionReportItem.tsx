import { format } from 'date-fns'
import { ReportListProps } from '../../models/TransactionModel'
import { Button, Column, Row, Text } from '../../../../core/components'
import { formatCurrency } from '../../../../core/utils/formatters'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ParamsList } from '../../../../core/navigation/type'
import { Image } from 'react-native'
import CaixaImage from '../../../../assets/caixa-reg.png'
import { TransactionReportStyles } from '../styles/style'
import { ptBR } from 'date-fns/locale'

export const TransactionReportItem = React.memo(
  ({
    item,
    index,
    type
  }: {
    item: ReportListProps
    index: number
    type: 'TransactionsByYear' | 'TransactionsByMonth'
  }) => {
    const { navigate } = useNavigation<NativeStackNavigationProp<ParamsList>>()

    const balance = item.balanceEntries - item.balanceOutflows
    const itemName =
      type === 'TransactionsByYear'
        ? format(new Date(item.date), 'yyyy')
        : format(new Date(item.date), 'MMMM/yyyy', { locale: ptBR })
    const typeNavigation = type === 'TransactionsByYear' ? 'TransactionDetailYear' : 'TransactionDetailMonth'

    return (
      <Button key={index} onPress={() => navigate(typeNavigation, { transactionDate: item.date, type: type })}>
        <Row width={1} height={80} p={18} border='0.5px solid #c1c1c1' justifyContent='flex-start' alignItems='center'>
          <Image source={CaixaImage} style={TransactionReportStyles.imageCaixa} />
          <Column width={200} px={16} alignItems='flex-start'>
            <Text fontSize={16} color='#21262c' fontWeight='bold'>
              {itemName}
            </Text>
            <Text fontSize={16} color='#21262c'>
              {formatCurrency(balance)}
            </Text>
          </Column>
        </Row>
      </Button>
    )
  }
)
