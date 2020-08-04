import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Platform } from 'react-native';
import { Input, Card } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import DatabaseService, { config } from '../services/DatabaseService';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';
import * as RootNavigation from '../config/RootNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import pt from 'date-fns/locale/pt';


const AddMovimentacao: React.FC = ({ route }) => {

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const TypeMov = () => {

        const [date, setDate] = useState(new Date());
        const [mode, setMode] = useState('date');
        const [show, setShow] = useState(false);

        const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
        };
        
        const showMode = currentMode => {
            setShow(true);
            setMode(currentMode);
        };
        
        const showDatepicker = () => {
            showMode('date');
        };
        
        const showTimepicker = () => {
            showMode('time');
        };
        
        let text: any;
        let imageMov: any;

        const { type } = route.params;

        if(type == 1){

            text = "Adicionar uma nova Entrada ao Caixa";
            imageMov = require('../assets/recibo.png');
    
        } else if(type == 2) {
    
            text = "Adicionar uma nova Saída ao Caixa";
            imageMov = require('../assets/recibo_saida.png');

        }

        return(
        <ScrollView>
            <Card containerStyle={styles.card}>
            
            <View style={styles.infoCard}>
                <Image style={styles.imageMov} source={imageMov} />
                <View style={styles.textCardView}>
                    <Text style={styles.textCard}>{text}</Text>
                </View>            
            </View>

            <Formik initialValues= {{
                product: '',
                value: 0,
                paymode: '',
                date: format(date, 'dd/MM/yyyy').toString(),
                time: format(date, 'HH:mm').toString()
            }}
            validationSchema={
                yup.object().shape({
                product: yup.string().required(),
                value: yup.number().required(),
                date: yup.string().required(),
                time: yup.string().required()
            })}
            onSubmit={values => {
                try {
                    const response = DatabaseService.post('/movimentacao_caixa/create-mov/' + auth().currentUser?.uid + '/' + type, {
                        product: values.product,
                        value: values.value,
                        paymode: values.paymode,
                        date: format(date, 'dd/MM/yyyy').toString(),
                        time: format(date, 'HH:mm').toString()
                    }, config);
                
                    RootNavigation.navigate("Movimentacao");
                    showToast("Movimentação cadastrada com sucesso!");

                    const updateSaldo = DatabaseService.post('/caixa_saldo/updatesaldo/' + auth().currentUser?.uid + '/' + type, {
                        valor: values.value
                    },config).then(function (response) {
                        setTimeout(() => {showToast("Saldo atualizado com sucesso!") }, 2000);
                    }).catch(function (err) {
                        console.log(err);
                    });
                   
                } catch(err) {
                    console.log(err);
                    showToast("Ocorreu um erro ao cadastrar Movimentação!");
                }
                
            }}>
            {({values, handleChange, handleSubmit, setFieldValue, errors, touched}) => (

            <View style={styles.inputs}>
                <Text>Data e Hora</Text>
                <View style={styles.inputsDateTime}>
                    
                    <View >
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
                
                {errors.date &&
                    <Text style={styles.textError}>Insira a informação de data!</Text>
                }

                <Text>Informação do Produto</Text>
                <Input 
                value={values.product}
                onChangeText={handleChange('product')}
                placeholder="ex: 2x Camisetas Azuis">
                </Input>
                
                {errors.product && touched.product ?
                    <Text style={styles.textError}>Insira a informação neste campo!</Text> : null
                } 

                <Text>Valor</Text>
                <View style={styles.dateTime}>
                <TextInputMask style={styles.textDate}
                    value={values.value}
                    keyboardType='numeric'
                    onChangeText={handleChange('value')}
                    mask={"R$ [9999990],[00]"}
                />
                </View>

                {errors.value && touched.value ?
                    <Text style={styles.textError}>Insira a informação de valor!</Text> : null
                } 

                <Text>Forma de pagamento</Text>
                <Input 
                    value={values.paymode}
                    onChangeText={handleChange('paymode')} 
                    placeholder="ex: Cartão de Débito, Dinheiro, etc."
                ></Input>
                
                

                <TouchableOpacity style={styles.buttonInfo} onPress={handleSubmit}><Text style={styles.textButton}>Gravar</Text></TouchableOpacity>
                

                
            </View>

            )}</Formik>
            </Card>
        </ScrollView>
        )};

    return(
    <View style={{flex: 1}}>
        { <TypeMov /> }
    </View>);
};

const styles = StyleSheet.create({
    imageMov: {
        width: 90,
        height: 90,
        marginRight: 10
    },
    card: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        backgroundColor: "#ffebb4"
    },
    textCard: {
        fontSize: 20,
    },
    infoCard: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    inputs: {
        marginTop: 10
    },
    textCardView: {
        width: '80%'
    },
    buttonInfo: {
        backgroundColor: "#187feb",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderStyle: "solid",
        borderRadius: 10,
        padding: 10,
        
    },
    textButton: {
        color: "#ffffff",
        fontWeight: "bold"
    },
    colorTextCheckBox: {
        color: "black",
        fontWeight: "bold"
    },
    iconCalendar: {
        fontSize: 20
    },
    inputsDateTime:{
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    dateTime: {
        borderBottomWidth: 1,
        width: 140,
        marginLeft: 12,
        flexDirection: "row",
        padding: 5,
        borderColor: "#747575",
        marginBottom: 20
    },
    Time: {
        borderBottomWidth: 1,
        width: 110,
        marginLeft: 12,
        flexDirection: "row",
        padding: 5,
        borderColor: "#747575",
        marginBottom: 20
    },
    textDate: {
        fontSize: 17,

    },
    iconDateTime: {
        marginRight: 10
    },
    textError: { fontSize: 14, color: 'red', marginBottom: 20 }
})

export default AddMovimentacao;