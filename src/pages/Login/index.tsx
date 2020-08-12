import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../../navigation/AuthProvider';

import logoImg from '../../assets/logo.png';

import styles from './style';

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
                        <Image style={styles.imageLogo} source={logoImg} />
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

export default Login;