import React from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Keyboard, ScrollView } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'

import { useUser } from '../../context/AuthContext'
import InputLogin from '../../components/InputLogin'

import styles from './style'
import { SignupSchema } from '../../schemas/signup'
import { SignupProps } from './types'

const Signup: React.FC = () => {
  const { erroRegister, register, loading } = useUser()

  const defaultValues = { email: '', password: '', passwordVerify: '' }

  const submittForm = (values: SignupProps) => {
    console.log(values.passwordVerify)
    register(values.email, values.password)
    Keyboard.dismiss()
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.viewButton}>
          <Text style={styles.textInit}>Cadastre-se ao Livro Caixa</Text>
          <Text style={styles.textInfoSignUp}>
            Preencha as informações e experimente seu controle de caixa em suas mãos!
          </Text>
        </View>

        <View>
          <Formik initialValues={defaultValues} validationSchema={SignupSchema} onSubmit={submittForm}>
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <View>
                <InputLogin
                  label='e-mail'
                  placeholder='email@exemplo.com'
                  keyboardType='email-address'
                  icon='person-circle-outline'
                  autoCapitalize='none'
                  value={values.email}
                  onChangeText={handleChange('email')}
                />

                <InputLogin
                  label='Senha'
                  placeholder='*******'
                  secureTextEntry={true}
                  icon='lock-closed'
                  value={values.password}
                  onChangeText={handleChange('password')}
                />

                <InputLogin
                  label='Repita a senha'
                  placeholder='*******'
                  secureTextEntry={true}
                  icon='lock-closed'
                  value={values.passwordVerify}
                  onChangeText={handleChange('passwordVerify')}
                />

                <View style={styles.viewButton}>
                  <TouchableOpacity style={styles.buttonAccess} onPress={handleSubmit}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                  </TouchableOpacity>

                  {loading && <ActivityIndicator animating={true} style={{ marginTop: 30 }} color='blue' size={30} />}

                  {(values.email.length == 0 && touched.email) ||
                    (values.password.length == 0 && touched.password) ||
                    (values.passwordVerify.length == 0 && touched.passwordVerify && (
                      <View style={styles.WarnLogin}>
                        <Ionicon name='warning-outline' color='black' size={20} />
                        <Text style={styles.textWarnLogin}> Necessário inserir informação em todos os campos!</Text>
                      </View>
                    ))}

                  {(errors.password && touched.password) ||
                    (errors.passwordVerify && touched.passwordVerify && (
                      <View style={styles.WarnLogin}>
                        <Ionicon name='warning-outline' color='black' size={20} />
                        <Text style={styles.textWarnLogin}> {errors.password || errors.passwordVerify} </Text>
                      </View>
                    ))}

                  {erroRegister && (
                    <View style={styles.erroLogin}>
                      <Ionicon name='alert-circle-outline' color='white' size={20} />
                      <Text style={styles.textErroLogin}>
                        {' '}
                        Ocorreu um problema ao se cadastrar! Possivelmente seu e-mail já está cadastrado
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  )
}

export default Signup
