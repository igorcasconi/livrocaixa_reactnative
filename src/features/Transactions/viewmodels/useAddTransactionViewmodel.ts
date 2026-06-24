import { useState } from 'react'
import { useUser } from '../../../context/AuthContext'
import { useRealm } from '../../../context/RealmContext'
import { AddTransactionPayloadFormProps, AddTransactionProps } from '../models/TransactionModel'
import uuid from 'react-native-uuid'
import { showToast } from '../../../core/utils/notification'
import { unformatCurrency } from '../../../core/utils/formatters'

const useAddTransactionViewmodel = (type: number) => {
  const { transactionRepository } = useRealm()
  const { uid } = useUser()
  const [isAllowToNavigateBack, setAllowToNavigateBack] = useState(false)
  const routeNameAfterSuccess = type === 1 ? 'Entries' : 'Outflows'

  const createTransaction = (payload?: AddTransactionPayloadFormProps) => {
    if (!payload) return

    const amount = unformatCurrency(payload.value)
    const uidTransaction = uuid.v4()
    const newPayload: AddTransactionProps = {
      product: payload.product,
      value: amount,
      paymode: payload.paymode,
      datetime: payload.datetime.toISOString(),
      uid: uidTransaction,
      type: payload.type
    }

    transactionRepository.createTransaction(newPayload, uid!)
  }

  const onSubmit = async (values: AddTransactionPayloadFormProps) => {
    try {
      const payload: AddTransactionPayloadFormProps = {
        ...values,
        type: routeNameAfterSuccess
      }
      createTransaction(payload)

      setAllowToNavigateBack(true)
      showToast('Movimentação cadastrada com sucesso!')
    } catch (err) {
      console.log(err)
      showToast('Ocorreu um erro ao cadastrar Movimentação!')
    }
  }

  return { onSubmit, isAllowToNavigateBack }
}

export default useAddTransactionViewmodel
