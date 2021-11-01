import React, { useCallback } from 'react'
import { Image, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import FAB from 'react-native-fab'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

import reciboEntradaImg from '../../assets/recibo.png'
import reciboSaidaImg from '../../assets/recibo_saida.png'
import { useUser } from '../../context/AuthContext'

import { BalanceCash } from '../BalanceCash'
import { numberToReal } from '../../utils/numberToReal'

import styles from './style'
import { MovComponentRouteProp } from '../../navigation/type'
import { useMutation, useQuery } from 'react-query'
import { deleteFinancialMovement, getMovements } from '../../services/movimentacao'
import { MovementProps } from '../../shared/movement'
import { Column } from '../Column'
import { Row } from '../Row'

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.LONG)
}

const MovementComponent: React.FC<MovementProps> = () => {
  const { uid } = useUser()
  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const route = useRoute<MovComponentRouteProp>()
  const isTypeRoute = route.name === 'Entries' ? 1 : 2

  const { mutateAsync: mutateDeleteFinancialMovement, isSuccess } = useMutation(deleteFinancialMovement)

  const { data: dataMovement, isLoading: isGettingMovement, isFetching } = useQuery(
    ['movementGetter', uid, route, isSuccess, isFocused],
    () => getMovements({ uid, type: isTypeRoute })
  )

  const alertDeleteHandler = (item: MovementProps) => {
    Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'EXCLUIR',
        onPress: () =>
          mutateDeleteFinancialMovement(
            { uid, idMovement: item.id },
            { onSuccess: () => showToast('MOvimentação removida com sucesso!') }
          )
      }
    ])
  }

  return (
    <Column flex={1} width={1} mt={60}>
      <Column width={1} height={60} justifyContent='center' px={16} backgroundColor='#4db476' zIndex={99}>
        <Row width={1}>
          <BalanceCash isRefetchRequest={isSuccess} />
        </Row>
      </Column>
      {isGettingMovement || isFetching ? (
        <Column padding={10} mt='40%' justifyContent='center' alignItems='center'>
          <Image style={styles.imageCaixaLoading} source={isTypeRoute === 1 ? reciboEntradaImg : reciboSaidaImg} />
          <ActivityIndicator size='large' color='#4db476' />
        </Column>
      ) : (
        <Column flex={1}>
          <ScrollView>
            {dataMovement &&
              dataMovement.data.map((item: MovementProps) => (
                <ListItem key={item.id} bottomDivider>
                  <Avatar
                    source={isTypeRoute === 1 ? reciboEntradaImg : reciboSaidaImg}
                    containerStyle={styles.imageRecibo}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{item.product}</ListItem.Title>
                    <ListItem.Subtitle>{`${item.payMode} - ${item.date}`}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Title>{numberToReal(item.value)}</ListItem.Title>
                  <TouchableOpacity onPress={() => alertDeleteHandler(item)}>
                    <Ionicons name='trash-bin' color='red' size={25} />
                  </TouchableOpacity>
                </ListItem>
              ))}
          </ScrollView>
        </Column>
      )}

      <FAB
        buttonColor={isTypeRoute === 1 ? '#4db476' : 'red'}
        iconTextColor='#FFFFFF'
        visible={true}
        iconTextComponent={isTypeRoute === 1 ? <Ionicons name='arrow-up' /> : <Ionicons name='arrow-down' />}
        onClickAction={() => navigate('AddMov', { type: isTypeRoute })}
      />
    </Column>
  )
}

export default MovementComponent
