import React from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import { Controller, useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import AdsBanner from '../../../core/components/AdsBanner'
import AdsInterstitial from '../../../core/components/AdsInterstitial'
import VerifyInternet from '../../../core/components/VerifyInternet'
import Row from '../../../core/components/Row/Row'
import Column from '../../../core/components/Column/Column'

// import reciboEntradaImg from '../../assets/recibo.png'
// import reciboSaidaImg from '../../assets/recibo_saida.png'

import { MovSchema } from '../../../schemas'
import { showToast } from '../../../core/utils/notification'
import { MovementPayloadProps } from '../../../core/shared/movement'
import { useRealm } from '../../../context/RealmContext'
import { useUser } from '../../../context/AuthContext'
import { unformatCurrency } from '../../../core/utils/formatters'
import { AddTransactionProps } from '../models/TransactionModel'
import { AddTransactionRouteProp, ParamsList } from '../../../core/navigation/type'
import {
  ButtonSubmit,
  CardMov,
  ImageMov,
  InputFieldText,
  InputFieldValue,
  TextButton,
  TextError,
  TextInfo
} from './styles/addTransactionStyles'

const AddTransaction: React.FC = () => {
  const route = useRoute<AddTransactionRouteProp>()
  const { type } = route.params
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamsList>>()
  const { uid } = useUser()
  const routeNameAfterSuccess = type === 1 ? 'Entries' : 'Outflows'
  const { createFinancialMovement, getNextIndex } = useRealm()

  const {
    control,
    handleSubmit,

    formState: { isSubmitting, errors }
  } = useForm<AddTransactionProps>({
    defaultValues: { product: '', value: '', paymode: '', datetime: new Date() },
    // resolver: yupResolver(MovSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values: AddTransactionProps) => {
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
          <Row justifyContent='space-around' mb={20} height={80}>
            {/* <ImageMov
              source={type === 1 ? require('../../assets/recibo.png') : require('../../assets/recibo_saida.png')}
            /> */}
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
                render={({ field: { value, onChange } }) => (
                  <InputFieldText value={value} onChangeText={onChange} placeholder='ex: 2x Camisetas Azuis' />
                )}
              />
            </Column>

            {errors.product && <TextError>Insira a informação neste campo!</TextError>}

            <Column mt={10}>
              <TextInfo>Valor</TextInfo>
              <Controller
                control={control}
                name='value'
                render={({ field: { value, onChange } }) => (
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
                    placeholder='R$ 0,00'
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
                render={({ field: { value, onChange } }) => (
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
                render={({ field: { value, onChange } }) => <DatePicker date={value} onDateChange={onChange} />}
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

export default AddTransaction
