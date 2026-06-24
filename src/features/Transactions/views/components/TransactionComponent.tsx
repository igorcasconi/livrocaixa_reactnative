import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import TransactionListItem from './TransactionListItem'
import { useTransactionViewmodel } from '../../viewmodels/useTransactionViewmodel'
import { TransactionProps } from '../../models/TransactionModel'
import { Column } from '../../../../core/components/Column'
import { Button } from '../../../../core/components/Button'
import { Row } from '../../../../core/components/Row'
import { Text } from '../../../../core/components/Text'
import { AlertModal, useAlertModal } from '../../../../core/components/AlertModal'
import { ParamsList, TransactionsRouteProp } from '../../../../core/navigation/type'
import { TransactionListComponent } from '../styles/style'

const TransactionComponent: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamsList>>()
  const route = useRoute<TransactionsRouteProp>()
  const { nameRouteNormalized, deleteTransactionItem, transactionListData, isTypeRoute } = useTransactionViewmodel(
    route.name
  )
  const { visible, config, showAlert, hideAlert } = useAlertModal()

  const alertDeleteHandler = (uidTransaction: string) => {
    showAlert({
      title: 'Movimentações do Caixa',
      message: 'Deseja realmente excluir a movimentação?',
      buttons: [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: hideAlert
        },
        {
          text: 'EXCLUIR',
          style: 'destructive',
          onPress: () => deleteTransactionItem(uidTransaction)
        }
      ]
    })
  }

  return (
    <>
      <Column flex={1} width={1}>
        <Column width={1} minHeight={60} justifyContent='center' px={16} backgroundColor='#4db476'>
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
        <TransactionListComponent
          data={transactionListData}
          // @ts-ignore
          keyExtractor={(item: TransactionProps) => item.uid}
          // @ts-ignore
          renderItem={({ item }: { item: TransactionProps }) => (
            <TransactionListItem
              item={item}
              isTypeRoute={isTypeRoute}
              alertDeleteHandler={(_: string) => alertDeleteHandler(item.uid)}
            />
          )}
          updateCellsBatchingPeriod={50}
          maxToRenderPerBatch={50}
          initialNumToRender={10}
        />
      </Column>
      <AlertModal
        visible={visible}
        title={config.title}
        message={config.message}
        buttons={config.buttons}
        onDismiss={hideAlert}
      />
    </>
  )
}

export default TransactionComponent
