export const FinancialMovementSchema = {
  name: 'FinancialMovement',
  properties: {
    userFirebase: 'string',
    product: 'string',
    value: 'double',
    type: 'string',
    date: 'date',
    paymode: 'string',
    index: 'int'
  }
}

export const UserDataSchema = {
  name: 'UserData',
  properties: {
    idFirebase: 'string'
  }
}
