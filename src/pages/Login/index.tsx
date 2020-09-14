import React, { useState, useContext } from 'react';
import { View, Text, Image, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../navigation/AuthProvider';
import InputLogin from '../../components/InputLogin';

import logoImg from '../../assets/logo.png';

import styles, { Container, ButtonSignUp, ButtonForgot, TextButton, TextButtonForgot, ButtonAccess, ViewButtonLogin, ImageLogo, ViewInit, TextInit, ErroLogin } from './style';


const Login: React.FC = () => {

    const { erro, login, loading } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [password, setPassword]= useState('');
    const { navigate } = useNavigation();

    return (
        <Container behavior="height">
            <ScrollView>

                    <ViewInit>
                        <ImageLogo source={logoImg} />
                    </ViewInit>

                    <ViewInit>
                        <TextInit>Bem-vindo ao Livro Caixa</TextInit>
                    </ViewInit>

                    { erro ? <ErroLogin>
                    <Ionicon name="alert-circle-outline" color="white" size={20}/>
                    <Text style={styles.textErroLogin} > e-mail ou senha estão incorretos!</Text>
                    </ErroLogin> : null}

                    <InputLogin label="e-mail"  keyboard="email-address" icon="person-circle-outline" autoCapitalize='none' placeText="email@exemplo.com" value={user}
                    onChangeText={user => setUser(user)} />

                    <InputLogin label="senha" placeText="*******" secureTextEntry={true} icon="lock-closed" value={password}
                    onChangeText={password => setPassword(password)}/>

                    <ButtonAccess onPress={() => { login(user, password); Keyboard.dismiss() }}>
                        <TextButton>Entrar</TextButton>
                    </ButtonAccess>

                    { loading ? <ActivityIndicator animating={true} style={{marginTop: 20}} color="blue" size={30} /> : null }

                    <ViewButtonLogin >
                        <ButtonSignUp onPress={() => navigate('SignUp')}>
                            <TextButton>Novo no Aplicativo? Cadastre-se!</TextButton>
                        </ButtonSignUp>

                        <ButtonForgot onPress={() => navigate('ForgotPassword')}>
                            <TextButtonForgot>Esqueceu a senha?</TextButtonForgot>
                        </ButtonForgot>
                    </ViewButtonLogin>

            </ScrollView>
        </Container>
    );
};

export default Login;