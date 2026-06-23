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
  userFirebase: number
  product: string
  value: number
  paymode: string
  date: string
  type?: string
  uid: string
}

export interface AddTransactionProps {
  product: string
  value: string
  paymode?: string | null
  datetime: Date
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
  date: Date
  entries: number
  outflows: number
}
