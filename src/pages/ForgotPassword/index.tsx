import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';

import AuthContext from '../../navigation/AuthProvider';

import styles from './style';

const ForgotPassword = () => {
    const { erroRegister, register, loading } = useContext(AuthContext);
    const [user, setUser] = useState();
    const [password, setPassword]= useState();

    return (
        <View style={styles.container}>
            
            <View style={styles.viewButton}>
                <Text style={styles.textInit}>Cadastre-se ao Livro Caixa</Text>
                <Text style={styles.textInfoSignUp}>Preencha as informações e experimente seu controle de caixa em suas mãos!</Text>
            </View>

            <View>
                <Formik initialValues={{
                    email: '',
                    password: '',
                    password_verify: ''
                }}
                validationSchema={
                    yup.object().shape({
                    email: yup.string().required(),
                    password: yup.number().required(),
                    password_verify: yup.string().required()
                })}
                onSubmit={values => console.log(values)

                }>
                {({values, handleChange, handleSubmit, setFieldValue, errors, touched}) => (
                    <View>
                        <Input label="e-mail"
                        placeholder="email@exemplo.com"
                        keyboardType="email-address"
                        labelStyle={{color: "white", marginBottom: 10}} 
                        leftIcon={{ type: 'ionicon', name: 'person-circle-outline' }} 
                        inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30}} 
                        autoCapitalize='none'
                        value={values.email}
                        onChangeText={handleChange('email')}/>

                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.buttonAccess}>
                                <Text style={styles.textButton}>Acessar</Text>
                                <Ionicon name="chevron-forward" size={20} color="white" />
                            </TouchableOpacity>

                        { loading ? <ActivityIndicator animating={true} style={{marginTop: 30}} color="blue" size={30} /> : null }

                        { errors && touched ? <View style={styles.WarnLogin}>
                        <Ionicon name="warn-outline" color="black" size={20}/>
                        <Text style={styles.textWarnLogin} > Necessário inserir informação em todos os campos!</Text>
                        </View> : null}

                        { erroRegister ? <View style={styles.erroLogin}>
                        <Ionicon name="alert-circle-outline" color="white" size={20}/>
                        <Text style={styles.textErroLogin} > Ocorreu um problema ao se cadastrar! Possivelmente seu e-mail já está cadastrado</Text>
                        </View> : null}

                        </View>  
                    </View>
                )} </Formik>
            </View>
        </View>
    );
};


export default ForgotPassword;