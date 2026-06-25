import React, { useEffect } from 'react'
import { ScrollView, ActivityIndicator } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation, useRoute } from '@react-navigation/native'
import DatePicker from 'react-native-date-picker'
import { Controller, useForm } from 'react-hook-form'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import VerifyInternet from '../../../core/components/VerifyInternet'
import Row from '../../../core/components/Row/Row'
import Column from '../../../core/components/Column/Column'

import reciboEntradaImg from '../../../assets/recibo.png'
import reciboSaidaImg from '../../../assets/recibo_saida.png'

import { AddTransactionPayloadFormProps } from '../models/TransactionModel'
import { AddTransactionRouteProp, ParamsList } from '../../../core/navigation/type'
import {
  ButtonSubmit,
  TransactionFormCard,
  TransactionImage,
  InputFieldText,
  InputFieldValue,
  TextButton,
  TextError,
  TextInfo
} from './styles/addTransactionStyles'
import useAddTransactionViewmodel from '../viewmodels/useAddTransactionViewmodel'
import { transactionFormSchema } from '../models/formSchemas/transactionSchema'

const AddTransaction: React.FC = () => {
  const route = useRoute<AddTransactionRouteProp>()
  const { type } = route.params
  const { goBack } = useNavigation<NativeStackNavigationProp<ParamsList>>()
  const { onSubmit, isAllowToNavigateBack } = useAddTransactionViewmodel(type)
  const isEntries = type === 1
  const typeValue = isEntries ? 'Entries' : 'Outflows'

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<AddTransactionPayloadFormProps>({
    defaultValues: { product: '', value: '', paymode: '', datetime: new Date(), type: typeValue },
    resolver: yupResolver(transactionFormSchema) as any,
    mode: 'onBlur',
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    if (isAllowToNavigateBack) {
      goBack()
    }
  }, [isAllowToNavigateBack])

  return (
    <Column>
      <VerifyInternet />
      <ScrollView>
        <TransactionFormCard>
          <Row justifyContent='space-between' mb={20}>
            <TransactionImage source={isEntries ? reciboEntradaImg : reciboSaidaImg} />
            <Row width='70%'>
              <TextInfo>Adicionar uma nova {isEntries ? 'Entrada' : 'Saída'} ao Caixa</TextInfo>
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
                    value={value || ''}
                    onChangeText={onChange}
                    placeholder='ex: Cartão de Débito, Dinheiro, etc.'
                  />
                )}
              />
            </Column>

            <Column width='100%' mt={20}>
              <TextInfo>Data e Hora (Arraste para alterar)</TextInfo>

              <Column width='100%' justifyContent='center' alignItems='center'>
                <Controller
                  name='datetime'
                  control={control}
                  render={({ field: { value, onChange } }) => <DatePicker date={value} onDateChange={onChange} />}
                />
              </Column>
              {errors.datetime && <TextError>Insira a informação de data!</TextError>}
            </Column>

            <ButtonSubmit onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
              <Row>
                <TextButton>Gravar</TextButton>
              </Row>
            </ButtonSubmit>
          </Column>
        </TransactionFormCard>
      </ScrollView>
    </Column>
  )
}

export default AddTransaction
