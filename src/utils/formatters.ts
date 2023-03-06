export const formatCurrency = (money: number): string => {
  if (money) {
    const numberFloat = parseFloat(String(money)).toFixed(2).split('.')
    const numberSplitted = numberFloat[0].split(/(?=(?:...)*$)/)
    console.log(numberSplitted)
    const numberSliced = numberSplitted.slice(1)
    const numberFixed = numberSplitted.includes('-')
      ? numberSplitted[0] + numberSliced.join('.')
      : numberSplitted.join('.')
    const formatted = 'R$ ' + numberFixed + ',' + numberFloat[1]
    return formatted
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
