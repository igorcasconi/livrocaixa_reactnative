import React, { useContext, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';
import DatabaseService from '../services/DatabaseService';
import { Formik } from 'formik';
import * as yup from 'yup';

const Signup = () => {
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

                        <Input label="Senha" 
                        placeholder="*******"
                        secureTextEntry={true}
                        labelStyle={{color: "white", marginBottom: 10}} 
                        leftIcon={{ type: 'ionicon', name: 'lock-closed' }} 
                        inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30}} 
                        value={values.password}
                        onChangeText={handleChange('password')}
                        />

                        <Input label="Repita a senha" 
                        placeholder="*******"
                        secureTextEntry={true}
                        labelStyle={{color: "white", marginBottom: 10}} 
                        leftIcon={{ type: 'ionicon', name: 'lock-closed' }} 
                        inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30}} 
                        value={values.password}
                        onChangeText={handleChange('password')}/>

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4db476",
        padding: 30
    },
    imageLogo: {
        width: 190,
        height: 190
    },
    viewImageLogo: {
        justifyContent: "center",
        alignItems: "center"
    },
    textInit: {
        fontSize: 25,
        marginBottom: 30,
        fontWeight: "bold"
    },
    viewButton: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    buttonAccess: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b61e6",
        borderRadius: 30,
        width: "95%",
        padding: 25,
        flex: 1, 
        flexDirection: 'row',
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    },
    socialIcons: {
        marginTop: 15,
        marginBottom: 20
    },
    erroLogin: {
        width: "92%",
        padding: 20,
        backgroundColor: "red",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flex: 1, 
        flexDirection: 'row',
    },
    textErroLogin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    WarnLogin: {
        width: "92%",
        padding: 20,
        backgroundColor: "yellow",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flex: 1, 
        flexDirection: 'row',
    },
    textWarnLogin: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonSignUp: {
        borderBottomWidth: 4,
        borderColor:"#3b61e6",
        padding: 5,
        borderRadius: 20
    },
    textInfoSignUp: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20
    }
})

export default Signup;