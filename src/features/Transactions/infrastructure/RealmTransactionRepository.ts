import {
  getAllTransactionForReport,
  reducedTransactionReportDataByMonthOrYear,
  sortByDate
} from '../../../core/utils/date'
import { TransactionRepository } from '../models/repositories/TransactionsRepository'
import { AddTransactionProps, ReportListProps, TransactionProps } from '../models/TransactionModel'

export class RealmTransactionRepository implements TransactionRepository {
  constructor(private realm: Realm | null) {}
  createTransaction(payload: AddTransactionProps, userId: string): void {
    this.realm?.write(() =>
      this.realm?.create('Transactions', {
        userId: userId,
        product: payload.product,
        value: payload.value,
        paymode: payload.paymode,
        datetime: payload.datetime,
        type: payload.type,
        uid: payload.uid
      })
    )
  }

  getTransactionData(routeName: string, userId: string): TransactionProps[] {
    const data = this.realm?.objects('Transactions').filtered(`userId = "${userId}"`)
    const transactionDataFiltered = data?.filtered(`type = "${routeName}"`)
    const json = (transactionDataFiltered?.toJSON() ?? []) as unknown as TransactionProps[]
    return sortByDate(json, true)
  }
  deleteTransactionItem(uid: string): void {
    const transactionList = this.realm?.objects('Transactions')
    let deletedItem = transactionList?.filtered(`uid = "${uid}"`)
    this.realm?.write(() => this.realm?.delete(deletedItem))
  }

  getTransactionReport(userId: string, isByMonth?: boolean): ReportListProps[] {
    const transactions = this.realm?.objects('Transactions').filtered(`userId = "${userId}"`)
    const data = reducedTransactionReportDataByMonthOrYear(transactions?.toJSON(), isByMonth)
    return data as ReportListProps[]
  }

  getTransactionReportDetail(userId: string, date: string, isByMonth?: boolean): ReportListProps {
    const transactions = this.realm?.objects('Transactions').filtered(`userId = "${userId}"`)
    const data = reducedTransactionReportDataByMonthOrYear(transactions?.toJSON(), isByMonth)
    const filteredData = (data as ReportListProps[]).find(item => item.reportType.toString() === date)
    return filteredData as ReportListProps
  }
}
