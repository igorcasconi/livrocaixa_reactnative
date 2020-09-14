import React, { useState, useEffect } from 'react';
import { Card, Text } from 'react-native-elements';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';

import styles from './style';

const SaldoCaixa: React.FC = () => {

    const [saldo1, setSaldo1] = useState({
        saldo: ''
    });
    
    const [visibleShimmer, setVisibleShimmer] = useState(false);

    const loadSaldo = async () => {
        try{
            const response = await DatabaseService.get('/movimentacao_caixa/saldo/' + auth().currentUser?.uid);
            const { saldo } = response.data;
            setSaldo1({
                saldo,
            });
            
            setVisibleShimmer(true);
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() =>{
        loadSaldo();
    }, [saldo1]);

    

    return(
    <View style={styles.viewConfig}>
        <Card containerStyle={styles.cardConfig}>
        <ShimmerPlaceHolder autoRun={true} style={{height: 22, width: 150, borderRadius: 10}}  visible={visibleShimmer} >
                <Text style={styles.textCard}>{ numberToReal(saldo1.saldo) }</Text>
        </ShimmerPlaceHolder>
        </Card>
    </View>);

}

export default SaldoCaixa;