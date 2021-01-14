import { RouteProp } from '@react-navigation/native'

type ParamsAddMov = {
  type: number
}

<<<<<<< HEAD
type ParamsCompletionForgotPass = {
  email: string
}

type ParamsMovementDetail = {
  dateMovement: Date | string
  type: string
}

type MovementsProps = {
  isRefetchRequest?: boolean
=======
type ParamsConfirmScreen = {
  email: string
}

type ParamsDetailMov = {
  data: Date
>>>>>>> 000880b (fix(app): fixed app)
}

export type ParamsList = {
  Home: undefined
  AddMov: ParamsAddMov
<<<<<<< HEAD
  Entries: MovementsProps
  Outflows: MovementsProps
  MovementByYear: undefined
  MovementByMonth: undefined
  Tutorial: undefined
  MovementDetailYear: ParamsMovementDetail
  MovementDetailMonth: ParamsMovementDetail
  About: undefined
  MovementFinancial: undefined
  PolicyPrivacy: undefined
=======
  Entradas: undefined
  Saidas: undefined
  MovAno: undefined
  MovMes: undefined
  Tutorial: undefined
  DetailMovAno: ParamsDetailMov
  DetailMovMes: ParamsDetailMov
  About: undefined
>>>>>>> 000880b (fix(app): fixed app)
}

export type ParamsListLogin = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
<<<<<<< HEAD
  CompletionForgotPass: ParamsCompletionForgotPass
}

export type AddMovRouteProp = RouteProp<ParamsList, 'AddMov'>
export type CompletionForgotPassProps = RouteProp<ParamsListLogin, 'CompletionForgotPass'>
export type DetailMovRouteProp = RouteProp<ParamsList, 'MovementDetailYear' | 'MovementDetailMonth'>
export type MovementReportProp = RouteProp<ParamsList, 'MovementByYear' | 'MovementByMonth'>
export type MovComponentRouteProp = RouteProp<ParamsList, 'Entries' | 'Outflows'>
=======
  ConfirmScreen: ParamsConfirmScreen
}

export type AddMovRouteProp = RouteProp<ParamsList, 'AddMov'>
export type ConfirmScreenRouteProp = RouteProp<ParamsListLogin, 'ConfirmScreen'>
export type DetailMovRouteProp = RouteProp<ParamsList, 'DetailMovAno' | 'DetailMovMes'>
export type MovRouteProp = RouteProp<ParamsList, 'MovAno' | 'MovMes'>
export type MovComponentRouteProp = RouteProp<ParamsList, 'Entradas' | 'Saidas'>
>>>>>>> 000880b (fix(app): fixed app)
