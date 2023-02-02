export const formatCurrency = (money: number): string => {
  if (money) {
    const numero = parseFloat(String(money)).toFixed(2).split('.')
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }

  return 'R$ 0,00'
}

export const unformatCurrency = (value: string) => {
  if (!value) return 0
  const splittedValue = value.split('.')
  const lastPositionSplittedValue = splittedValue.length - 1
  const slicedRealValueFirstPart = splittedValue.slice(-1)[0].split(',')
  const valueInCents = slicedRealValueFirstPart[1]
  const joinedValue =
    splittedValue.slice(0, lastPositionSplittedValue).join('') + slicedRealValueFirstPart[0] + '.' + valueInCents
  const replacedStringValue = joinedValue.replace('R$ ', '')
  const unformatted = Number(replacedStringValue)
  return unformatted
}
