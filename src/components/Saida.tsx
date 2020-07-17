import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { FAB } from 'react-native-paper';
import SaldoCaixa from './SaldoCaixa';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
const numberToReal = require('../config/numberToReal');

const Saida: React.FC = () => {
    const [saida, setSaida] = useState([]);

    const deleteMov = (idMov: number, valueMov: number) => {
        const response = DatabaseService.get('/delete-mov/'+ auth().currentUser?.uid + '/' + idMov + '/' + 2 + '/' + valueMov ).then(() => console.log("excluiu: "+ idMov)
        ).catch((err) => console.log(err))
    }

    const loadSaida = async () => {
        const response = await DatabaseService.get('/movimentacao_caixa/movs/' + auth().currentUser?.uid + '/' + 2)
        .then((response) => {
            setSaida(response.data);
        }).catch((err) => { console.log(err); });
    }

    useEffect(() =>{
        loadSaida();
    }, [saida]);
    
    const renderItem = ({item}) => (
            <ListItem key={item.Movimentacao_Caixa_id}
            leftAvatar={<Image style={styles.imageRecibo} source={require('../assets/recibo_saida.png')} />}
            title={item.Movimentacao_Caixa_product}
            subtitle={item.Movimentacao_Caixa_Paymode + " - " + item.data_formatada + ' ' + item.hora_formatada}
            rightTitle={numberToReal(item.Movimentacao_Caixa_value)}
            bottomDivider
            rightAvatar={<TouchableOpacity onPress={() => Alert.alert("Movimentações do Caixa", "Deseja realmente excluir a movimentação?", [
                { text: "Cancelar", onPress: () => null, style: "cancel" },
                { text: "EXCLUIR", onPress: () => deleteMov(item.Movimentacao_Caixa_id, item.Movimentacao_Caixa_value)} ])}>
            <Ionicons name="trash-bin" color="red" size={25} /></TouchableOpacity> }/>
    );

    return(
        <View style={styles.list}>
            <SaldoCaixa />
            <FlatList data={saida} keyExtractor={item => item.Movimentacao_Caixa_id} renderItem={renderItem} />
            <FAB  style={styles.fab}
            medium
            icon="arrow-down"
            onPress={() => RootNavigation.navigate('AddMovSaida')} />
        </View>
    );

};

const styles = StyleSheet.create({
    imageRecibo: {
        width: 60,
        height: 60
    },
    list: {
        flex: 1
    },
    fab: {
        backgroundColor: "#cc3030",
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
    },
    deleteConfig: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        padding: 30
    }
});

export default Saida;