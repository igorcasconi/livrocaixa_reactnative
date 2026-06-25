import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Text, Column } from '../../../core/components'

import { CompletionForgotPassRouteProp, ParamsListLogin } from '../../../core/navigation/type'
import { useForgotPasswordViewmodel } from '../viewmodels/useForgotPasswordViewmodel'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const CompletionForgotPass: React.FC = () => {
  const { informationDataWithError } = useForgotPasswordViewmodel()
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamsListLogin>>()
  const route = useRoute<CompletionForgotPassRouteProp>()
  const { email } = route.params

  return (
    <Column flex={1} backgroundColor='background' padding={20} justifyContent='center' alignItems='center'>
      <Column justifyContent='center' alignItems='center'>
        <Text fontSize={25} fontWeight='bold' mb='20px'>
          Esqueceu a senha?
        </Text>
        {/* @ts-ignore */}
        <Ionicons name={informationDataWithError(email).icon} color={informationDataWithError(email).color} size={40} />
        <Text textAlign='center' fontSize={16} marginBottom={20}>
          {informationDataWithError(email).text}
        </Text>

        <Button
          backgroundColor='secondary'
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
