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
      ? `${new Date(cur?.datetime).getMonth() + 1}/${new Date(cur?.datetime).getFullYear()}`
      : new Date(cur?.datetime).getFullYear()
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
          datetime: new Date(cur?.datetime).toISOString(),
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
        datetime: new Date(cur?.datetime).toISOString(),
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
        datetime: new Date(cur?.datetime).toISOString(),
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
        if (new Date(item.datetime).getMonth() === new Date(dateFiltered).getMonth()) return item
      })
    : transactions.filter(item => {
        if (new Date(item.datetime).getFullYear() === new Date(dateFiltered).getFullYear()) return item
      })

  const allTransactionReport = transactionsReportFiltered.map(item => ({
    Descrição: item.product,
    Valor: formatCurrency(item.value),
    'Tipo de pagamento': format(new Date(item.datetime), 'dd/MM/yyyy', { locale: ptBR }),
    Data: item.type === 'Entries' ? 'Entrada' : 'Saída'
  }))

  return allTransactionReport
}

export const sortByDate = (transactions: TransactionProps[], descending?: boolean): TransactionProps[] => {
  if (descending)
    return transactions.sort(
      (movementA, movementB) => new Date(movementB.datetime).getTime() - new Date(movementA.datetime).getTime()
    )

  return transactions.sort(
    (movementA, movementB) => new Date(movementA?.datetime).getTime() - new Date(movementB?.datetime).getTime()
  )
}
