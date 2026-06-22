import React, { Fragment } from 'react'
import { View, ActivityIndicator } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'

import { Column, Row, Text, Button, Input } from '../../../core/components'

import { yupResolver } from '@hookform/resolvers/yup'
import { ForgotPasswordSchema } from '../../../schemas/loginSchema'
import { Controller, useForm } from 'react-hook-form'
import { ForgotPasswordProps } from '../models/ForgotPasswordModel'
import { useForgotPasswordViewmodel } from '../viewmodels/useForgotPasswordViewmodel'

const ForgotPassword: React.FC = () => {
  const { loading, onSubmit } = useForgotPasswordViewmodel()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordProps>({
    defaultValues: { email: '' },
    resolver: yupResolver(ForgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  return (
    <Column backgroundColor='#4db476' flex={1} p='20px'>
      <Column width={1} justifyContent='center' alignItems='center'>
        <Text fontSize={25} fontWeight='bold' mb='20px'>
          Esqueceu a senha?
        </Text>
        <Text fontSize={16} mb='20px' textAlign='center'>
          Preencha o e-mail para receber o link de alteração de senha!
        </Text>
      </Column>

      <Column>
        <View>
          <Controller
            control={control}
            name='email'
            render={({ field: { value, onChange } }) => (
              <Input
                label='e-mail'
                placeholder='email@exemplo.com'
                keyboardType='email-address'
                autoCapitalize='none'
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Column width={1} mt={20}>
            <Button
              width={1}
              height={40}
              borderRadius={10}
              backgroundColor='#3b61e6'
              justifyContent='center'
              alignItems='center'
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator animating={true} color='blue' size={30} />
              ) : (
                <Fragment>
                  <Text fontSize={17} color='white' fontWeight='bold' mr='6px'>
                    Enviar
                  </Text>
                  <Ionicons name='paper-plane-outline' color='white' size={18} />
                </Fragment>
              )}
            </Button>

            {errors?.email && (
              <Row
                width={1}
                p='15px'
                backgroundColor='#eee424'
                justifyContent='center'
                alignItems='center'
                borderRadius={10}
                mt='20px'
              >
                <Ionicons name='warning-outline' color='black' size={20} />
                <Text ml='6px' fontSize={16} color='#262626' fontWeight='bold'>
                  Necessário inserir informaçãox de e-mail para alterar a senha!
                </Text>
              </Row>
            )}
          </Column>
        </View>
      </Column>
    </Column>
  )
}

export default ForgotPassword
