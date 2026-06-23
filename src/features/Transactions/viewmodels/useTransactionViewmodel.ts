import { useIsFocused } from '@react-navigation/native'
import { useUser } from '../../../context/AuthContext'
import { useCallback, useEffect, useState } from 'react'
import { useRealm } from '../../../context/RealmContext'
import { Alert } from 'react-native'
import { TransactionProps } from '../models/TransactionModel'
import { sortByDate } from '../../../core/utils/date'

export const useTransactionViewmodel = (routeName: string) => {
  const { uid } = useUser()
  const isFocused = useIsFocused()
  const [transactionListData, setTransactionListData] = useState<TransactionProps[]>([])
  const { realm } = useRealm()

  const isTypeRoute = routeName === 'Entries' ? 1 : 2
  const nameRouteNormalized = routeName === 'Entries' ? 'Entrada' : 'Saída'

  const getTransactionData = useCallback(() => {
    const data = realm?.objects('Transactions').filtered(`userFirebase = "${uid}"`)
    const transactionDataFiltered = data?.filtered(`type = "${routeName}"`)
    const json = (transactionDataFiltered?.toJSON() ?? []) as unknown as TransactionProps[]
    return sortByDate(json, true)
  }, [realm, uid, routeName])

  const deleteTransactionItem = (uidTransaction: string) => {
    const transactionList = realm?.objects('Transactions')
    let deletedItem = transactionList?.filtered(`uid = "${uidTransaction}"`)
    realm?.write(() => realm.delete(deletedItem))
    setTransactionListData(prev => prev.filter(item => item.uid !== uidTransaction))
  }

  const alertDeleteHandler = (uidTransaction: string) => {
    Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'EXCLUIR',
        onPress: async () => {
          deleteTransactionItem(uidTransaction)
        }
      }
    ])
  }

  useEffect(() => {
    if (isFocused) {
      const data = getTransactionData()
      setTransactionListData(data || [])
    }
  }, [isFocused, getTransactionData])

  return {
    uid,
    isFocused,
    isTypeRoute,
    transactionListData,
    nameRouteNormalized,
    alertDeleteHandler
  }
}
