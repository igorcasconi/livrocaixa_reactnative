import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

const numberToReal = require('../config/numberToReal');

const DetailMov: React.FC = ({ route }) => {
    
    let titulo: any;
    let link: string;
    const [detailmov, setDetailmov] = useState([]);
    const { data } = route.params;

    if(route.name === 'DetailMovAno') {
        titulo = "Ano " + data;
        link = "/movs-detail-year/" + auth().currentUser?.uid + '/' + data;
        
    } else if ( route.name === 'DetailMovMes') {
        titulo = "Mês " + format(data, "MMMM'/'yyyy", { locale: pt });
        link = "/movs-detail-month/" + auth().currentUser?.uid + '/' + format(data, 'MMMM') + '/' + format(data,'yyyy');
    }
    
    const loadInfoMov = async () => {
        const response = await DatabaseService.get('/movimentacao_caixa/'+ link)
        .then((response) => {
            setDetailmov(response.data);
        }).catch((err) => { console.log(err); });
    };

    useEffect(() => {
        loadInfoMov();
    }, []);


    return(
        <ScrollView>
        <View>
            { detailmov.map(item => (
            <Card key={item.data} containerStyle={styles.cardConfig} title={titulo}>
                <View style={styles.viewImageCard}>   
                    <Image style={styles.imageCard} source={require('../assets/caixa-reg.png')} />
                </View> 
                
                <Text style={styles.textSaldo}><Ionicons name="wallet-outline" size={20}/> Saldo: {numberToReal(item.soma)}</Text>
                <Text style={styles.textSaldo}><Ionicons name="wallet-outline" size={20}/> Gastos: {numberToReal(item.gastos)}</Text>
                <Text style={styles.textTitle}>Quantidades de Movimentações</Text>
                <Text style={styles.textMov}><Ionicons name="arrow-up-circle-outline" size={15} color="green" /> Entradas: {item.entrada}</Text>
                <Text style={styles.textMov}><Ionicons name="arrow-down-circle-outline" size={15} color="red"/> Saídas:  {item.saida}</Text> 
            </Card>
            ))}
        </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    cardConfig: {
        borderRadius: 20
    },
    imageCard: {
        width: 120,
        height: 120,
        
    },
    viewImageCard: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    textSaldo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    textMov: {
        fontSize: 15
    },
    textTitle: {
        fontSize: 20,
        marginBottom: 5
    }
});

export default DetailMov;