import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                    <Image style={styles.imageLogo} source={require('../assets/logo.png')} />
                </View>

                <View style={styles.viewInfoVersion}>
                    <Ionicons name="checkmark-circle" size={22} color="green"/>
                    <Text style={styles.textInfo}> Versão 1.1.7</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 5,
        fontWeight: "bold"
    },
    viewButton: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    textInfo: {
        fontSize: 20,
        fontWeight: "bold"
    },
    viewInfoVersion: {
        flexDirection: "row",
        marginTop: 10
    },
    viewInfo: {
        marginTop: 20
    },
    textInfoLink: {
        fontSize: 20,
        color: "#1092e6",
        textDecorationLine: "underline"
    },
});

export default About;