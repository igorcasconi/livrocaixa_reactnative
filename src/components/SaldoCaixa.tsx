import React, { useState, useEffect } from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import DatabaseService from '../services/DatabaseService';
import auth from '@react-native-firebase/auth';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const numberToReal = require('../config/numberToReal');

const SaldoCaixa: React.FC = () => {

    const [saldo, setSaldo] = useState([]);
    const [visibleShimmer, setVisibleShimmer] = useState(false);

    const loadSaldo = async () => {
        const response = await DatabaseService.get('/caixa_saldo/saldo/' + auth().currentUser?.uid).then(function (response) {
            setSaldo(response.data);
            setVisibleShimmer(true);
        }).catch(function (err) {
            console.log(err);
        });
    }

    useEffect(() =>{
        loadSaldo();
    }, [saldo]);

    return(
    <View style={styles.viewConfig}>
        <Card containerStyle={styles.cardConfig}>
        <ShimmerPlaceHolder autoRun={true} style={{height: 22, width: 150, borderRadius: 10}}  visible={visibleShimmer} >
            {saldo.map(item => (
                <Text key={item.Caixa_Saldo_id} style={styles.textCard}>{numberToReal(item.Caixa_Saldo_value) }</Text>
            ))}
        </ShimmerPlaceHolder>
        </Card>
    </View>);

}

const styles = StyleSheet.create({
    cardConfig: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        width: 200,
        backgroundColor: "#4db476"
    },
    viewConfig: {
        justifyContent: "center",
        alignItems: "center",
    },
    textCard: {
        fontWeight: "bold",
        fontSize: 16
    }
});

export default SaldoCaixa;