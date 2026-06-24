export interface AuthRepository {
  createUser(userId: string): void
  userHasRegistered(userId: string): boolean
}
