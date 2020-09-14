import React, { HtmlHTMLAttributes, InputHTMLAttributes } from 'react';
import { Input } from 'react-native-elements';

import styles from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label: string;
    placeText: string;
    keyboard: string;
    icon: string;
}

const InputLogin: React.FC<InputProps> = ({label, placeText, keyboard, icon, ...rest}) => {

    return(
        <Input label={label}
            placeholder={placeText}
            keyboardType={keyboard}
            labelStyle={styles.label} 
            leftIcon={{ type: 'ionicon', name: icon }} 
            inputContainerStyle={styles.container} 
            {...rest}
    />
    );

}

export default InputLogin;