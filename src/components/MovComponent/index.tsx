import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator,ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import FAB from 'react-native-fab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

import reciboEntradaImg from '../../assets/recibo.png';
import reciboSaidaImg from '../../assets/recibo_saida.png';

import DatabaseService, {config} from '../../services/DatabaseService';
import SaldoCaixa from '../SaldoCaixa';
import numberToReal from '../../config/numberToReal'

import styles from './style';


interface MovProps {
    Movimentacao_Caixa_id: number;
    Movimentacao_Caixa_product: string;
    Movimentacao_Caixa_value: number;
    data_formatada: string;
    hora_formatada: string;
    Movimentacao_Caixa_Paymode: string; 
}

const Entrada: React.FC<MovProps> = ({ route }) => {

    const [entrada, setEntrada] = useState([]);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();

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
        imageMov = reciboEntradaImg;
        iconMov =  <Ionicons name="arrow-up" />;
    } else if (route.name === "Saidas") {
        typeMov = 2;
        typeMovDelete = 1;
        colorMov = "red";
        imageMov = reciboSaidaImg;
        iconMov = <Ionicons name="arrow-down" />;
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

    return(
        <View style={styles.list}>
            <SaldoCaixa />
            
            { loading ? <View style={styles.loading}>
                <Image style={styles.imageCaixaLoading} source={imageMov} />
                <ActivityIndicator size="large" color="#4db476" />
            </View> :
            <View style={{flex: 1}}>
               
                <ScrollView>
                    {entrada.map((item: MovProps) => {
                        return(
                        <ListItem key={item.Movimentacao_Caixa_id} bottomDivider >
                            <Avatar source={imageMov} containerStyle={styles.imageRecibo}/>
                            <ListItem.Content>
                                <ListItem.Title>{item.Movimentacao_Caixa_product}</ListItem.Title>
                                <ListItem.Subtitle>{item.Movimentacao_Caixa_Paymode + " - " + item.data_formatada + ' ' + item.hora_formatada}</ListItem.Subtitle>    
                            </ListItem.Content>
                            <ListItem.Title>{numberToReal(item.Movimentacao_Caixa_value.toString())}</ListItem.Title>
                            <TouchableOpacity onPress={() => Alert.alert("Movimentações do Caixa", "Deseja realmente excluir a movimentação?", [
                                    { text: "Cancelar", onPress: () => null, style: "cancel" },
                                    { text: "EXCLUIR", onPress: () => deleteMov(item.Movimentacao_Caixa_id, item.Movimentacao_Caixa_value)} ])}>
                                <Ionicons name="trash-bin" color="red" size={25} /></TouchableOpacity>
                        </ListItem>
                    )

                    })}
                </ScrollView>

                
            </View>}

            <FAB buttonColor={colorMov}
                iconTextColor="#FFFFFF"
                visible={true} 
                iconTextComponent={iconMov}
                onClickAction={() => navigate('AddMov', {type: typeMov})} /> 
        </View>
    );

};

export default Entrada;