import { AuthRepository } from '../models/repositories/AuthRepository'

export class RealmAuthRepository implements AuthRepository {
  constructor(private realm: Realm | null) {}
  userHasRegistered(userId: string): boolean {
    const userData = this.realm?.objects('Users').filtered(`userId = "${userId}"`)
    return !!userData
  }

  createUser(userId: string): void {
    this.realm?.write(() => this.realm?.create('Users', { userId: userId }))
  }
}
