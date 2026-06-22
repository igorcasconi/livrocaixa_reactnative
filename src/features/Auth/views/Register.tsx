import React from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import Ionicon from '@react-native-vector-icons/ionicons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button, Column, Row, Text, Input } from '../../../core/components'

import { SignupSchema } from '../../../schemas/signup'
import { useRegisterViewmodel } from '../viewmodels/useRegisterViewmodel'
import { SignupProps } from '../models/RegisterModel'

const defaultValues = { email: '', password: '', passwordVerify: '' }

const Register: React.FC = () => {
  const { isErrorRegister, loading, onSubmit } = useRegisterViewmodel()
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors }
  } = useForm<SignupProps>({
    defaultValues,
    resolver: yupResolver(SignupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur'
  })

  return (
    <Column flex={1} backgroundColor='#4db476' padding={10}>
      <ScrollView>
        <Column width={1} justifyContent='center' alignItems='center'>
          <Text fontSize={25} mb={20} fontWeight='bold'>
            Cadastre-se ao Livro Caixa
          </Text>
          <Text mb={10} fontSize={17} textAlign='center'>
            Preencha as informações e experimente seu controle de caixa em suas mãos!
          </Text>
        </Column>

        {isDirty && (
          <Row
            width={1}
            p={16}
            backgroundColor='#dec104'
            justifyContent='center'
            alignItems='center'
            mt={20}
            borderRadius={10}
          >
            <Ionicon name='warning-outline' color='black' size={20} />
            <Text color='black' fontSize={14} fontWeight='bold' ml='4px'>
              Necessário inserir informação em todos os campos!
            </Text>
          </Row>
        )}

        {!!errors.passwordVerify && (
          <Row
            width={1}
            p={10}
            backgroundColor='#dec104'
            justifyContent='center'
            alignItems='center'
            mt={20}
            borderRadius={10}
          >
            <Ionicon name='warning-outline' color='black' size={20} />
            <Text color='black' fontSize={14} fontWeight='bold' ml='4px'>
              {errors.passwordVerify.message}
            </Text>
          </Row>
        )}

        {isErrorRegister && (
          <Row
            width={1}
            p={15}
            backgroundColor='#db3b33'
            mt={20}
            borderRadius={10}
            justifyContent='center'
            alignItems='center'
          >
            <Ionicon name='alert-circle-outline' color='white' size={20} />
            <Text ml='4px' fontSize={17} fontWeight='bold' color='white'>
              Ocorreu um problema ao se cadastrar! Possivelmente seu e-mail já está cadastrado
            </Text>
          </Row>
        )}

        <Column mt={20}>
          <Controller
            name='email'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label='e-mail'
                placeholder='email@exemplo.com'
                keyboardType='email-address'
                icon='at'
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label='Senha'
                placeholder='*******'
                secureTextEntry={true}
                icon='lock-closed'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name='passwordVerify'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label='Repita a senha'
                placeholder='*******'
                secureTextEntry={true}
                icon='lock-closed'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Row width={1} justifyContent='center' alignItems='center'>
            <Button
              width={1}
              justifyContent='center'
              alignItems='center'
              backgroundColor='#3b61e6'
              borderRadius={10}
              p={10}
              mt={20}
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator animating={true} color='blue' size={30} />
              ) : (
                <Text color='white' fontSize={17} fontWeight='bold'>
                  Cadastrar
                </Text>
              )}
            </Button>
          </Row>
        </Column>
      </ScrollView>
    </Column>
  )
}

export default Register
