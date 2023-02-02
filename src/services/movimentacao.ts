<<<<<<< HEAD
import api from '../providers/api'

import { DetailMovProps } from '../pages/MovementDetail/type'
import { PaginationProps } from '../shared/pagination'
import { BalanceProps, MovementProps, ReportListProps } from '../shared/movement'

export const addMov = ({ uid, type, payload }: { uid?: string; type: number; payload: any }) =>
  api.post(`/create-mov/${uid}/${type}`, payload)
export const getBalanceCash = ({ uid }: { uid?: string | null }): Promise<BalanceProps> =>
  api.get(`/financial-balance/${uid}`)
export const getMovements = ({ uid }: { uid?: string | null }): Promise<PaginationProps<MovementProps>> =>
  api.get(`/financial-movement/${uid}`)
export const deleteFinancialMovement = ({ uid, idMovement }: { idMovement: number; uid?: string | null }) =>
  api.delete(`/financial-movement-delete/${uid}/${idMovement}`)
export const financialMovementReportByYearDetail = ({
  uid,
  year
}: {
  uid?: string | null
  year?: string | null
}): Promise<MovementProps> => api.get(`/financial-report-list-year-doc/${uid}/${year}`)
export const financialMovementReportDetail = ({
  uid,
  year,
  month
}: {
  uid?: string | null
  year?: string | null
  month?: string | null
}): Promise<DetailMovProps> => api.get(`/financial-movement-detail/${uid}/${year}${!!month ? `/${month}` : ''}`)
export const financialReportList = ({
  uid,
  type
}: {
  uid?: string | null
  type?: string
}): Promise<PaginationProps<ReportListProps>> => api.get(`/financial-report-list/${uid}/${type}`)
export const financialMovementReportListDoc = ({
  uid,
  year,
  month
}: {
  uid?: string | null
  year?: string | null
  month?: string | null
}): Promise<PaginationProps<MovementProps>> =>
  api.get(`/financial-report-list-doc/${uid}${!!year ? `/${year}` : ''}${!!month ? `/${month}` : ''}`)
export const getAllMovements = ({ uid }: { uid?: string | null }): Promise<PaginationProps<MovementProps>> =>
  api.get(`/all-financial-movement/${uid}`)
=======
import DatabaseService from './DatabaseService'
import { MovPayloadProps } from '../pages/AddMovimentacao/types'

export const addMov = (uid: string | undefined, type: number, payload: MovPayloadProps) =>
  DatabaseService.post(`/movimentacao_caixa/create-mov/${uid}/${type}/`, payload)
>>>>>>> 000880b (fix(app): fixed app)
