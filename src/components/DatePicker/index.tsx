import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';

import styles from './style';


const DatePicker = () => {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
        
    const showMode = (currentMode: string) => {
        setShow(true);
        setMode(currentMode);
    };
        
    const showDatepicker = () => {
        showMode('date');
    };
        
    const showTimepicker = () => {
        showMode('time');
    };

    return(
        <View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
            )}

            <View style={styles.inputsDateTime}>
                    
                <View >
                    
                    <TouchableOpacity onPress={showDatepicker}>
                        <View style={styles.dateTime}>
                            <Ionicons style={styles.iconDateTime} name="today-outline" size={20}/>
                            <Text style={styles.textDate}>{format(date, "dd/MM/yyyy", { locale: pt })}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity onPress={showTimepicker}>
                        <View style={styles.Time}>
                            <Ionicons style={styles.iconDateTime} name="alarm-outline" size={20}/>
                            <Text style={styles.textDate}>{format(date, "HH:mm", { locale: pt })}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    );

}

export default DatePicker;