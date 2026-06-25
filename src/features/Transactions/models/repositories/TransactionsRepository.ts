import { AddTransactionProps, ReportListProps, TransactionProps } from '../TransactionModel'

export interface TransactionRepository {
  createTransaction(payload: AddTransactionProps, userId: string): void
  getTransactionData(routeName: string, userId: string): TransactionProps[]
  deleteTransactionItem(uid: string): void
  getTransactionReport(userId: string, isByMonth?: boolean): ReportListProps[]
  getTransactionReportDetail(userId: string, date: string, isByMonth?: boolean): ReportListProps
}
