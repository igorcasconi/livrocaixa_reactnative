import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, Keyboard, ScrollView} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as yup from 'yup';

import AuthContext from '../../navigation/AuthProvider';
import InputLogin from '../../components/InputLogin';

import styles from './style';


const Signup: React.FC = () => {
    const { erroRegister, register, loading } = useContext(AuthContext);

    return ( 
            <View style={styles.container}>
                <ScrollView>
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
                        password: yup.string().min(6, "A senha precisa ter no mínimo 6 caracteres").required(),
                        password_verify: yup.string().min(6, "A senha precisa ter no mínimo 6 caracteres").required().oneOf([yup.ref('password'), null], 'As senhas não combinam!')
                    })}
                    onSubmit={values => {
                        console.log(values.password_verify);
                        register(values.email, values.password);
                        Keyboard.dismiss();

                    }}>
                    {({values, handleChange, handleSubmit, errors, touched}) => (
                        <View>
                            <InputLogin label="e-mail" placeText="email@exemplo.com" keyboard="email-address" icon='person-circle-outline' autoCapitalize='none'
                            value={values.email} onChangeText={handleChange('email')}/>

                            <InputLogin label="Senha" placeText="*******" secureTextEntry={true} icon='lock-closed' value={values.password}
                            onChangeText={handleChange('password')}
                            />

                            <InputLogin label="Repita a senha" placeText="*******" secureTextEntry={true} icon='lock-closed' value={values.password_verify}
                            onChangeText={handleChange('password_verify')}/>

                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.buttonAccess} onPress={handleSubmit}>
                                    <Text style={styles.textButton}>Cadastrar</Text>
                                </TouchableOpacity>

                                { loading ? <ActivityIndicator animating={true} style={{marginTop: 30}} color="blue" size={30} /> : null }

                                { (values.email.length == 0 && touched.email) || (values.password.length == 0 && touched.password) || (values.password_verify.length == 0 && touched.password_verify) ? <View style={styles.WarnLogin}>
                                <Ionicon name="warning-outline" color="black" size={20}/>
                                <Text style={styles.textWarnLogin} > Necessário inserir informação em todos os campos!</Text>
                                </View> : null}

                                { (errors.password && touched.password) || (errors.password_verify && touched.password_verify) ? <View style={styles.WarnLogin}>
                                <Ionicon name="warning-outline" color="black" size={20}/>
                                <Text style={styles.textWarnLogin} > { errors.password || errors.password_verify} </Text>
                                </View> : null}

                                { erroRegister ? <View style={styles.erroLogin}>
                                <Ionicon name="alert-circle-outline" color="white" size={20}/>
                                <Text style={styles.textErroLogin} > Ocorreu um problema ao se cadastrar! Possivelmente seu e-mail já está cadastrado</Text>
                                </View> : null}

                            </View>  
                        </View>
                    )} 
                    </Formik>
                </View>
                </ScrollView>
            </View>
    );
};

export default Signup;