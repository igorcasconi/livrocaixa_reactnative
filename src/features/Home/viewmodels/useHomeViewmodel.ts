import { useCallback, useEffect, useState } from 'react'
import { useUser } from '../../../context/AuthContext'
import { getValueStorage } from '../../../core/utils/storage'
import { useRealm } from '../../../context/RealmContext'
import { formatCurrency } from '../../../core/utils/formatters'
import { useIsFocused } from '@react-navigation/native'

export const useHomeViewmodel = () => {
  const date = new Date()
  const [hasConfirmedTerm, setConfirmedTerm] = useState<boolean>(true)
  const { realm, createUserFirebase, isWritingOnlineData } = useRealm()
  const { uid } = useUser()
  const isFocused = useIsFocused()

  const verifyStatusConfirmationTerm = async () => {
    const hasConfirmAlert = await getValueStorage('@terms')

    if (!Boolean(hasConfirmAlert)) return setConfirmedTerm(false)
  }

  const setUserFirebaseId = (uid?: string | null) => {
    if (!!realm?.objects('UserData').length) return

    !!uid && createUserFirebase(uid)
  }

  const getBalanceCash = (uid?: string | null): number => {
    const transactions = realm?.objects('FinancialMovement').filtered(`userFirebase = "${uid}"`)
    const entriesValues = transactions?.filtered('type = "Entries"').sum('value')
    const outflowsValues = transactions?.filtered('type = "Outflows"').sum('value')
    const balanceCash = Number(entriesValues) - Number(outflowsValues)
    return balanceCash
  }

  const balanceCash = useCallback(() => formatCurrency(getBalanceCash(uid)), [getBalanceCash, uid, isFocused])

  useEffect(() => {
    balanceCash()
  }, [balanceCash])

  useEffect(() => {
    verifyStatusConfirmationTerm()
    setUserFirebaseId(uid)
  }, [hasConfirmedTerm, uid])

  return { date, isWritingOnlineData, hasConfirmedTerm, setConfirmedTerm, verifyStatusConfirmationTerm, balanceCash }
}
