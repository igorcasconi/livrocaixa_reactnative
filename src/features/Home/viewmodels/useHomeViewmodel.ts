import { useCallback, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'

import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'
import { formatCurrency } from '../../../core/utils/formatters'

export const useHomeViewmodel = () => {
  const date = new Date()
  const { homeRepository } = useRealm()
  const { uid } = useUser()
  const isFocused = useIsFocused()

  const balanceCash = useCallback(() => formatCurrency(homeRepository.getBalance(uid!)), [uid, isFocused])

  useEffect(() => {
    balanceCash()
  }, [balanceCash])

  return { date, balanceCash }
}
