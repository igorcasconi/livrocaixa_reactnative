import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Input } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';

const Login: React.FC = ({navigation}) => {

    const { erro, login } = useContext(AuthContext);
    const [user, setUser] = useState();
    const [password, setPassword]= useState();
    const [loading, setLoading] = useState(0);
    const [erroLogin, setErroLogin] = useState(false);

    return (
        <View style={styles.container}>
            
            <View style={styles.viewButton}>
                <Text style={styles.textInit}>Bem-vindo ao Livro Caixa</Text>
            </View>

            <View style={styles.viewImageLogo}>
                <Image style={styles.imageLogo} source={require('../assets/logo.png')} />
            </View>

            <View>
                <Input label="e-mail"
                placeholder="email@exemplo.com"
                keyboardType="email-address"
                labelStyle={{color: "white", marginBottom: 10}} 
                leftIcon={{ type: 'ionicon', name: 'person-circle-outline' }} 
                inputContainerStyle={{backgroundColor: "white", paddingLeft: 10, borderRadius: 30}} 
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

                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.buttonAccess} onPress={() => {
                        login(user, password);
                        setLoading(1);
                        if (erro === true) {
                            setErroLogin(true);
                            setLoading(2);
                        }
                        
                    }}>
                        <Text style={styles.textButton}>Acessar</Text>
                        <Ionicon name="chevron-forward" size={20} color="white" />
                    </TouchableOpacity>

                    <View style={styles.socialIcons}>
                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.textButton}>Novo no Aplicativo? Cadastre-se!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    { erroLogin ? <View style={styles.erroLogin}>
                    <Ionicon name="alert-circle-outline" color="white" size={20}/>
                    <Text style={styles.textErroLogin} > e-mail ou senha estão incorretos!</Text>
                    </View> : null}

                    { loading == 1 ? <ActivityIndicator animating={true} style={{marginTop: 30}} color="blue" size={30} /> : null }

                </View>  

                    

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
    buttonSignUp: {
        borderBottomWidth: 4,
        borderColor:"#3b61e6",
        padding: 5,
        borderRadius: 20
    }
})

export default Login;