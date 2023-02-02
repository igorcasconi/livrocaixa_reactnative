import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'

import { useUser } from '../../context/AuthContext'

import styles from './style'
import { ConfirmScreenRouteProp } from '../../navigation/type'

const ConfirmScreen: React.FC = () => {
  const { erroVerifyPassword } = useUser()
  const { navigate } = useNavigation()
  const route = useRoute<ConfirmScreenRouteProp>()
  const { email } = route.params

  let textInfo: string
  let icon: string
  let color: string

  if (erroVerifyPassword) {
    textInfo = `Ocorreu um erro ao alterar a senha, possivelmente o e-mail ${email} não está cadastrado!`
    icon = 'alert-circle-outline'
    color = 'red'
  } else {
    textInfo = `O link de alteração de senha foi enviado para o e-mail ${email}, acesse o link no seu e-mail e realize a alteração da senha.`
    icon = 'checkmark-circle-outline'
    color = 'white'
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewButton}>
        <Text style={styles.textInit}>Alterar senha</Text>

        <Ionicons name={icon} color={color} size={40} />
        <Text style={styles.textInfo}>{textInfo}</Text>

        <TouchableOpacity
          style={styles.buttonAccess}
          onPress={() => {
            navigate('Login')
          }}
        >
          <Text style={styles.textButton}>Voltar para o Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ConfirmScreen
