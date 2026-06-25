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
  const { dataTransactionReport, typeNavigation } = useTransactionReportViewmodel(type)

  return (
    <Column flex={1}>
      <FlatList
        data={dataTransactionReport}
        // @ts-ignore
        keyExtractor={item => `${item.uid}`}
        // @ts-ignore
        renderItem={({ item, index }) => (
          <TransactionReportItem item={item} type={type} navigationName={typeNavigation} />
        )}
      />
    </Column>
  )
}

export default TransactionReport
