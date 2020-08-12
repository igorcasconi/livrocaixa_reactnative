import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem  } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';

import * as RootNavigation from '../../config/RootNavigation';
import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';

import caixaImg from '../../assets/caixa-reg.png';
import styles from './style';

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
                leftAvatar={<Image style={styles.imageCaixa} source={caixaImg} />}
                title={format(parseISO(item.Movimentacao_Caixa_date), "MMMM'/'yyyy ", { locale: pt })}
                rightTitle={numberToReal(item.soma)}
                bottomDivider />
        </TouchableOpacity>    
    
    );

    return(
    <View>

        { loading ? <View style={styles.loading}>
            <Image style={styles.imageCaixaLoading} source={caixaImg} />
            <ActivityIndicator size="large" color="#4db476" />
        </View> :
        <FlatList  data={movDetail} keyExtractor={item => item.Movimentacao_Caixa_id} renderItem={renderItem} /> }
    
    
    </View>
    );
}

export default MovMes;