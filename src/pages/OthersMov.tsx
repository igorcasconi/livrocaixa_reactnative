import React from 'react';
import { View } from 'react-native';
import MovAno from '../components/MovAno';
import MovMes from '../components/MovMes';

const OthersMov: React.FC = ({ route }) => {

    let componente;

    if(route.name === 'MovAno'){
        componente = (<MovAno />);
    } else if(route.name === 'MovMes') {
        componente = (<MovMes />);
    }

    return(
        <View>
            { componente }
        </View>
    );
}

export default OthersMov;