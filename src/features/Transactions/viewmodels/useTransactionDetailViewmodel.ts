import { useEffect, useState } from 'react'
import { useUser } from '../../../context/AuthContext'
import { format } from 'date-fns'
import { ReportListProps } from '../models/TransactionModel'
import { useRealm } from '../../../context/RealmContext'

export const useTransactionDetailViewmodel = (transactionDate: string, type: string) => {
  const { uid } = useUser()
  const { transactionRepository } = useRealm()
  const isTypeYear = type === 'TransactionsByYear'
  const [transactionReportDetailData, setTransactionReportDetailData] = useState<ReportListProps>()

  const transactionScreenTitle = () => {
    if (isTypeYear) return `Ano ${transactionDate}`

    return `Mês ${transactionDate}`
  }

  useEffect(() => {
    const data = transactionRepository.getTransactionReportDetail(uid!, transactionDate, !isTypeYear)
    setTransactionReportDetailData(data)
  }, [type])

  return { isTypeYear, transactionScreenTitle, transactionReportDetailData }
}
