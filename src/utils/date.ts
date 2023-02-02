import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { MovementProps } from '../shared/movement'
import { formatCurrency } from './formatters'

export const reducedMovementsByMonthOrYear = (movements?: Array<any>, isByMonth?: boolean) =>
  movements?.reduce((acc, cur) => {
    const key = isByMonth ? 'month' : 'year'
    const isTypeEntries = cur.type === 'Entries'
    const isTypeOutflows = cur.type === 'Outflows'
    const currentDate = isByMonth
      ? `${new Date(cur?.date).getMonth() + 1}/${new Date(cur?.date).getFullYear()}`
      : new Date(cur?.date).getFullYear()
    const currentBalanceOutflows = isTypeOutflows ? cur.value : 0
    const currentBalanceEntries = isTypeEntries ? cur.value : 0
    const entriesQuantity = isTypeEntries ? 1 : 0
    const outflowsQuantity = isTypeOutflows ? 1 : 0

    if (!acc.length)
      return [
        {
          [key]: currentDate,
          balanceOutflows: currentBalanceOutflows,
          balanceEntries: currentBalanceEntries,
          date: new Date(cur?.date),
          entries: entriesQuantity,
          outflows: outflowsQuantity
        }
      ]

    const indexEqualPrevDate = acc.findIndex((item: { [key: string]: string }) => item[key] === currentDate)

    if (indexEqualPrevDate >= 0) {
      const newConcatedValue = {
        ...acc[indexEqualPrevDate],
        [key]: currentDate,
        balanceOutflows: acc[indexEqualPrevDate]?.balanceOutflows + currentBalanceOutflows,
        balanceEntries: acc[indexEqualPrevDate]?.balanceEntries + currentBalanceEntries,
        date: new Date(cur?.date),
        entries: acc[indexEqualPrevDate]?.entries + entriesQuantity,
        outflows: acc[indexEqualPrevDate]?.outflows + outflowsQuantity
      }
      acc.splice(indexEqualPrevDate, 1, newConcatedValue)
      return acc
    }

    return [
      ...acc,
      {
        [key]: currentDate,
        balanceOutflows: currentBalanceOutflows,
        balanceEntries: currentBalanceEntries,
        date: new Date(cur?.date),
        entries: entriesQuantity,
        outflows: outflowsQuantity
      }
    ]
  }, 0)

export const getAllMovementsForExport = (movements: MovementProps[], dateFiltered: string, isByMonth?: boolean) => {
  const movementsReportFiltered = isByMonth
    ? movements.filter(item => {
        if (new Date(item.date).getMonth() === new Date(dateFiltered).getMonth()) return item
      })
    : movements.filter(item => {
        if (new Date(item.date).getFullYear() === new Date(dateFiltered).getFullYear()) return item
      })

  const allMovementsReport = movementsReportFiltered.map(item => ({
    Descrição: item.product,
    Valor: formatCurrency(item.value),
    'Tipo de pagamento': format(new Date(item.date), 'dd/MM/yyyy', { locale: pt }),
    Data: item.type === 'Entries' ? 'Entrada' : 'Saída'
  }))

  return allMovementsReport
}

export const sortByDate = (movements: MovementProps[], descending?: boolean): MovementProps[] => {
  if (descending)
    return movements.sort(
      (movementA, movementB) => new Date(movementB.date).getTime() - new Date(movementA.date).getTime()
    )

  return movements.sort(
    (movementA, movementB) => new Date(movementA?.date).getTime() - new Date(movementB?.date).getTime()
  )
}
