import { useEffect, useState } from 'react'

import { ReportListProps } from '../models/TransactionModel'

import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'
import { ParamsList } from '../../../core/navigation/type'

export const useTransactionReportViewmodel = (type: string) => {
  const { uid } = useUser()
  const { transactionRepository } = useRealm()
  const [dataTransactionReport, setDataTransactionReport] = useState<ReportListProps[]>([])

  const typeNavigation: keyof ParamsList =
    type === 'TransactionsByYear' ? 'TransactionDetailYear' : 'TransactionDetailMonth'

  useEffect(() => {
    const data = transactionRepository.getTransactionReport(uid!, type === 'TransactionsByMonth')
    setDataTransactionReport(data)
  }, [type])

  return { dataTransactionReport, typeNavigation }
}
