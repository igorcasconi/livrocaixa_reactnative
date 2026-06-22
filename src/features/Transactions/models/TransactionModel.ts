export interface TransactionDetailModel {
  data: {
    expenses: number
    gastos: number
    entries: number
    cashTotal: number
    outflows: number
    year?: string
    month?: string
  }
}
export interface TransactionTypeModel {
  typeMov: number
  colorMov: string
  imageMov: any
  typeMovDelete: number
  iconMov: JSX.Element
}

export interface TransactionProps {
  userFirebase: number
  product: string
  value: number
  paymode: string
  date: string
  type?: string
  index: number
}

export interface AddTransactionProps {
  product: string
  value: string
  paymode: string
  datetime: Date
}
