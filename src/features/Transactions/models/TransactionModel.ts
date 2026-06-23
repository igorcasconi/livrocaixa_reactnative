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
  paymode: string
  datetime: Date
  uid: string
}

export interface AddTransactionPayloadFormProps {
  product: string
  value: number
  paymode: string
  date: Date
  time: string
  type: string
}
