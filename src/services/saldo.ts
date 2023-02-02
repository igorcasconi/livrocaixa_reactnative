<<<<<<< HEAD
import api from '../providers/api'

export const getSaldo = (uid: string) => api.get(`/movimentacao_caixa/saldo/${uid}`)
=======
import DatabaseService from './DatabaseService'

export const getSaldo = (uid: string) => DatabaseService.get(`/movimentacao_caixa/saldo/${uid}`)
>>>>>>> 000880b (fix(app): fixed app)
