import { RouteProp } from '@react-navigation/native'

type ParamsAddMov = {
  type: number
}

type ParamsConfirmScreen = {
  email: string
}

type ParamsDetailMov = {
  data: Date
}

export type ParamsList = {
  Home: undefined
  AddMov: ParamsAddMov
  Entradas: undefined
  Saidas: undefined
  MovAno: undefined
  MovMes: undefined
  Tutorial: undefined
  DetailMovAno: ParamsDetailMov
  DetailMovMes: ParamsDetailMov
  About: undefined
}

export type ParamsListLogin = {
  Login: undefined
  SignUp: undefined
  ForgotPassword: undefined
  ConfirmScreen: ParamsConfirmScreen
}

export type AddMovRouteProp = RouteProp<ParamsList, 'AddMov'>
export type ConfirmScreenRouteProp = RouteProp<ParamsListLogin, 'ConfirmScreen'>
export type DetailMovRouteProp = RouteProp<ParamsList, 'DetailMovAno' | 'DetailMovMes'>
export type MovRouteProp = RouteProp<ParamsList, 'MovAno' | 'MovMes'>
export type MovComponentRouteProp = RouteProp<ParamsList, 'Entradas' | 'Saidas'>
