import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Input, Card } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import DatabaseService from '../services/DatabaseService';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputMask from 'react-native-text-input-mask';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';
import NumericInput from '@wwdrew/react-native-numeric-textinput';
import * as RootNavigation from '../config/RootNavigation';


const AddMovimentacao: React.FC = ({ route }) => {

    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const TypeMov = () => {

        var config = {
            headers: {'X-My-Custom-Header': 'Header-Value'}
        };
        
        let text: any;
        let imageMov: any;
        let type: Number;

        if(route.name === 'AddMovEntrada'){

            text = "Adicionar uma nova Entrada ao Caixa";
            imageMov = require('../assets/recibo.png');
            type = 1;
    
        } else if(route.name === 'AddMovSaida') {
    
            text = "Adicionar uma nova Saída ao Caixa";
            imageMov = require('../assets/recibo_saida.png');
            type = 2;
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
                date: format(new Date(), 'dd/MM/yyyy').toString(),
                time: format(new Date(), 'HH:mm').toString()
            }}
            validationSchema={
                yup.object().shape({
                product: yup.string().required(),
                value: yup.number().required(),
                date: yup.string().required(),
                time: yup.string().required()
            })}
            onSubmit={values => {
                const response = DatabaseService.post('/movimentacao_caixa/create-mov/' + auth().currentUser?.uid + '/' + type, {
                    product: values.product,
                    value: values.value,
                    paymode: values.paymode,
                    date: values.date,
                    time: values.time
                }, config)
                .then(function (response) {
                    RootNavigation.navigate("Movimentacao");
                    showToast("Movimentação cadastrada com sucesso!");
                    console.log(values.date);
                    console.log(values.time);
                }).catch(function (err) {
                    console.log(err);
                    showToast("Ocorreu um erro ao cadastrar Movimentação!");
                });


                const updateSaldo = DatabaseService.post('/caixa_saldo/updatesaldo/' + auth().currentUser?.uid + '/' + type, {
                    valor: values.value
                },config).then(function (response) {
                    setTimeout(() => {showToast("Saldo atualizado com sucesso!") }, 2000);
                }).catch(function (err) {
                    console.log(err);
                });
                
                
            }}>
            {({values, handleChange, handleSubmit, setFieldValue, errors}) => (

            <View style={styles.inputs}>
                <Text>Descrição</Text>
                <Input 
                value={values.product}
                onChangeText={handleChange('product')}
                placeholder="Informação da Movimentação">
                </Input>
                {errors.product &&
                    <Text style={styles.textError}>Insira a informação na Descrição!</Text>
                } 
                <Text>Valor</Text>
                <View style={styles.dateTime}>
                    <NumericInput
                        type='currency'
                        locale='pt-BR'
                        currency='BRL'
                        placeholder="R$ XX.XX"
                        value={values.value}
                        onUpdate={(value) => setFieldValue('value', value)}
                        style={styles.textDate}
                    />
                </View>
                {errors.value &&
                    <Text style={styles.textError}>Insira a informação de valor!</Text>
                } 

                <Text>Forma de pagamento</Text>
                <Input 
                    value={values.paymode}
                    onChangeText={handleChange('paymode')} 
                    placeholder="ex: Cartão de Débito, Dinheiro, etc."
                ></Input>
                
                <Text>Data</Text>
                <View style={styles.dateTime}>
                    <Ionicons style={styles.iconDateTime} name="today-outline" size={20}/>
                    <TextInputMask style={styles.textDate}
                        value={values.date}
                        keyboardType='numeric'
                        onChangeText={handleChange('date')}
                        mask={"[00]/[00]/[0000]"}
                    />
                </View>
                {errors.date &&
                    <Text style={styles.textError}>Insira a informação de data!</Text>
                } 
                <Text>Hora</Text>
                <View style={styles.dateTime}>
                    <Ionicons style={styles.iconDateTime} name="alarm-outline" size={20}/>
                    <TextInputMask style={styles.textDate}
                        value={values.time}
                        keyboardType='numeric'
                        onChangeText={handleChange('time')}
                        mask={"[00]:[00]"}
                    />
                </View>

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
        marginBottom: 20
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
    dateTime: {
        borderBottomWidth: 1,
        width: 140,
        marginLeft: 12,
        flex: 1,
        flexDirection: "row",
        padding: 1,
        borderColor: "#747575",
        marginBottom: 20
    },
    textDate: {
        fontSize: 16,
        marginRight: 10
    },
    iconDateTime: {
        marginTop: 13
    },
    textError: { fontSize: 14, color: 'red', marginBottom: 20 }
})

export default AddMovimentacao;