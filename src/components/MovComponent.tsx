import React, { useState, useEffect } from 'react';
import { Image, View, FlatList, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FAB, ActivityIndicator } from 'react-native-paper';
import SaldoCaixa from './SaldoCaixa';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService, {config} from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
const numberToReal = require('../config/numberToReal');

const Entrada: React.FC = ({route}) => {

    const [entrada, setEntrada] = useState([]);
    const [visibleShimmer, setVisibleShimmer] = useState(false);
    const [loading, setLoading] = useState(true);

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    let typeMov: number;
    let colorMov: any;
    let imageMov: any;
    let typeMovDelete: number;
    let iconMov: any;

    if(route.name === "Entradas") {
        typeMov = 1;
        typeMovDelete = 2;
        colorMov = "#4db476";
        imageMov = require('../assets/recibo.png');
        iconMov = "arrow-up";
    } else if (route.name === "Saidas") {
        typeMov = 2;
        typeMovDelete = 1;
        colorMov = "red";
        imageMov = require('../assets/recibo_saida.png');
        iconMov = "arrow-down";
    }

    // Deletar Movimentacao
    const deleteMov = (idMov: number, valueMov: number) => {
        const response =  DatabaseService.post('/movimentacao_caixa/movs-delete', {id: idMov}, config)
        .then(() => showToast("Movimentação removida com sucessos!"))
        .catch((err) => console.log(err + 'aqui1'))

        const updateSaldo = DatabaseService.post('/caixa_saldo/updatesaldo/' + auth().currentUser?.uid + '/' + typeMovDelete, {
            valor: valueMov
        }, config).then(function (response) {
            setTimeout(() => {showToast("Saldo atualizado com sucesso!") }, 2000);
        }).catch(function (err) {
            console.log(err + 'aqui2');
        });
    }

    // Carregar lista
    const loadEntrada = async () => {
        try{
            const response = await DatabaseService.get('/movimentacao_caixa/movs/' + auth().currentUser?.uid + '/' + typeMov);
            setEntrada(response.data);
            setLoading(false);
        }catch(err) { 
            console.log(err); 
        }
    }

    useEffect(() =>{
        loadEntrada();
    }, [entrada]);

    const renderItem = ({item}) => (
            <ListItem key={item.Movimentacao_Caixa_id}
            leftAvatar={<Image style={styles.imageRecibo} source={imageMov} />}
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
            
            { loading ? <View style={styles.loading}>
                <Image style={styles.imageCaixaLoading} source={imageMov} />
                <ActivityIndicator size="large" color="#4db476" />
            </View> :
            <View style={{flex: 1}}>
                <FlatList  data={entrada} keyExtractor={item => item.Movimentacao_Caixa_id} renderItem={renderItem} />
                <FAB  style={[styles.fab, { backgroundColor: colorMov}]}
                medium
                icon={iconMov}
                onPress={() => RootNavigation.navigate('AddMov', {type: typeMov})} /> 
            </View>}
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
    },
    centeredViewDelete: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    modalViewDelete: {
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonsModal: {
        flexDirection: "row",
        marginTop: 20
    },
    buttonModalCancel: {
        width: 90,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    buttonModalDelete: {
        width: 90,
        backgroundColor: "red",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 20
    },
    textModalDelete: {
        fontWeight: "bold",
        color: "white"
    },
    imageCaixaLoading: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    loading: {
        padding: 10,
        marginTop: "40%",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Entrada;