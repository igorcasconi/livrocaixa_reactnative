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
  AddMov: ParamsAddMov
  Entries: MovementsProps
  Outflows: MovementsProps
  MovementByYear: undefined
  MovementByMonth: undefined
  Tutorial: undefined
  MovementDetailYear: ParamsMovementDetail
  MovementDetailMonth: ParamsMovementDetail
  About: undefined
  MovementFinancial: undefined
}

export type ParamsListLogin = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
  CompletionForgotPass: ParamsCompletionForgotPass
}

export type AddMovRouteProp = RouteProp<ParamsList, 'AddMov'>
export type CompletionForgotPassProps = RouteProp<ParamsListLogin, 'CompletionForgotPass'>
export type DetailMovRouteProp = RouteProp<ParamsList, 'MovementDetailYear' | 'MovementDetailMonth'>
export type MovementReportProp = RouteProp<ParamsList, 'MovementByYear' | 'MovementByMonth'>
export type MovComponentRouteProp = RouteProp<ParamsList, 'Entries' | 'Outflows'>
