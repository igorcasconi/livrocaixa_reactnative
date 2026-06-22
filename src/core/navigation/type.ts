import { RouteProp } from '@react-navigation/native'

type ParamsAddMov = {
  type: number
}

type ParamsCompletionForgotPass = {
  email: string
}

type ParamsMovementDetail = {
  dateMovement: Date | string
  type: string
}

type MovementsProps = {
  isRefetchRequest?: boolean
}

export type ParamsList = {
  Home: undefined
  AddTransaction: ParamsAddMov
  Entries: MovementsProps
  Outflows: MovementsProps
  TransactionsByYear: undefined
  TransactionsByMonth: undefined
  Tutorial: undefined
  TransactionDetailYear: ParamsMovementDetail
  TransactionDetailMonth: ParamsMovementDetail
  About: undefined
  PolicyPrivacy: undefined
}

export type ParamsListLogin = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  CompletionForgotPass: ParamsCompletionForgotPass
}

export type AddTransactionRouteProp = RouteProp<ParamsList, 'AddTransaction'>
export type CompletionForgotPassRouteProp = RouteProp<ParamsListLogin, 'CompletionForgotPass'>
export type TransactionDetailRouteProp = RouteProp<ParamsList, 'TransactionDetailYear' | 'TransactionDetailMonth'>
export type TransactionReportRouteProp = RouteProp<ParamsList, 'TransactionsByYear' | 'TransactionsByMonth'>
export type TransactionsRouteProp = RouteProp<ParamsList, 'Entries' | 'Outflows'>
