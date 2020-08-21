import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem  } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';

import caixaImg from '../../assets/caixa-reg.png';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const MovAno: React.FC = () => {

    const [movDetail, setMovDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();

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
        <TouchableOpacity onPress={() => navigate("DetailMovAno", {data: item.ano})}>
            <ListItem key={item.ano}
                leftAvatar={<Image style={styles.imageCaixa} source={caixaImg} />}
                title={item.ano}
                rightTitle={numberToReal(item.soma)}
                bottomDivider />
        </TouchableOpacity>
    );

    return(
    <View >
        { loading ? <View style={styles.loading}>
            <Image style={styles.imageCaixaLoading} source={caixaImg} />
            <ActivityIndicator size="large" color="#4db476" />
        </View> :
        <FlatList data={movDetail} keyExtractor={item => item.mes} renderItem={renderItem} /> }
    </View>)
};


export default MovAno;