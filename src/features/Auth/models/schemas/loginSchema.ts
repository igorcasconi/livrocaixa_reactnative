import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Campo necessário'
  }
})

export const LoginSchema = Yup.object().shape({
  user: Yup.string().required(),
  password: Yup.string().required()
})

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required()
})
