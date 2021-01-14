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
<<<<<<< HEAD

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required()
})
=======
>>>>>>> 000880b (fix(app): fixed app)
