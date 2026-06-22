import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// @ts-ignore
import styled from 'styled-components/native'

import { Column } from '../../../../core/components/Column'
import { Button } from '../../../../core/components/Button'
import { Row } from '../../../../core/components/Row'
import { Text } from '../../../../core/components/Text'
import { TransactionProps } from '../../models/TransactionModel'
import { ParamsList, TransactionsRouteProp } from '../../../../core/navigation/type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TransactionListItem from './TransactionListItem'
import { useTransactionViewmodel } from '../../viewmodels/useTransactionViewmodel'

const TransactionComponent: React.FC<TransactionProps> = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamsList>>()
  const route = useRoute<TransactionsRouteProp>()
  const { nameRouteNormalized, alertDeleteHandler, dataFinancialMovement, isTypeRoute } = useTransactionViewmodel(
    route.name
  )

  return (
    <Column flex={1} height='100%' width={1} mt={60}>
      <Column width={1} minHeight={60} justifyContent='center' px={16} backgroundColor='#4db476' zIndex={99}>
        <Row width={1} justifyContent='space-between' alignItems='center'>
          <Button
            width={110}
            height={40}
            backgroundColor='#3585e7'
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
            onPress={() => navigate('AddTransaction', { type: isTypeRoute })}
          >
            <Text fontSize={12} color='white' textAlign='center'>
              Adicionar {nameRouteNormalized}
            </Text>
          </Button>
        </Row>
      </Column>
      <MovementList
        data={dataFinancialMovement ?? ([] as TransactionProps[])}
        keyExtractor={(item, index) => `${item.uid}-${index}`}
        renderItem={({ item }) => (
          <TransactionListItem data={item} isTypeRoute={isTypeRoute} alertDeleteHandler={alertDeleteHandler} />
        )}
        updateCellsBatchingPeriod={50}
        maxToRenderPerBatch={50}
        initialNumToRender={20}
      />
    </Column>
  )
}

const MovementList = styled.FlatList`
  height: 100%;
  flex: 1;
  width: 100%;
`

export default TransactionComponent
