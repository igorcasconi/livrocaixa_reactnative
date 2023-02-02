import React, { useState, useEffect } from 'react'
import { Image, View, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import FAB from 'react-native-fab'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'

import reciboEntradaImg from '../../assets/recibo.png'
import reciboSaidaImg from '../../assets/recibo_saida.png'

import DatabaseService, { config } from '../../services/DatabaseService'
import SaldoCaixa from '../SaldoCaixa'
import numberToReal from '../../utils/numberToReal'

import styles from './style'
import { MovComponentRouteProp } from '../../navigation/type'

interface MovProps {
  Movimentacao_Caixa_id: number
  Movimentacao_Caixa_product: string
  Movimentacao_Caixa_value: number
  data_formatada: string
  hora_formatada: string
  Movimentacao_Caixa_Paymode: string
}

const Entrada: React.FC<MovProps> = () => {
  const [entrada, setEntrada] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  // const [movType, setMovType] = useState<MovTypeProps | null>(null)
  const { navigate } = useNavigation()
  const route = useRoute<MovComponentRouteProp>()

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG)
  }

  // Deletar Movimentacao
  const deleteMov = (idMov: number, valueMov: number) => {
    DatabaseService.post('/movimentacao_caixa/movs-delete', { id: idMov }, config)
      .then(() => showToast('Movimentação removida com sucessos!'))
      .catch(err => console.log(err))

    DatabaseService.post(
      `/caixa_saldo/updatesaldo/${auth().currentUser?.uid}/${route.name === 'Entradas' ? 2 : 1}`,
      {
        valor: valueMov
      },
      config
    )
      .then(() => {
        setTimeout(() => {
          showToast('Saldo atualizado com sucesso!')
        }, 2000)
      })
      .catch(function (err) {
        console.log(err + 'aqui2')
      })
  }

  // Carregar lista
  const loadEntrada = async () => {
    try {
      const response = await DatabaseService.get(
        `/movimentacao_caixa/movs/${auth().currentUser?.uid}/${route.name === 'Entradas' ? 1 : 2}`
      )
      setEntrada(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadEntrada()
  }, [entrada])

  return (
    <View style={styles.list}>
      <SaldoCaixa />

      {loading ? (
        <View style={styles.loading}>
          <Image
            style={styles.imageCaixaLoading}
            source={route.name === 'Entradas' ? reciboEntradaImg : reciboSaidaImg}
          />
          <ActivityIndicator size='large' color='#4db476' />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {entrada.map((item: MovProps) => {
              return (
                <ListItem key={item.Movimentacao_Caixa_id} bottomDivider>
                  <Avatar
                    source={route.name === 'Entradas' ? reciboEntradaImg : reciboSaidaImg}
                    containerStyle={styles.imageRecibo}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{item.Movimentacao_Caixa_product}</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.Movimentacao_Caixa_Paymode + ' - ' + item.data_formatada + ' ' + item.hora_formatada}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Title>{numberToReal(item.Movimentacao_Caixa_value.toString())}</ListItem.Title>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
                        { text: 'Cancelar', onPress: () => null, style: 'cancel' },
                        {
                          text: 'EXCLUIR',
                          onPress: () => deleteMov(item.Movimentacao_Caixa_id, item.Movimentacao_Caixa_value)
                        }
                      ])
                    }
                  >
                    <Ionicons name='trash-bin' color='red' size={25} />
                  </TouchableOpacity>
                </ListItem>
              )
            })}
          </ScrollView>
        </View>
      )}

      <FAB
        buttonColor={route.name === 'Entradas' ? '#4db476' : 'red'}
        iconTextColor='#FFFFFF'
        visible={true}
        iconTextComponent={route.name === 'Entradas' ? <Ionicons name='arrow-up' /> : <Ionicons name='arrow-down' />}
        onClickAction={() => navigate('AddMov', { type: route.name === 'Entradas' ? 1 : 2 })}
      />
    </View>
  )
}

export default Entrada
