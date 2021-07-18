import React, { Fragment, useMemo, useState } from 'react'
import { View, Image, ScrollView, ActivityIndicator } from 'react-native'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { numberToReal } from '../../utils/numberToReal'
import AdsBanner from '../../components/AdsBanner'
import { useUser } from '../../context/AuthContext'
import { Row, Text } from '../../components'

import caixaImg from '../../assets/caixa-reg.png'

import styles from './style'
import { DetailMovRouteProp } from '../../navigation/type'
import { DetailMovProps } from './type'
import { getDetailMovByYear } from '../../services/movimentacao'

const MovementDetail: React.FC = () => {
  const route = useRoute<DetailMovRouteProp>()
  const { dateMovement, type } = route.params
  const { uid } = useUser()
  const [dataMovementDetail, setDataMovementDetail] = useState<DetailMovProps | undefined>(undefined)

  const { isLoading: isGettingMovementYear } = useQuery(
    ['movementGetter', uid, type, dateMovement],
    () => getDetailMovByYear({ uid, year: String(dateMovement) }),
    {
      enabled: type === 'year',
      onSuccess: data => !!data && setDataMovementDetail(data)
    }
  )

  const titleMov = useMemo(() => {
    if (type === 'year') return `Ano ${String(dateMovement)}`

    return `Mês ${format(new Date(dateMovement), `MMMM${'/'}yyyy`, { locale: pt })}`
  }, [dateMovement, type])

  return (
    <ScrollView>
      <View>
        <AdsBanner />
        <Card containerStyle={styles.cardConfig}>
          <Card.Title>{titleMov}</Card.Title>
          <Card.Divider />
          {isGettingMovementYear ? (
            <Row width={1} height='100%' flex={1}>
              <ActivityIndicator size='large' color='#4db476' />
            </Row>
          ) : (
            <Fragment>
              <Row width={1} justifyContent='center' alignItems='center' mb={20}>
                <Image style={styles.imageCard} source={caixaImg} />
              </Row>

              <Text fontSize={20} fontWeight='bold' mb={10}>
                <Ionicons name='wallet-outline' size={20} /> Saldo:{' '}
                {numberToReal(Number(dataMovementDetail?.data.cashTotal))}
              </Text>
              <Text fontSize={20} fontWeight='bold' mb={10}>
                <Ionicons name='wallet-outline' size={20} /> Gastos:{' '}
                {numberToReal(Number(dataMovementDetail?.data.expenses))}
              </Text>
              <Text fontSize={20} mb={2}>
                Quantidades de Movimentações
              </Text>
              <Text fontSize={15}>
                <Ionicons name='arrow-up-circle-outline' size={15} color='green' /> Entradas:{' '}
                {dataMovementDetail?.data.entries}
              </Text>
              <Text fontSize={15}>
                <Ionicons name='arrow-down-circle-outline' size={15} color='red' /> Saídas:{' '}
                {dataMovementDetail?.data.outflows}
              </Text>
            </Fragment>
          )}
        </Card>
      </View>
    </ScrollView>
  )
}

export default MovementDetail
