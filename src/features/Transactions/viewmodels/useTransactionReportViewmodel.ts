import { useCallback, useEffect, useState } from 'react'
import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'
import { getAllTransactionForReport, reducedTransactionReportDataByMonthOrYear } from '../../../core/utils/date'
import { ReportListProps, TransactionProps } from '../models/TransactionModel'

export const useTransactionReportViewmodel = (type: string) => {
  const { uid } = useUser()
  const { realm } = useRealm()
  const [dataTransactionReport, setDataTransactionReport] = useState<ReportListProps[]>([])

  const getTransactionReport = useCallback(
    (isByMonth?: boolean) => {
      const transactions = realm?.objects('Transactions').filtered(`userId = "${uid}"`)
      const data = reducedTransactionReportDataByMonthOrYear(transactions?.toJSON(), isByMonth)
      return data as ReportListProps[]
    },
    [realm, uid]
  )

  const getReportTransactionDataForExcel = (dateFiltered: string, isByMonth?: boolean) => {
    const transactions = realm
      ?.objects('Transactions')
      .filtered(`userId = "${uid}"`)
      .toJSON() as unknown as TransactionProps[]
    const reportTransactionDataList = getAllTransactionForReport(transactions, dateFiltered, isByMonth)
    return reportTransactionDataList
  }

  useEffect(() => {
    const data = getTransactionReport(type === 'TransactionsByMonth')
    setDataTransactionReport(data)
  }, [getTransactionReport, type])

  return { dataTransactionReport, getReportTransactionDataForExcel }
}
