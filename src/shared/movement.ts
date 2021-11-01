export interface ReportListProps {
  date: string
  balance: number
}

export interface BalanceProps {
  data: { balance: number }[]
}

export interface MovementProps {
  id: number
  product: string
  value: number
  payMode: string
  date: string
  type?: string
}
