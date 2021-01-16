// FUNÇÃO PARA CONVERTER PARA REAL
export const numberToReal = (money: number): string => {
  if (money > 0) {
    const numero = parseFloat(String(money)).toFixed(2).split('.')
    numero[0] = 'R$ ' + numero[0].split(/(?=(?:...)*$)/).join('.')
    return numero.join(',')
  }

  return 'R$ 0,00'
}
