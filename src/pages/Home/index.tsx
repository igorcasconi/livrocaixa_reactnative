import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import auth  from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';
import AdsBanner from '../../components/AdsBanner';

import styles from './style';
import VerifyInternet from '../../components/VerifyInternet';

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
            const response = await DatabaseService.get('/movimentacao_caixa/saldo/' + auth().currentUser?.uid);
            const { saldo } = response.data; 
            setCaixaSaldo({ saldo });
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
                <ListItem containerStyle={styles.cardConfig}>
                    <ListItem.Content>
                        <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron color="white" size={20} />
                </ListItem>
            </TouchableOpacity>
        </View>
    );
    // ------------------------------

    
    return(
    <>
        <VerifyInternet />
        <ScrollView>
            
            <View style={styles.container}>

                <Card  containerStyle={styles.cardInfoCaixa}>
                    <Card.Title style={{fontSize: 20, color: "#ffffff"}} >Meu Caixa</Card.Title>
                    <Card.Divider style={{backgroundColor: "#ffffff",}} />
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
                     <Text style={styles.textAds}>- Propaganda -</Text>
                    <AdsBanner margin={-20} />          
            </View>
            
            
        </ScrollView> 
        
    </>
    );
}

export default Home;