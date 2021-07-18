import React, { useState, useEffect } from 'react'
import { Image, View, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import FAB from 'react-native-fab'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useRoute } from '@react-navigation/native'

import reciboEntradaImg from '../../assets/recibo.png'
import reciboSaidaImg from '../../assets/recibo_saida.png'
import { useUser } from '../../context/AuthContext'

import DatabaseService from '../../services/DatabaseService'
import { BalanceCash } from '../BalanceCash'
import { numberToReal } from '../../utils/numberToReal'

import styles from './style'
import { MovComponentRouteProp } from '../../navigation/type'
import { useQuery } from 'react-query'
import { getMovements } from '../../services/movimentacao'
import { MovementProps } from '../../shared/movement'
import { format } from 'date-fns'
import { Column } from '../Column'

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.LONG)
}

const MovementComponent: React.FC<MovementProps> = () => {
  const { uid } = useUser()
  // const [movType, setMovType] = useState<MovTypeProps | null>(null)
  const { navigate } = useNavigation()
  const route = useRoute<MovComponentRouteProp>()

  const { data: dataMovement, isLoading: isGettingMovement } = useQuery(['movementGetter', uid, route.name], () =>
    getMovements({ uid, type: route.name === 'Entradas' ? 1 : 2 })
  )

  const deleteMov = (idMov: number, valueMov: number) => {
    DatabaseService.post('/movimentacao_caixa/movs-delete', { id: idMov })
      .then(() => showToast('Movimentação removida com sucessos!'))
      .catch(err => console.log(err))

    DatabaseService.post(`/caixa_saldo/updatesaldo/${uid}/${route.name === 'Entradas' ? 2 : 1}`, {
      valor: valueMov
    })
      .then(() => {
        setTimeout(() => {
          showToast('Saldo atualizado com sucesso!')
        }, 2000)
      })
      .catch(function (err) {
        console.log(err + 'aqui2')
      })
  }

  return (
    <Column flex={1}>
      <BalanceCash variant={1} />
      {isGettingMovement ? (
        <View style={styles.loading}>
          <Image
            style={styles.imageCaixaLoading}
            source={route.name === 'Entradas' ? reciboEntradaImg : reciboSaidaImg}
          />
          <ActivityIndicator size='large' color='#4db476' />
        </View>
      ) : (
        <Column flex={1}>
          <ScrollView>
            {dataMovement &&
              dataMovement.data.map((item: MovementProps) => (
                <ListItem key={item.id} bottomDivider>
                  <Avatar
                    source={route.name === 'Entradas' ? reciboEntradaImg : reciboSaidaImg}
                    containerStyle={styles.imageRecibo}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{item.product}</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.payMode +
                        ' - ' +
                        format(new Date(item.date), 'dd/MM/yyyy') +
                        ' ' +
                        format(new Date(item.date), 'HH:mm')}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Title>{numberToReal(item.value)}</ListItem.Title>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
                        { text: 'Cancelar', onPress: () => null, style: 'cancel' },
                        {
                          text: 'EXCLUIR',
                          onPress: () => deleteMov(item.id, item.value)
                        }
                      ])
                    }
                  >
                    <Ionicons name='trash-bin' color='red' size={25} />
                  </TouchableOpacity>
                </ListItem>
              ))}
          </ScrollView>
        </Column>
      )}

      <FAB
        buttonColor={route.name === 'Entradas' ? '#4db476' : 'red'}
        iconTextColor='#FFFFFF'
        visible={true}
        iconTextComponent={route.name === 'Entradas' ? <Ionicons name='arrow-up' /> : <Ionicons name='arrow-down' />}
        onClickAction={() => navigate('AddMov', { type: route.name === 'Entradas' ? 1 : 2 })}
      />
    </Column>
  )
}

export default MovementComponent
