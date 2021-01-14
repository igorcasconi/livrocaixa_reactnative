import React from 'react'
<<<<<<< HEAD
import { ScrollView, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
=======
import { ToastAndroid, ScrollView, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import auth from '@react-native-firebase/auth'
>>>>>>> 000880b (fix(app): fixed app)
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import { Controller, useForm } from 'react-hook-form'

import AdsBanner from '../../components/AdsBanner'
import AdsInterstitial, { interstitialShow } from '../../components/AdsInterstitial'
import VerifyInternet from '../../components/VerifyInternet'
<<<<<<< HEAD
import Row from '../../components/Row/Row'
import Column from '../../components/Column/Column'
=======
import Row from '../../components/Row'
import Column from '../../components/Column'
import { addMov } from '../../services/movimentacao'
>>>>>>> 000880b (fix(app): fixed app)

import reciboEntradaImg from '../../assets/recibo.png'
import reciboSaidaImg from '../../assets/recibo_saida.png'

import {
  ButtonSubmit,
  CardMov,
  ImageMov,
  InputFieldText,
  InputFieldValue,
  TextButton,
  TextError,
  TextInfo
} from './style'
<<<<<<< HEAD
import { MovProps } from './types'
import { MovSchema } from '../../schemas'
import { AddMovRouteProp } from '../../navigation/type'
import { showToast } from '../../utils/notification'
import { MovementPayloadProps } from '../../shared/movement'
import { useRealm } from '../../context/RealmContext'
import { useUser } from '../../context/AuthContext'
import { unformatCurrency } from '../../utils/formatters'
=======
import { MovPayloadProps, MovProps } from './types'
import { MovSchema } from '../../schemas'
import { AddMovRouteProp } from '../../navigation/type'
>>>>>>> 000880b (fix(app): fixed app)

const AddMovimentacao: React.FC = () => {
  const route = useRoute<AddMovRouteProp>()
  const { type } = route.params
  const { navigate } = useNavigation()
<<<<<<< HEAD
  const { uid } = useUser()
  const routeNameAfterSuccess = type === 1 ? 'Entries' : 'Outflows'
  const { createFinancialMovement, getNextIndex } = useRealm()
=======
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG)
  }
>>>>>>> 000880b (fix(app): fixed app)

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm<MovProps>({
    defaultValues: { product: '', value: '', paymode: '', datetime: new Date() },
    resolver: yupResolver(MovSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values: MovProps) => {
<<<<<<< HEAD
    const amount = unformatCurrency(values.value)
    const index = getNextIndex()

    try {
      const payload: MovementPayloadProps = {
        ...values,
        value: amount,
        date: values.datetime,
        time: format(values.datetime, 'HH:mm'),
        type: routeNameAfterSuccess,
        index: index
      }
      !!uid && createFinancialMovement(uid, payload)

      navigate(routeNameAfterSuccess, { isRefetchRequest: true })
      interstitialShow()
      showToast('Movimentação cadastrada com sucesso!')
    } catch (err) {
      console.log(err)
      showToast('Ocorreu um erro ao cadastrar Movimentação!')
    }
  }

  return (
    <Column>
      <VerifyInternet />
      <ScrollView>
        <AdsBanner />
        <AdsInterstitial />
        <CardMov>
          <Row justifyContent='space-around' mb={20} height='80px'>
            <ImageMov source={type === 1 ? reciboEntradaImg : reciboSaidaImg} />
            <Row width='90%'>
              <TextInfo>Adicionar uma nova {type === 1 ? 'Entrada' : 'Saída'} ao Caixa</TextInfo>
            </Row>
          </Row>

          <Column>
            <Column width='100%' mt={10}>
              <TextInfo>Informação do produto</TextInfo>
              <Controller
                name='product'
                control={control}
                render={({ value, onChange }) => (
                  <InputFieldText value={value} onChangeText={onChange} placeholder='ex: 2x Camisetas Azuis' />
                )}
              />
            </Column>

            {errors.product && <TextError>Insira a informação neste campo!</TextError>}

=======
    const val = parseFloat(values.value.replace('R$ ', '').replace('.', '').replace(',', '.'))
    try {
      const payload: MovPayloadProps = {
        ...values,
        value: val,
        date: format(values.datetime, 'dd/MM/yyyy'),
        time: format(values.datetime, 'HH:mm')
      }
      await addMov(auth().currentUser?.uid, type, payload)

      navigate('Movimentacao')
      interstitialShow()
      showToast('Movimentação cadastrada com sucesso!')
    } catch (err) {
      console.log(err)
      showToast('Ocorreu um erro ao cadastrar Movimentação!')
    }
  }

  return (
    <Column>
      <VerifyInternet />
      <ScrollView>
        <AdsBanner />
        <AdsInterstitial />
        <CardMov>
          <Row justifyContent='space-around' mb={20} height='80px'>
            <ImageMov source={type === 1 ? reciboEntradaImg : reciboSaidaImg} />
            <Row width='90%'>
              <TextInfo>Adicionar uma nova {type === 1 ? 'Entrada' : 'Saída'} ao Caixa</TextInfo>
            </Row>
          </Row>

          <Column>
            <Column width='100%' mt={10}>
              <TextInfo>Informação do produto</TextInfo>
              <Controller
                name='product'
                control={control}
                render={({ value, onChange }) => (
                  <InputFieldText value={value} onChangeText={onChange} placeholder='ex: 2x Camisetas Azuis' />
                )}
              />
            </Column>

            {errors.product && <TextError>Insira a informação neste campo!</TextError>}

>>>>>>> 000880b (fix(app): fixed app)
            <Column mt={10}>
              <TextInfo>Valor</TextInfo>
              <Controller
                control={control}
                name='value'
                render={({ value, onChange }) => (
                  <InputFieldValue
                    type={'money'}
                    options={{
                      precision: 2,
                      separator: ',',
                      delimiter: '.',
                      unit: 'R$ ',
                      suffixUnit: ''
                    }}
                    value={value}
                    onChangeText={onChange}
<<<<<<< HEAD
                    placeholder='R$ 0,00'
=======
                    placeholder='R$ 00,00'
>>>>>>> 000880b (fix(app): fixed app)
                  />
                )}
              />
            </Column>

            {errors.value && <TextError>Insira o valor!</TextError>}

            <Column mt={15}>
              <TextInfo>Forma de pagamento</TextInfo>
              <Controller
                name='paymode'
                control={control}
                render={({ value, onChange }) => (
                  <InputFieldText
                    value={value}
                    onChangeText={onChange}
                    placeholder='ex: Cartão de Débito, Dinheiro, etc.'
                  />
                )}
              />
            </Column>

            <Column width='100%' mt={10}>
              <TextInfo>Data e Hora (Arraste para alterar)</TextInfo>

              <Controller
                name='datetime'
                control={control}
                render={({ value, onChange }) => (
                  <DatePicker
                    androidVariant='nativeAndroid'
                    textColor='#262626'
                    dividerHeight={10}
                    date={value}
                    onDateChange={onChange}
                  />
                )}
              />
              {errors.datetime && <TextError>Insira a informação de data!</TextError>}
            </Column>

            <ButtonSubmit onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
              <Row>{isSubmitting ? <ActivityIndicator color='#0fd734' /> : <TextButton>Gravar</TextButton>}</Row>
            </ButtonSubmit>
          </Column>
        </CardMov>
      </ScrollView>
    </Column>
  )
}

export default AddMovimentacao
