import DatabaseService from './DatabaseService'

export const getSaldo = (uid: string) => DatabaseService.get(`/movimentacao_caixa/saldo/${uid}`)
