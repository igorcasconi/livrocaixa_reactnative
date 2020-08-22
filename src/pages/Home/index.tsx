import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import auth  from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';
import AdsBanner from '../../components/AdsBanner';

import styles from './style';
import { useNavigation } from '@react-navigation/native';

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

    const { navigate } = useNavigation();
    const [caixaSaldo, setCaixaSaldo] = useState({saldo: ''});
    const [visibleShimmer, setVisibleShimmer] = useState(false);
    let date = new Date();

    // CARREGA O DADOS DO SALDO DO USUARIO
    const loadSaldo = async () => {
        try{
            const response = await DatabaseService.get('/caixa_saldo/saldo/' + auth().currentUser?.uid);
            const { Caixa_Saldo_value } = response.data; 
            setCaixaSaldo({ saldo: Caixa_Saldo_value });
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
            <TouchableOpacity onPress={() => navigate(item.link)}>
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
        
        <AdsBanner />   
    </ScrollView> 
    );
}

export default Home;