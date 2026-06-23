import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { formatCurrency } from './formatters'
import { TransactionProps } from '../../features/Transactions/models/TransactionModel'

export const reducedTransactionReportDataByMonthOrYear = (transactions?: Array<any>, isByMonth?: boolean) =>
  transactions?.reduce((acc, cur) => {
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
          type: key,
          reportType: currentDate,
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

export const getAllTransactionForReport = (
  transactions: TransactionProps[],
  dateFiltered: string,
  isByMonth?: boolean
) => {
  const transactionsReportFiltered = isByMonth
    ? transactions.filter(item => {
        if (new Date(item.date).getMonth() === new Date(dateFiltered).getMonth()) return item
      })
    : transactions.filter(item => {
        if (new Date(item.date).getFullYear() === new Date(dateFiltered).getFullYear()) return item
      })

  const allTransactionReport = transactionsReportFiltered.map(item => ({
    Descrição: item.product,
    Valor: formatCurrency(item.value),
    'Tipo de pagamento': format(new Date(item.date), 'dd/MM/yyyy', { locale: ptBR }),
    Data: item.type === 'Entries' ? 'Entrada' : 'Saída'
  }))

  return allTransactionReport
}

export const sortByDate = (transactions: TransactionProps[], descending?: boolean): TransactionProps[] => {
  if (descending)
    return transactions.sort(
      (movementA, movementB) => new Date(movementB.date).getTime() - new Date(movementA.date).getTime()
    )

  return transactions.sort(
    (movementA, movementB) => new Date(movementA?.date).getTime() - new Date(movementB?.date).getTime()
  )
}
