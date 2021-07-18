import api from '../providers/api'
import { MovPayloadProps } from '../pages/AddMovimentacao/types'
import { DetailMovProps } from '../pages/MovementDetail/type'
import { PaginationProps } from '../shared/pagination'
import { BalanceProps, MovementProps, MovementYearProps } from '../shared/movement'

export const addMov = (uid: string | undefined, type: number, payload: MovPayloadProps) =>
  api.post(`/movimentacao_caixa/create-mov/${uid}/${type}/`, payload)
export const getDetailMovByYear = ({
  uid,
  year
}: {
  uid?: string | null
  year: string | null
}): Promise<DetailMovProps> => api.get(`/financial-movement-detail-year/${uid}/${year}`)
export const getMovementByYear = ({ uid }: { uid?: string | null }): Promise<PaginationProps<MovementYearProps>> =>
  api.get(`/financial-movement-by-year/${uid}`)
export const getBalanceCash = ({ uid }: { uid?: string | null }): Promise<BalanceProps> =>
  api.get(`/financial-balance/${uid}`)
export const getMovements = ({
  uid,
  type
}: {
  uid?: string | null
  type: number
}): Promise<PaginationProps<MovementProps>> => api.get(`/financial-movement/${uid}/${type}`)
