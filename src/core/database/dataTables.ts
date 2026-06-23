export const TransactionDataTableSchema = {
  name: 'Transactions',
  properties: {
    userId: 'string',
    product: 'string',
    value: 'double',
    type: 'string',
    datetime: 'datetime',
    paymode: 'string',
    uid: 'string'
  }
}

export const UserDataSchema = {
  name: 'Users',
  properties: {
    userId: 'string'
  }
}
