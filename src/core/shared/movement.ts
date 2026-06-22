export interface ReportListProps {
  [key: string]: string | number | Date
  date: Date
  balanceOutflows: number
  balanceEntries: number
  entries: number
  outflows: number
}

export interface BalanceProps {
  data: { balance: number }[]
}

export interface MovementPayloadProps {
  product: string
  value: number
  paymode: string
  date: Date
  time: string
  type: string
  index?: number
}
