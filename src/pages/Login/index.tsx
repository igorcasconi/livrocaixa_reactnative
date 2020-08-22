import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, KeyboardAvoidingView, Keyboard, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../navigation/AuthProvider';
import InputLogin from '../../components/InputLogin';

import logoImg from '../../assets/logo.png';

import styles from './style';


const Login: React.FC = () => {

    const { erro, login, loading } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [password, setPassword]= useState('');
    const { navigate } = useNavigation();

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

                    { erro ? <View style={styles.erroLogin}>
                    <Ionicon name="alert-circle-outline" color="white" size={20}/>
                    <Text style={styles.textErroLogin} > e-mail ou senha estão incorretos!</Text>
                    </View> : null}

                    <InputLogin label="e-mail"  keyboard="email-address" icon="person-circle-outline" autoCapitalize='none' placeText="email@exemplo.com" value={user}
                    onChangeText={user => setUser(user)} />

                    <InputLogin label="senha" placeText="*******" secureTextEntry={true} icon="lock-closed" value={password}
                    onChangeText={password => setPassword(password)}/>

                    <TouchableOpacity style={styles.buttonAccess} onPress={() => {
                        login(user, password);
                        Keyboard.dismiss()
                    }}>
                        <Text style={styles.textButton}>Entrar</Text>
                    </TouchableOpacity>

                    { loading ? <ActivityIndicator animating={true} style={{marginTop: 30}} color="blue" size={30} /> : null }

                    <View style={styles.buttonsLogin}>
                        <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigate('SignUp')}>
                            <Text style={styles.textButton}>Novo no Aplicativo? Cadastre-se!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonForgot} onPress={() => navigate('ForgotPassword')}>
                            <Text style={styles.textButtonForgot}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;