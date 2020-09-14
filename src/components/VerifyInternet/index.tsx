import React, { useEffect, useState, useRef } from 'react';
import {useNetInfo} from "@react-native-community/netinfo";
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './style';

const VerifyInternet = () => {

    const netInfo = useNetInfo();
    const [backgroundColor, setBackgroundCollor] = useState('');
    const [messageConnection, setMessageConnection] = useState('');
    const component = useRef(null);

    useEffect(() => {
        if (!netInfo.isConnected) {
            component.current.slideInDown();
            setMessageConnection('Sem conexão com a internet!');
            setBackgroundCollor('#212121');
        } else {
            if (netInfo.isConnected) {
                component.current.fadeOut(500);
                setMessageConnection('Conectado!');
                setBackgroundCollor('#FFF');
            }
        }

    }, [netInfo]);


   

    return(
        <Animatable.View ref={component}>
            <View style={[styles.containerComponent, {backgroundColor}]}>
                <Text style={styles.textMessageConnection}>{messageConnection}</Text>
            </View>
        </Animatable.View>
    );
}   

export default VerifyInternet;