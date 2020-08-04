import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as RootNavigation from '../config/RootNavigation';
import auth  from '@react-native-firebase/auth';
import DatabaseService from '../services/DatabaseService';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const numberToReal = require('../config/numberToReal');

// BOTÕES DA PÁGINA INICIAL
const cards = [{
        id: 1,
        name: "Movimentação do Caixa",
        link: "Movimentacao",
    },
    {
        id: 2,
        name: "Movimentação/Ano",
        link: "MovAno",
    },
    {
        id: 3,
        name: "Movimentação/Mês",
        link: "MovMes",
    },
    {
        id: 4,
        name: "Ajuda",
        link: "Tutorial",
    },
    {
        id: 5,
        name: "Sobre",
        link: "About",
    }
];


const Home: React.FC = () => {

    const [caixaSaldo, setCaixaSaldo] = useState({
        saldo: ''
    });
    const [visibleShimmer, setVisibleShimmer] = useState(false);
    let date = new Date();

    // CARREGA O DADOS DO SALDO DO USUARIO
    const loadSaldo = async () => {
        try{
            const response = await DatabaseService.get('/caixa_saldo/saldo/' + auth().currentUser?.uid);
            const { Caixa_Saldo_value } = response.data; 
            setCaixaSaldo({
                saldo: Caixa_Saldo_value
            });
            setVisibleShimmer(true);
        } catch(err) {
            console.log(err);
        }
    }

    // ATUALIZAÇÃO
    useEffect(() => {
        loadSaldo();
    }, [caixaSaldo]);

    // RENDER DA LISTAGEM DOS BOTÕES
    const renderItem = ({ item }) => (
         <View>
            <TouchableOpacity onPress={() => RootNavigation.navigate(item.link)}>
                <ListItem containerStyle={styles.cardConfig}
                    title={item.name}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    chevron={{ color: 'white', size: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
    // ------------------------------

    
    return(
    <ScrollView>
    <View style={styles.container}>
        <Card  containerStyle={styles.cardInfoCaixa} title="Meu Caixa" titleStyle={{fontSize: 20, color: "#ffffff"}} dividerStyle={{backgroundColor: "#ffffff",}}>
            <View>
                <View style={styles.viewInfo}>
                    <Text style={styles.dateCardInfo}>{ format(date,"E, d 'de' MMMM 'de' yyyy", { locale: pt }) }</Text>
                    
                </View>
                <ShimmerPlaceHolder
                    style={{height: 25, marginTop: -20, borderRadius: 10 }}
                    autoRun={true}
                    visible={visibleShimmer}>
                    <Text style={styles.textCardInfo}><Ionicons name="wallet-outline" size={25}/> Saldo: { numberToReal(caixaSaldo.saldo) } </Text>
                </ShimmerPlaceHolder>
            </View>
        </Card>
        
        
        
            <FlatList data={cards} numColumns={1} keyExtractor={item => item.id} renderItem={renderItem}/>   
                   
    </View>
    </ScrollView> 
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, 
        justifyContent: 'center',
        marginTop: 20
    },
    imageCard: {
        width: 193,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cardConfig: {
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: 60,
        marginBottom: 10,
        backgroundColor: "#2970d1"
    },
    textCard: {
        marginLeft: 10,
        marginTop: 2,
        marginBottom: 5,
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginRight: 10
    },
    cardInfoCaixa: {
        borderRadius: 10,
        backgroundColor: "#4db476",
        marginBottom: 15
    },
    textCardInfo: {
        position: "absolute",
        left: 2,
        bottom: 0,
        fontWeight: "bold",
        fontSize: 17,
        color: "#fff",
    },
    dateCardInfo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff"
    },
    viewInfo: {
        marginBottom: 40
    },
    iconConfig: {
        fontWeight: "bold",
        position: "absolute",
        bottom: 0,
        right: 0,

    }
});

export default Home;