export class TransactionSchema extends Realm.Object<TransactionSchema> {
  userId!: string
  product!: string
  value!: number
  datetime!: string
  paymode!: string
  uid!: string
  type?: string

  static schema = {
    name: 'Transactions',
    properties: {
      userId: 'string',
      product: 'string',
      value: 'double',
      type: 'string',
      datetime: 'string',
      paymode: 'string',
      uid: 'string'
    }
  }
}
