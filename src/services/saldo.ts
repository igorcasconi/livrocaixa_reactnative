import api from '../providers/api'

export const getSaldo = (uid: string) => api.get(`/movimentacao_caixa/saldo/${uid}`)
