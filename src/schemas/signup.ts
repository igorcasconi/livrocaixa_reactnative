import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Campo necessário'
  }
})

export const SignupSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().min(6, 'A senha precisa ter no mínimo 6 caracteres').required(),
  passwordVerify: Yup.string()
    .min(6, 'A senha precisa ter no mínimo 6 caracteres')
    .required()
    .oneOf([Yup.ref('password'), ''], 'As senhas não combinam!')
})
