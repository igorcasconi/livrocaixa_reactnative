import React from 'react'

import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

import { TransactionReportRouteProp } from '../../../core/navigation/type'

import { Column } from '../../../core/components'
import { TransactionReportItem } from './components/TransactionReportItem'
import { useTransactionReportViewmodel } from '../viewmodels/useTransactionReportViewmodel'

const TransactionReport: React.FC = () => {
  const route = useRoute<TransactionReportRouteProp>()
  const type = route.name
  const { dataTransactionReport } = useTransactionReportViewmodel(type)

  return (
    <Column flex={1}>
      <FlatList
        data={dataTransactionReport}
        keyExtractor={(item, index) => `${index}-${item.date}`}
        renderItem={({ item, index }) => <TransactionReportItem item={item} index={index} type={type} />}
      />
    </Column>
  )
}

export default TransactionReport
