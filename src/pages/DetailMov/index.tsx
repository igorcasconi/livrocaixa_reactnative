import React, { useState, useEffect, useMemo } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useRoute } from '@react-navigation/native'

import DatabaseService from '../../services/DatabaseService'
import { numberToReal } from '../../utils/numberToReal'
import AdsBanner from '../../components/AdsBanner'

import caixaImg from '../../assets/caixa-reg.png'

import styles from './style'
import { DetailMovRouteProp } from '../../navigation/type'
import { DetailMovProps } from './type'

const DetailMov: React.FC = () => {
  const [detailmov, setDetailmov] = useState<DetailMovProps | null>(null)
  const route = useRoute<DetailMovRouteProp>()
  const { data } = route.params

  const titleMov = useMemo(() => {
    if (route.name === 'DetailMovAno') return `Ano ${data}`

    if (route.name === 'DetailMovMes') return `Mês ${format(data, `MMMM${'/'}yyyy`, { locale: pt })}`
  }, [data, route.name])

  const linkMov = useMemo(() => {
    if (route.name === 'DetailMovAno') return `/movs-detail-year/${auth().currentUser?.uid}/${data}`

    if (route.name === 'DetailMovMes')
      return `/movs-detail-month/${auth().currentUser?.uid}/${format(data, 'MMMM')}/${format(data, 'yyyy')}`
  }, [data, route.name])

  const loadInfoMov = async () => {
    try {
      const response = await DatabaseService.get(`/movimentacao_caixa/${linkMov}`)
      const { soma, gastos, entrada, saida } = response.data
      setDetailmov({
        soma,
        gastos,
        entrada,
        saida
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadInfoMov()
  }, [])

  return (
    <ScrollView>
      <View>
        <AdsBanner />
        <Card containerStyle={styles.cardConfig}>
          <Card.Title>{titleMov}</Card.Title>
          <Card.Divider />
          <View style={styles.viewImageCard}>
            <Image style={styles.imageCard} source={caixaImg} />
          </View>

          <Text style={styles.textSaldo}>
            <Ionicons name='wallet-outline' size={20} /> Saldo: {numberToReal(Number(detailmov?.soma))}
          </Text>
          <Text style={styles.textSaldo}>
            <Ionicons name='wallet-outline' size={20} /> Gastos: {numberToReal(Number(detailmov?.gastos))}
          </Text>
          <Text style={styles.textTitle}>Quantidades de Movimentações</Text>
          <Text style={styles.textMov}>
            <Ionicons name='arrow-up-circle-outline' size={15} color='green' /> Entradas: {detailmov?.entrada}
          </Text>
          <Text style={styles.textMov}>
            <Ionicons name='arrow-down-circle-outline' size={15} color='red' /> Saídas: {detailmov?.saida}
          </Text>
        </Card>
      </View>
    </ScrollView>
  )
}

export default DetailMov
