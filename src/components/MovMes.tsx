import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem  } from 'react-native-elements';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import { ActivityIndicator } from 'react-native-paper';
const numberToReal = require('../config/numberToReal');

const MovMes: React.FC = () => {
    const [movDetail, setMovDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMovAno = async () => {
        try{
            const response = await DatabaseService.get('/movimentacao_caixa/movs-month/' + auth().currentUser?.uid);
            setMovDetail(response.data);
            setLoading(false);
        } catch(err) { 
            console.log(err); 

        }
    }

    useEffect(() =>{
        loadMovAno();
    }, [movDetail]);

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => RootNavigation.navigate('DetailMovMes', {data: parseISO(item.Movimentacao_Caixa_date)})}>
            <ListItem key={item.Movimentacao_Caixa_id}
                leftAvatar={<Image style={styles.imageCaixa} source={require('../assets/caixa-reg.png')} />}
                title={format(parseISO(item.Movimentacao_Caixa_date), "MMMM'/'yyyy ", { locale: pt })}
                rightTitle={numberToReal(item.soma)}
                bottomDivider />
        </TouchableOpacity>    
    
    );

    return(
    <View>

        { loading ? <View style={styles.loading}>
            <Image style={styles.imageCaixaLoading} source={require('../assets/caixa-reg.png')} />
            <ActivityIndicator size="large" color="#4db476" />
        </View> :
        <FlatList  data={movDetail} keyExtractor={item => item.Movimentacao_Caixa_id} renderItem={renderItem} /> }
    
    
    </View>
    );
}
const styles = StyleSheet.create({
    imageCaixa: {
        width: 60,
        height: 60
    },
    imageCaixaLoading: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    loading: {
        padding: 10,
        marginTop: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default MovMes;