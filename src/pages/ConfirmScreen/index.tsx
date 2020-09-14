import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../../navigation/AuthProvider';

import styles from './style';


const ConfirmScreen: React.FC = ({ route }) => {
    const { erroVerifyPassword } = useContext(AuthContext);
    const { navigate } = useNavigation();

    const { email } = route.params;

    let textInfo: string;
    let icon: string;
    let color: string;

    if(erroVerifyPassword) {
        textInfo = `Ocorreu um erro ao alterar a senha, possivelmente o e-mail ${email} não está cadastrado!`;
        icon = "alert-circle-outline";
        color = "red";
    } else {
        textInfo = `O link de alteração de senha foi enviado para o e-mail ${email}, acesse o link no seu e-mail e realize a alteração da senha.`;
        icon = "checkmark-circle-outline";
        color = "white";
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.viewButton}>
                <Text style={styles.textInit}>Alterar senha</Text>

                <Ionicons name={icon} color={color} size={40}/>
                <Text style={styles.textInfo}>{ textInfo }</Text>

                <TouchableOpacity style={styles.buttonAccess} onPress={() => { navigate('Login')}}>
                    <Text style={styles.textButton}>Voltar para o Login</Text>
                </TouchableOpacity>
            </View>  

        </View>
    );
};


export default ConfirmScreen;