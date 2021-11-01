import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useUser } from '../../context/AuthContext'
import { Button, Text, Column } from '../../components'

import { CompletionForgotPassProps } from '../../navigation/type'

const CompletionForgotPass: React.FC = () => {
  const { erroVerifyPassword } = useUser()
  const { navigate } = useNavigation()
  const route = useRoute<CompletionForgotPassProps>()
  const { email } = route.params

  const textInfo = erroVerifyPassword
    ? `Ocorreu um erro ao alterar a senha, possivelmente o e-mail ${email} não está cadastrado!`
    : `O link de alteração de senha foi enviado para o e-mail ${email}, acesse o link no seu e-mail e realize a alteração da senha.`
  const icon = erroVerifyPassword ? 'alert-circle-outline' : 'checkmark-circle-outline'
  const color = erroVerifyPassword ? 'red' : 'white'

  return (
    <Column flex={1} backgroundColor='#4db476' padding={20} justifyContent='center' alignItems='center'>
      <Column justifyContent='center' alignItems='center'>
        <Text fontSize={25} fontWeight='bold' mb='20px'>
          Esqueceu a senha?
        </Text>

        <Ionicons name={icon} color={color} size={40} />
        <Text textAlign='center' fontSize={16} marginBottom={20}>
          {textInfo}
        </Text>

        <Button
          backgroundColor='#3b61e6'
          borderRadius={10}
          width={300}
          padding={10}
          onPress={() => {
            navigate('Login')
          }}
        >
          <Text color='white' fontWeight='bold' fontSize={17} textAlign='center'>
            Voltar para o Login
          </Text>
        </Button>
      </Column>
    </Column>
  )
}

export default CompletionForgotPass
