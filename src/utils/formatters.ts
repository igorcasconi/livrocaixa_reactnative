export const formatCurrency = (money: number): string => {
  if (money) {
    const numero = parseFloat(String(money)).toFixed(2).split('.')
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }

  return 'R$ 0,00'
}

export const unformatCurrency = (value?: string) => {
  if (!value) return 0

  const unformatted = parseFloat(value.replace('R$ ', '').replace('.', '').replace(',', '.'))
  return unformatted
}
