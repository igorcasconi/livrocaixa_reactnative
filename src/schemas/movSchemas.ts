import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Campo necessário'
  }
})

export const MovSchema = Yup.object().shape({
  product: Yup.string().required(),
  value: Yup.string().required(),
  paymode: Yup.string(),
  datetime: Yup.date().required()
})
