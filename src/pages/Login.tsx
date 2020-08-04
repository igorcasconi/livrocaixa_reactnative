import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';

const Login: React.FC = ({navigation}) => {

    const { erro, login, loading } = useContext(AuthContext);
    const [user, setUser] = useState();
    const [password, setPassword]= useState();

    return (
        <KeyboardAvoidingView
        behavior="height"
        style={styles.container}>
            <ScrollView>
                
                <View style={styles.ViewInputs}>

                    <View style={styles.viewImageLogo}>
                        <Image style={styles.imageLogo} source={require('../assets/logo.png')} />
                    </View>

                    <View style={styles.viewButton}>
                        <Text style={styles.textInit}>Bem-vindo ao Livro Caixa</Text>
                    </View>

                    <Input label="e-mail"
                    placeholder="email@exemplo.com"
                    keyboardType="email-address"
                    labelStyle={{color: "white", marginBottom: 10}} 
                    leftIcon={{ type: 'ionicon', name: 'person-circle-outline' }} 
                    inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30, marginBottom: -20}} 
                    autoCapitalize='none'
                    value={user}
                    onChangeText={user => setUser(user)}/>

                    <Input label="senha" 
                    placeholder="*******"
                    secureTextEntry={true}
                    labelStyle={{color: "white", marginBottom: 10}} 
                    leftIcon={{ type: 'ionicon', name: 'lock-closed' }} 
                    inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30}} 
                    value={password}
                    onChangeText={password => setPassword(password)}/>

                    <View style={styles.forgotPassword}>
                        <View style={styles.viewButtonPass}>
                            <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={styles.textButton}>Esqueceu a senha?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.buttonAccess} onPress={() => {
                            login(user, password);
                            Keyboard.dismiss()
                        }}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.socialIcons}>
                            <View style={styles.viewButton}>
                                <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.textButton}>Novo no Aplicativo? Cadastre-se!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        { loading ? <ActivityIndicator animating={true} style={{marginTop: 30}} color="blue" size={30} /> : null }

                        { erro ? <View style={styles.erroLogin}>
                        <Ionicon name="alert-circle-outline" color="white" size={20}/>
                        <Text style={styles.textErroLogin} > e-mail ou senha estão incorretos!</Text>
                        </View> : null}

                    </View>  

                        

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4db476",
        padding: 10,
    },
    ViewInputs: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginTop: 90
    },
    imageLogo: {
        width: 90,
        height: 90
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
    viewButtonPass: {
        position: 'relative',
    },
    buttonAccess: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b61e6",
        borderRadius: 30,
        width: "100%",
        paddingLeft: 130,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 130
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
    forgotPassword:{
        marginTop: -30,
        marginBottom: 20,
        
    },
    erroLogin: {
        width: 350,
        backgroundColor: "red",
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10, 
        flexDirection: 'row',
    },
    textErroLogin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    buttonSignUp: {
        borderBottomWidth: 4,
        borderColor:"#3b61e6",
        padding: 5,
        borderRadius: 20
    }
})

export default Login;