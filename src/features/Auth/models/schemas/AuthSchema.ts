export class AuthSchema extends Realm.Object<AuthSchema> {
  userId!: string

  static schema = {
    name: 'Users',
    properties: {
      userId: 'string'
    }
  }
}
