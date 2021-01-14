export interface MovProps {
  product: string
  value: string
  paymode: string
  datetime: Date
}

export interface MovPayloadProps {
  product: string
  value: number
  paymode: string
  date: string
  time: string
}
