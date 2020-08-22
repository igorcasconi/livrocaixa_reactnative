import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal'
import AdsBanner from '../../components/AdsBanner';

import caixaImg from '../../assets/caixa-reg.png';

import styles from './style';

const DetailMov: React.FC = ({ route }) => {
    
    let titulo: any;
    let link: string;
    const [detailmov, setDetailmov] = useState({
        soma: '',
        gastos: '',
        entrada: '',
        saida: ''
    });
    const { data } = route.params;

    if(route.name === 'DetailMovAno') {
        titulo = "Ano " + data;
        link = "/movs-detail-year/" + auth().currentUser?.uid + '/' + data;
        
    } else if ( route.name === 'DetailMovMes') {
        titulo = "Mês " + format(data, "MMMM'/'yyyy", { locale: pt });
        link = "/movs-detail-month/" + auth().currentUser?.uid + '/' + format(data, 'MMMM') + '/' + format(data,'yyyy');
    }
    
    const loadInfoMov = async () => {
        try{
            const response = await DatabaseService.get('/movimentacao_caixa/'+ link);
            const { soma, gastos, entrada, saida } = response.data;
            setDetailmov({
                soma,
                gastos,
                entrada,
                saida
            });
       
        } catch(err) { console.log(err); };
    };

    useEffect(() => {
        loadInfoMov();
    }, []);


    return(
        <ScrollView>
        <AdsBanner />
        <View>
            <Card containerStyle={styles.cardConfig} title={titulo}>
                <View style={styles.viewImageCard}>   
                    <Image style={styles.imageCard} source={caixaImg} />
                </View> 
                
                <Text style={styles.textSaldo}><Ionicons name="wallet-outline" size={20}/> Saldo: {numberToReal(detailmov.soma)}</Text>
                <Text style={styles.textSaldo}><Ionicons name="wallet-outline" size={20}/> Gastos: {numberToReal(detailmov.gastos)}</Text>
                <Text style={styles.textTitle}>Quantidades de Movimentações</Text>
                <Text style={styles.textMov}><Ionicons name="arrow-up-circle-outline" size={15} color="green" /> Entradas: {detailmov.entrada}</Text>
                <Text style={styles.textMov}><Ionicons name="arrow-down-circle-outline" size={15} color="red"/> Saídas:  {detailmov.saida}</Text> 
            </Card>
        </View>
        </ScrollView>
    )
};

export default DetailMov;