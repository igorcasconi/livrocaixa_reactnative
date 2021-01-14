import React from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'

import { useUser } from '../../context/AuthContext'
import InputLogin from '../../components/InputLogin'

import styles from './style'

const ForgotPassword: React.FC = () => {
  const { verifyPassword, loading } = useUser()
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.viewButton}>
        <Text style={styles.textInit}>Esqueceu a senha</Text>
        <Text style={styles.textInfoSignUp}>Preencha o e-mail para receber o link de alteração de senha!</Text>
      </View>

      <View>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={yup.object().shape({ email: yup.string().required() })}
          onSubmit={values => {
            verifyPassword(values.email)
            navigate('ConfirmScreen', { email: values.email })
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <View>
              <InputLogin
                label='e-mail'
                placeholder='email@exemplo.com'
                keyboardType='email-address'
                autoCapitalize='none'
                value={values.email}
                onChangeText={handleChange('email')}
              />

              <View style={styles.viewButton}>
                <TouchableOpacity style={styles.buttonAccess} onPress={handleSubmit}>
                  <Text style={styles.textButton}>Enviar</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator animating={true} style={{ marginTop: 30 }} color='blue' size={30} />}

                {errors.email && touched && (
                  <View style={styles.WarnLogin}>
                    <Ionicon name='warning-outline' color='black' size={20} />
                    <Text style={styles.textWarnLogin}>
                      {' '}
                      Necessário inserir informação de e-mail para alterar a senha!
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

export default ForgotPassword
