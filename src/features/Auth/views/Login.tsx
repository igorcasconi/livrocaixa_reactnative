import React from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import Ionicons from '@react-native-vector-icons/ionicons'
// @ts-ignore
import styled from 'styled-components/native'

import { Row, Button, Text, Input, Column } from '../../../core/components'

import logoImg from '../../../assets/logo.png'
import { LoginSchema } from '../models/schemas/loginSchema'
import { LoginProps } from '../models/AuthModel'
import { useAuthViewmodel } from '../viewmodels/useAuthViewmodel'
import { ParamsListLogin } from '../../../core/navigation/type'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const Login: React.FC = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamsListLogin>>()
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginProps>({
    defaultValues: { user: '', password: '' },
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })
  const { loading, isError, onSubmit } = useAuthViewmodel()

  return (
    <Container behavior='height'>
      <ScrollView>
        <Row width='100%' justifyContent='center' alignItems='center'>
          <ImageLogo source={logoImg} />
        </Row>

        <Row width='100%' justifyContent='center' alignItems='center' mb={24}>
          <Text fontSize={24} fontWeight='bold' color='#262626'>
            Bem-vindo ao Livro Caixa
          </Text>
        </Row>

        {isError && (
          <Row
            width='100%'
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
          render={({ field: { value, onChange } }) => (
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
          render={({ field: { value, onChange } }) => (
            <Input
              label='Senha'
              placeholder='*******'
              icon='lock-closed'
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
            height={40}
            backgroundColor='#3b61e6'
            borderRadius={8}
            p='10px'
            justifyContent='flex-end'
            opacity={!loading ? 1 : 0.2}
            {...(!loading && { onPress: handleSubmit(onSubmit) })}
          >
            {loading ? (
              <ActivityIndicator animating={true} color='white' />
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

        <Column justifyContent='center' alignItems='center' mt='50px' pl='6px'>
          <Button
            backgroundColor='#3b61e6'
            px='10px'
            width='100%'
            height={40}
            mr='10px'
            mb='16px'
            justifyContent='center'
            alignItems='center'
            borderRadius={8}
            onPress={() => navigate('ForgotPassword')}
          >
            <Text fontSize='16px' flexWrap='wrap' fontWeight='bold' lineHeight='16px' color='white' textAlign='center'>
              Esqueceu a senha?
            </Text>
          </Button>
          <Button
            backgroundColor='#262626'
            px='10px'
            width='100%'
            height={40}
            mr='10px'
            mb='16px'
            justifyContent='center'
            alignItems='center'
            borderRadius={8}
            onPress={() => navigate('Register')}
          >
            <Text fontSize='14px' fontWeight='bold' lineHeight='16px' color='white' textAlign='center'>
              Novo no Aplicativo? Cadastre-se!
            </Text>
          </Button>
        </Column>
      </ScrollView>
    </Container>
  )
}

export const Container = styled.KeyboardAvoidingView`
  background-color: #4db476;
  height: 100%;
  padding: 20px;
  flex: 1;
`

export const ImageLogo = styled.Image`
  width: 90px;
  height: 90px;
`

export default Login
