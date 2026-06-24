import { JSX } from 'react'

export interface TransactionDetailModel {
  data: {
    expenses: number
    entries: number
    cashTotal: number
    outflows: number
    year?: string
    month?: string
  }
}
export interface TransactionTypeModel {
  type: number
  color: string
  image: any
  icon: JSX.Element
}

export interface TransactionProps {
  userId: string
  product: string
  value: number
  paymode: string
  datetime: string
  type?: string
  uid: string
}

export interface AddTransactionProps {
  product: string
  value: number
  paymode?: string | null
  datetime: string
  uid: string
  type: string
}

export interface AddTransactionPayloadFormProps {
  product: string
  value: string
  datetime: Date
  type: string
  paymode?: string | null
}

export interface ReportListProps {
  key: 'month' | 'year'
  reportType: string
  balanceOutflows: number
  balanceEntries: number
  datetime: string
  entries: number
  outflows: number
}
