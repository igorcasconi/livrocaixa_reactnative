import { HomeRepository } from '../models/repositories/HomeRepository'

export class RealmHomeRepository implements HomeRepository {
  constructor(private realm: Realm | null) {}

  getBalance(userId: string): number {
    const transactions = this.realm?.objects('Transactions').filtered(`userId = "${userId}"`)
    const entriesValues = transactions?.filtered('type = "Entries"').sum('value')
    const outflowsValues = transactions?.filtered('type = "Outflows"').sum('value')
    const balanceCash = Number(entriesValues) - Number(outflowsValues)
    return balanceCash
  }
}
