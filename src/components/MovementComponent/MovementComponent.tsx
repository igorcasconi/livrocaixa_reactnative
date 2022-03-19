import React, { useMemo, useState } from 'react'
import { Alert, ToastAndroid, FlatList, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'

import reciboEntradaImg from '../../assets/recibo.png'
import reciboSaidaImg from '../../assets/recibo_saida.png'
import { useUser } from '../../context/AuthContext'

import { BalanceCash } from '../BalanceCash'
import { formatCurrency } from '../../utils/formatters'

import styles from './style'
import { MovComponentRouteProp } from '../../navigation/type'
import { MovementProps } from '../../shared/movement'
import { Column } from '../Column'
import { Button } from '../Button'
import { Row } from '../Row'
import { useRealm } from '../../context/RealmContext'
import { format } from 'date-fns'
import { Text } from '../Text'

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.LONG)
}

const MovementComponent: React.FC<MovementProps> = () => {
  const { uid } = useUser()
  const isFocused = useIsFocused()
  const [isDeletedMovement, setDeletedMovement] = useState<boolean>(false)
  const { navigate } = useNavigation()
  const route = useRoute<MovComponentRouteProp>()
  const isTypeRoute = route.name === 'Entries' ? 1 : 2
  const { financialMovementList, deleteFinancialMovement } = useRealm()

  const dataFinancialMovement = useMemo(() => {
    setDeletedMovement(false)
    return financialMovementList(route.name, uid)
  }, [isFocused, isDeletedMovement, uid])

  const nameRouteNormalized = useMemo(() => (route.name === 'Entries' ? 'Entrada' : 'Saída'), [route.name])

  const alertDeleteHandler = (index: number) => {
    Alert.alert('Movimentações do Caixa', 'Deseja realmente excluir a movimentação?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'EXCLUIR',
        onPress: async () => {
          await deleteFinancialMovement(index)
          setDeletedMovement(true)
        }
      }
    ])
  }

  const MovementItem = React.memo((props: MovementProps) => {
    const imageItem = isTypeRoute === 1 ? reciboEntradaImg : reciboSaidaImg
    const formattedDate = format(new Date(props.date), 'dd/MM/yyyy')
    const payModeWithDate = !!props.paymode ? `${props.paymode} - ${formattedDate}` : formattedDate
    const formattedValue = formatCurrency(props?.value)
    return (
      <Row width={1} height={80} p={18} border='0.5px solid #c1c1c1' justifyContent='space-between' alignItems='center'>
        <Column width={200}>
          <Row width={1}>
            <Image source={imageItem} style={styles.imageRecibo} />
            <Column width={1} height='100%' justifyContent='center'>
              <Text fontSize={16} color='#21262c' fontWeight='bold'>
                {props.product}
              </Text>
              <Text fontSize={14} color='#21262c'>
                {payModeWithDate}
              </Text>
            </Column>
          </Row>
        </Column>
        <Row alignItems='center' justifyContent='flex-start'>
          <Text fontSize={14} color='#21262c' mr='16px'>
            {formattedValue}
          </Text>
          <Button backgroundColor='transparent' onPress={() => alertDeleteHandler(props?.index)}>
            <Ionicons name='trash-bin' color='red' size={25} />
          </Button>
        </Row>
      </Row>
    )
  })

  return (
    <Column flex={1} width={1} mt={60}>
      <Column width={1} height={60} justifyContent='center' px={16} backgroundColor='#4db476' zIndex={99}>
        <Row width={1} justifyContent='space-between' alignItems='center'>
          <BalanceCash needUpdateBalance={isDeletedMovement} />
          <Button
            width={110}
            height={40}
            backgroundColor='#3585e7'
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
            onPress={() => navigate('AddMov', { type: isTypeRoute })}
          >
            <Text fontSize={12} color='white' textAlign='center'>
              Adicionar {nameRouteNormalized}
            </Text>
          </Button>
        </Row>
      </Column>
      <Column flex={1}>
        <FlatList
          data={dataFinancialMovement}
          keyExtractor={(item, index) => `${item.index}-${index}`}
          renderItem={({ item }) => <MovementItem {...item} />}
          updateCellsBatchingPeriod={50}
          maxToRenderPerBatch={50}
          initialNumToRender={20}
        />
      </Column>
    </Column>
  )
}

export default MovementComponent
