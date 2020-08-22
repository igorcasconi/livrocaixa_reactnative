import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { Input, Card } from 'react-native-elements';
import { format } from 'date-fns';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import DatabaseService, { config } from '../../services/DatabaseService';
import * as RootNavigation from '../../config/RootNavigation';
import DatePicker from '../../components/DatePicker';
import AdsBanner from '../../components/AdsBanner';
import AdsInterstitial, { interstitialShow } from '../../components/AdsInterstitial';

import reciboEntradaImg from '../../assets/recibo.png';
import reciboSaidaImg from '../../assets/recibo_saida.png';

import styles from './style';





const AddMovimentacao: React.FC = ({ route }) => {

    const [date, setDate] = useState(new Date());
    const { navigate } = useNavigation();
    const showToast = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const TypeMov = () => {

        let text: any;
        let imageMov: any;

        const { type } = route.params;

        if(type == 1){

            text = "Adicionar uma nova Entrada ao Caixa";
            imageMov = reciboEntradaImg;
    
        } else if(type == 2) {
    
            text = "Adicionar uma nova Saída ao Caixa";
            imageMov = reciboSaidaImg;

        }

        return(
        <ScrollView>
            <AdsBanner />   
            <AdsInterstitial />
            <Card containerStyle={styles.card}>
            
            <View style={styles.infoCard}>
                <Image style={styles.imageMov} source={imageMov} />
                <View style={styles.textCardView}>
                    <Text style={styles.textCard}>{text}</Text>
                </View>            
            </View>

            <Formik initialValues= {{
                product: '',
                value: '',
                paymode: '',
                date: format(date, 'dd/MM/yyyy').toString(),
                time: format(date, 'HH:mm').toString()
            }}
            validationSchema={
                yup.object().shape({
                product: yup.string().required(),
                value: yup.string().required(),
                date: yup.string().required(),
                time: yup.string().required()
            })}
            onSubmit={values => {
                
                let val = parseFloat(values.value.replace('R$ ', '').replace(',', '.'));

                try {
                    const response = DatabaseService.post('/movimentacao_caixa/create-mov/' + auth().currentUser?.uid + '/' + type, {
                        product: values.product,
                        value: val,
                        paymode: values.paymode,
                        date: format(date, 'dd/MM/yyyy').toString(),
                        time: format(date, 'HH:mm').toString()
                    }, config);
                
                    navigate("Movimentacao");
                    interstitialShow();
                    showToast("Movimentação cadastrada com sucesso!");

                    const updateSaldo = DatabaseService.post('/caixa_saldo/updatesaldo/' + auth().currentUser?.uid + '/' + type, {
                        valor: val
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
                
                <DatePicker />

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
                <TextInputMask
                    type={'money'}
                    value={values.value}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    onChangeText={handleChange('value')} 
                    placeholder="R$ XX,XX"
                />
                </View>

                {errors.value && touched.value ?
                    <Text style={styles.textError}>Insira o valor!</Text> : null
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



export default AddMovimentacao;