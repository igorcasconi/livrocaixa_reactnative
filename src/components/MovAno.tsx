import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListItem  } from 'react-native-elements';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
const numberToReal = require('../config/numberToReal');

const MovAno: React.FC = props => {

    const [movAno, setMovAno] = useState([]);

    const loadMovAno = async () => {
        const response = await DatabaseService.get('/movimentacao_caixa/movs-year/' + auth().currentUser?.uid)
        .then((response) => {
            setMovAno(response.data);
        }).catch((err) => { console.log(err); });
    }

    useEffect(() =>{
        loadMovAno();
    }, [movAno]);

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => RootNavigation.navigate("DetailMovAno", {data: item.ano})}>
            <ListItem key={item.ano}
                leftAvatar={<Image style={styles.imageCaixa} source={require('../assets/caixa-reg.png')} />}
                title={item.ano}
                rightTitle={numberToReal(item.soma)}
                bottomDivider />
        </TouchableOpacity>
    );

    return(
    <View >
        <FlatList data={movAno} keyExtractor={item => item.mes} renderItem={renderItem} />
    </View>)
};

const styles = StyleSheet.create({
    imageCaixa: {
        width: 60,
        height: 60
    },

});

export default MovAno;