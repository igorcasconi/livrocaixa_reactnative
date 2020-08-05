import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { ListItem  } from 'react-native-elements';
import * as RootNavigation from '../config/RootNavigation';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
const numberToReal = require('../config/numberToReal');

const MovAno: React.FC = () => {

    const [movDetail, setMovDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMovDetail = async () => {
        try{
            const response = await DatabaseService.get('/movimentacao_caixa/movs-year/' + auth().currentUser?.uid)
            setMovDetail(response.data);
            setLoading(false);
        } catch(err) { console.log(err); }
    }

    useEffect(() =>{
        loadMovDetail();
    }, [movDetail]);

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
        { loading ? <View style={styles.loading}>
            <Image style={styles.imageCaixaLoading} source={require('../assets/caixa-reg.png')} />
            <ActivityIndicator size="large" color="#4db476" />
        </View> :
        <FlatList data={movDetail} keyExtractor={item => item.mes} renderItem={renderItem} /> }
    </View>)
};

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

export default MovAno;