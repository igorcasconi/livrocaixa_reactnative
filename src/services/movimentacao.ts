import DatabaseService from './DatabaseService'
import { MovPayloadProps } from '../pages/AddMovimentacao/types'

export const addMov = (uid: string | undefined, type: number, payload: MovPayloadProps) =>
  DatabaseService.post(`/movimentacao_caixa/create-mov/${uid}/${type}/`, payload)
