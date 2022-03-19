import React from 'react'
import { ScrollView, Keyboard, ActivityIndicator } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components/native'

import { useUser } from '../../context/AuthContext'
import { Row, Button, Text, Input } from '../../components'

import logoImg from '../../assets/logo.png'
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
        <Row width={1} justifyContent='center' alignItems='center'>
          <ImageLogo source={logoImg} />
        </Row>

        <Row width={1} justifyContent='center' alignItems='center' mb={24}>
          <Text fontSize={24} fontWeight='bold' color='#262626'>
            Bem-vindo ao Livro Caixa
          </Text>
        </Row>

        {erro && (
          <Row
            width={1}
            backgroundColor='#db3b33'
            p='10px'
            justifyContent='center'
            alignItems='center'
            borderRadius={10}
            mb='10px'
          >
            <Ionicons name='alert-circle-outline' color='white' size={20} />
            <Text fontSize={16} fontWeight='bold' color='white' ml='6px'>
              e-mail ou senha estão incorretos!
            </Text>
          </Row>
        )}

        <Controller
          control={control}
          name='user'
          render={({ value, onChange }) => (
            <Input
              label='e-mail'
              keyboardType='email-address'
              icon='at'
              autoCapitalize='none'
              placeholder='email@exemplo.com'
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.user && (
          <Text color='#f15555' fontWeight='bold' fontSize={13} mt={-15} mb={2} textAlign='center'>
            {errors.user.message}
          </Text>
        )}

        <Controller
          control={control}
          name='password'
          render={({ value, onChange }) => (
            <Input
              label='Senha'
              placeholder='*******'
              icon='lock'
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
            />
          )}
        />

        {errors.password && (
          <Text color='#f15555' fontWeight='bold' fontSize={13} mt={-15} mb={2} textAlign='center'>
            {errors.password.message}
          </Text>
        )}

        <Row width={1} mt='15px'>
          <Button
            width={1}
            backgroundColor='#3b61e6'
            borderRadius={8}
            p='10px'
            justifyContent='flex-end'
            opacity={!loading ? 1 : 0.2}
            {...(!loading && { onPress: handleSubmit(onSubmit) })}
          >
            {loading ? (
              <ActivityIndicator animating={true} color='#4db476' />
            ) : (
              <Row>
                <Text fontSize={14} color='white' fontWeight='bold'>
                  Acesse o seu Livro Caixa
                </Text>
                <Ionicons name='chevron-forward-outline' color='white' size={20} />
              </Row>
            )}
          </Button>
        </Row>

        <Row justifyContent='center' alignItems='center' mt='50px' p='5px'>
          <Button
            backgroundColor='#262626'
            p='10px'
            minWidth='90px'
            width={160}
            height={70}
            mr='10px'
            justifyContent='center'
            alignItems='center'
            borderRadius={8}
            onPress={() => navigate('SignUp')}
          >
            <Text fontSize='16px' fontWeight='bold' color='white' textAlign='center'>
              Novo no Aplicativo? Cadastre-se!
            </Text>
          </Button>

          <Button
            backgroundColor='#3b61e6'
            p='10px'
            minWidth='90px'
            width={160}
            height={70}
            mr='10px'
            justifyContent='center'
            alignItems='center'
            borderRadius={8}
            onPress={() => navigate('ForgotPassword')}
          >
            <Text fontSize='16px' fontWeight='bold' color='white' textAlign='center'>
              Esqueceu a senha?
            </Text>
          </Button>
        </Row>
      </ScrollView>
    </Container>
  )
}

export const Container = styled.KeyboardAvoidingView`
  background-color: #4db476;
  height: 100%;
  padding: 20px;
`

export const ImageLogo = styled.Image`
  width: 90px;
  height: 90px;
`

export default Login
