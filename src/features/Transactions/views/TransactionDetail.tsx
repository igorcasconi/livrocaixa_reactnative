import React, { Fragment } from 'react'
import { ScrollView } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useRoute } from '@react-navigation/native'

import { useTransactionDetailViewmodel } from '../viewmodels/useTransactionDetailViewmodel'
import { Column, Row, Text } from '../../../core/components'
import { TransactionDetailRouteProp } from '../../../core/navigation/type'
import caixaImg from '../../../assets/caixa-reg.png'
import { ImageCard, StyledCard } from './styles/style'
import { formatCurrency } from '../../../core/utils/formatters'

const TransactionDetail: React.FC = () => {
  const route = useRoute<TransactionDetailRouteProp>()
  const { transactionDate, type } = route.params
  const { transactionScreenTitle, transactionReportDetailData } = useTransactionDetailViewmodel(
    transactionDate.toString(),
    type
  )

  if (!transactionReportDetailData) return <Column flex={1} width={1} />

  return (
    <ScrollView>
      <Column width={1} height='100%' flex={1} px={20}>
        <StyledCard width={1} minHeight={400} backgroundColor='white' p={20} borderRadius={8} mt={20}>
          <Row
            width={1}
            height={30}
            pb={10}
            borderBottomWidth={0.2}
            borderBottomColor='#c1c1c1'
            justifyContent='center'
            alignItems='center'
            mb={20}
          >
            <Text fontSize={16} color='#777777' fontWeight='bold'>
              {transactionScreenTitle()}
            </Text>
          </Row>
          <Fragment>
            <Row width={1} justifyContent='center' alignItems='center' mb={20}>
              <ImageCard source={caixaImg} />
            </Row>

            <Text fontSize={20} fontWeight='bold' mb={10}>
              <Ionicons name='wallet-outline' size={20} color='green' /> Saldo:{' '}
              {formatCurrency(
                transactionReportDetailData?.balanceEntries - transactionReportDetailData?.balanceOutflows
              )}
            </Text>
            <Text fontSize={20} fontWeight='bold' mb={10}>
              <Ionicons name='wallet-outline' size={20} color='red' /> Gastos:{' '}
              {formatCurrency(transactionReportDetailData.balanceOutflows)}
            </Text>
            <Text fontSize={20} mb={2}>
              Quantidades de Movimentações
            </Text>
            <Text fontSize={15}>
              <Ionicons name='arrow-up-circle-outline' size={15} color='green' /> Entradas:{' '}
              {transactionReportDetailData.entries}
            </Text>
            <Text fontSize={15}>
              <Ionicons name='arrow-down-circle-outline' size={15} color='red' /> Saídas:{' '}
              {transactionReportDetailData.outflows}
            </Text>
          </Fragment>
        </StyledCard>
      </Column>
    </ScrollView>
  )
}

export default TransactionDetail
