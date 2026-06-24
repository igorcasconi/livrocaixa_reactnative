import { useCallback, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { useUser } from '../../../context/AuthContext'
import { TransactionProps } from '../models/TransactionModel'
import { useRealm } from '../../../context/RealmContext'

export const useTransactionViewmodel = (routeName: string) => {
  const { uid } = useUser()
  const isFocused = useIsFocused()
  const { transactionRepository } = useRealm()
  const [transactionListData, setTransactionListData] = useState<TransactionProps[]>([])
  const [needsUpdate, setNeedsUpdate] = useState(false)

  const isTypeRoute = routeName === 'Entries' ? 1 : 2
  const nameRouteNormalized = routeName === 'Entries' ? 'Entrada' : 'Saída'

  const getTransactionData = useCallback(() => {
    return transactionRepository.getTransactionData(routeName, uid!)
  }, [uid, routeName])

  const deleteTransactionItem = (uidTransaction: string) => {
    transactionRepository.deleteTransactionItem(uidTransaction)
    setNeedsUpdate(true)
  }

  useEffect(() => {
    if (isFocused) {
      const data = getTransactionData()
      setTransactionListData(data)
      setNeedsUpdate(false)
    }
  }, [isFocused, getTransactionData, needsUpdate])

  return {
    uid,
    isFocused,
    isTypeRoute,
    transactionListData,
    nameRouteNormalized,
    deleteTransactionItem
  }
}
