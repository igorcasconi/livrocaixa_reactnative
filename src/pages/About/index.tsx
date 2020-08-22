import React, { useCallback } from 'react';
import { View, ScrollView, Text, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import logoImg from '../../assets/logo.png';

import styles from './style';

const About = () => {

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
      
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert('Não foi possível abrir a URL:' + url);
        }
    }, [url])
    return <TouchableOpacity onPress={handlePress}><Text style={styles.textInfoLink}>{children}</Text></TouchableOpacity>;
    };

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.viewButton}>
                    <Text style={styles.textInit}>Livro Caixa</Text>
                </View>

                <View style={styles.viewImageLogo}>
                    <Image style={styles.imageLogo} source={logoImg} />
                </View>

                <View style={styles.viewInfoVersion}>
                    <Ionicons name="checkmark-circle" size={22} color="green"/>
                    <Text style={styles.textInfo}> Versão 1.2.0</Text>
                </View>

                <View style={styles.viewInfo}>
                    <Text style={styles.textInfo}>Crédito ao autor das imagens das Movimentações:</Text>
                    <View style={styles.viewInfoVersion}>
                        <Ionicons name="link-outline" size={25} color="gray"/>
                        <OpenURLButton url="https://www.flaticon.com/br/autores/icongeek26"> Icongeek26</OpenURLButton>
                    </View>
                </View>

                <View style={styles.viewInfo}>
                    <Text style={styles.textInfo}>Aplicativo desenvolvido por:</Text>
                    <View style={styles.viewInfoVersion}>
                        <Ionicons name="person" size={25} color="#4db476"/>
                        <Text style={styles.textInfo}> Igor Casconi de Oliveira</Text>
                        
                    </View>
                    <View style={styles.viewInfoVersion}>
                        <Ionicons name="link-outline" size={25} color="gray"/>
                        <OpenURLButton url="http://idotdev.online"> Blog I.Dev</OpenURLButton>
                    </View>

                    <View style={styles.viewInfoVersion}>
                        <Ionicons name="link-outline" size={25} color="gray"/>
                        <OpenURLButton url="https://www.linkedin.com/in/igorcasconioliveira/"> Linkedin</OpenURLButton>
                    </View>
                </View>
            </View>
        </ScrollView>
    );

}

export default About;