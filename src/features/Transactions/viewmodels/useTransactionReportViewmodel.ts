import { useEffect, useState } from 'react'

import { ReportListProps } from '../models/TransactionModel'

import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'

export const useTransactionReportViewmodel = (type: string) => {
  const { uid } = useUser()
  const { transactionRepository } = useRealm()
  const [dataTransactionReport, setDataTransactionReport] = useState<ReportListProps[]>([])

  useEffect(() => {
    const data = transactionRepository.getTransactionReport(uid!, type === 'TransactionsByMonth')
    setDataTransactionReport(data)
  }, [type])

  return { dataTransactionReport }
}
