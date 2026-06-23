import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Campo necessário'
  }
})

export const transactionFormSchema = Yup.object().shape({
  product: Yup.string().required(),
  value: Yup.string().required(),
  paymode: Yup.string().optional().nullable(),
  datetime: Yup.date().required(),
  type: Yup.string().required()
})
