import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ListItem  } from 'react-native-elements';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
const numberToReal = require('../config/numberToReal');

const MovMes: React.FC = () => {
    const [movMes, setMovMes] = useState([]);

    const loadMovAno = async () => {
        const response = await DatabaseService.get('/movimentacao_caixa/movs-month/' + auth().currentUser?.uid)
        .then((response) => {
            setMovMes(response.data);
        }).catch((err) => { console.log(err); });
    }

    useEffect(() =>{
        loadMovAno();
    }, [movMes]);

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
        <FlatList  data={movMes} keyExtractor={item => item.Movimentacao_Caixa_id} renderItem={renderItem} />
    </View>
    );
}
const styles = StyleSheet.create({
    imageCaixa: {
        width: 60,
        height: 60
    }

});

export default MovMes;