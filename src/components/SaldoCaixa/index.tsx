import React, { useState, useEffect } from 'react';
import { Card, Text } from 'react-native-elements';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import DatabaseService from '../../services/DatabaseService';
import numberToReal from '../../config/numberToReal';

import styles from './style';

const SaldoCaixa: React.FC = () => {

    const [saldo, setSaldo] = useState({
        saldo: ''
    });
    
    const [visibleShimmer, setVisibleShimmer] = useState(false);

    const loadSaldo = async () => {
        try{
            const response = await DatabaseService.get('/caixa_saldo/saldo/' + auth().currentUser?.uid);
            const { Caixa_Saldo_value } = response.data;
            setSaldo({
                saldo: Caixa_Saldo_value
            });
            setVisibleShimmer(true);
        }catch(err) {
            console.log(err);
        }
    }

    useEffect(() =>{
        loadSaldo();
    }, [saldo]);

    return(
    <View style={styles.viewConfig}>
        <Card containerStyle={styles.cardConfig}>
        <ShimmerPlaceHolder autoRun={true} style={{height: 22, width: 150, borderRadius: 10}}  visible={visibleShimmer} >
                <Text style={styles.textCard}>{ numberToReal(saldo.saldo) }</Text>
        </ShimmerPlaceHolder>
        </Card>
    </View>);

}

export default SaldoCaixa;