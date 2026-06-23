import { useIsFocused } from '@react-navigation/native'
import { useUser } from '../../../context/AuthContext'
import { useState } from 'react'
import { useRealm } from '../../../context/RealmContext'
import { Alert } from 'react-native'

export const useTransactionViewmodel = (routeName: string) => {
  const { uid } = useUser()
  const isFocused = useIsFocused()
  const [isDeletedMovement, setDeletedMovement] = useState<boolean>(false)

  const isTypeRoute = routeName === 'Entries' ? 1 : 2
  const { financialMovementList, deleteFinancialMovement } = useRealm()

  const transactionListData = financialMovementList(routeName, uid)

  const nameRouteNormalized = routeName === 'Entries' ? 'Entrada' : 'Saída'

  const alertDeleteHandler = (index: number) => {
    Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'EXCLUIR',
        onPress: async () => {
          await deleteFinancialMovement(index)
          setDeletedMovement(true)
        }
      }
    ])
  }

  return {
    uid,
    isFocused,
    isDeletedMovement,
    isTypeRoute,
    transactionListData,
    nameRouteNormalized,
    alertDeleteHandler
  }
}
