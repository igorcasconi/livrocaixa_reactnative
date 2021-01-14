import React from 'react'
import { Text, ScrollView, Keyboard, ActivityIndicator } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'

import { useUser } from '../../context/AuthContext'
import InputLogin from '../../components/InputLogin'

import logoImg from '../../assets/logo.png'

import styles, {
  Container,
  ButtonSignUp,
  ButtonForgot,
  TextButton,
  TextButtonForgot,
  ButtonAccess,
  ViewButtonLogin,
  ImageLogo,
  ViewInit,
  TextInit,
  ErroLogin
} from './style'
import { LoginSchema } from '../../schemas/loginSchema'

interface LoginProps {
  user: string
  password: string
}

const Login: React.FC = () => {
  const { erro, login, loading } = useUser()
  const { navigate } = useNavigation()
  const { handleSubmit, control, errors } = useForm<LoginProps>({
    defaultValues: { user: '', password: '' },
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmit = (values: LoginProps) => {
    login(values.user, values.password)
    Keyboard.dismiss()
  }

  return (
    <Container behavior='height'>
      <ScrollView>
        <ViewInit>
          <ImageLogo source={logoImg} />
        </ViewInit>

        <ViewInit>
          <TextInit>Bem-vindo ao Livro Caixa</TextInit>
        </ViewInit>

        {erro && (
          <ErroLogin>
            {/* <Ionicon name='alert-circle-outline' color='white' size={20} /> */}
            <Text style={styles.textErroLogin}> e-mail ou senha estão incorretos!</Text>
          </ErroLogin>
        )}

        <Controller
          control={control}
          name='user'
          render={({ value, onChange }) => (
            <InputLogin
              label='e-mail'
              keyboardType='email-address'
              icon='person-circle-outline'
              autoCapitalize='none'
              placeholder='email@exemplo.com'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.user && <Text style={styles.textErroPassword}>{errors.user.message}</Text>}

        <Controller
          control={control}
          name='password'
          render={({ value, onChange }) => (
            <InputLogin
              label='senha'
              placeholder='*******'
              icon='lock-closed'
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.textErroPassword}>{errors.password.message}</Text>}
        <ButtonAccess onPress={handleSubmit(onSubmit)}>
          {loading ? <ActivityIndicator animating={true} color='#4db476' /> : <TextButton>Entrar</TextButton>}
        </ButtonAccess>

        <ViewButtonLogin>
          <ButtonSignUp onPress={() => navigate('SignUp')}>
            <TextButton>Novo no Aplicativo? Cadastre-se!</TextButton>
          </ButtonSignUp>

          <ButtonForgot onPress={() => navigate('ForgotPassword')}>
            <TextButtonForgot>Esqueceu a senha?</TextButtonForgot>
          </ButtonForgot>
        </ViewButtonLogin>
      </ScrollView>
    </Container>
  )
}

export default Login
