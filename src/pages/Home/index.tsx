import React, { useState, Fragment, useLayoutEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import { useNavigation } from '@react-navigation/native'

import DatabaseService from '../../services/DatabaseService'
import AdsBanner from '../../components/AdsBanner'
import VerifyInternet from '../../components/VerifyInternet'

import numberToReal from '../../utils/numberToReal'
import styles from './style'
import { cards } from '../../helpers/home'
import { useUser } from '../../context/AuthContext'

type MenuProps = {
  id: number
  name: string
  link: string
}

interface CaixaSaldoProps {
  saldo: string
}

const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const { uid } = useUser()
  const [caixaSaldo, setCaixaSaldo] = useState<{ saldo: number }>({ saldo: 0 })
  const [visibleShimmer, setVisibleShimmer] = useState(true)
  const date = new Date()

  // ATUALIZAÇÃO // CARREGA O DADOS DO SALDO DO USUARIO
  const loadSaldo = async () => {
    try {
      const response = await DatabaseService.get('/movimentacao_caixa/saldo/' + uid)
      const { saldo } = response.data
      setCaixaSaldo({ saldo })
      setVisibleShimmer(false)
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    loadSaldo()
  }, [caixaSaldo])

  // RENDER DA LISTAGEM DOS BOTÕES
  const renderItem = ({ item }: { item: MenuProps }) => (
    <View>
      <TouchableOpacity onPress={() => navigate(item.link)}>
        <ListItem containerStyle={styles.cardConfig}>
          <ListItem.Content>
            <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color='white' size={20} />
        </ListItem>
      </TouchableOpacity>
    </View>
  )
  // ------------------------------

  return (
    <Fragment>
      <VerifyInternet />
      <View style={styles.container}>
        <Card containerStyle={styles.cardInfoCaixa}>
          <Card.Title style={{ fontSize: 20, color: '#ffffff' }}>Meu Caixa</Card.Title>
          <Card.Divider style={{ backgroundColor: '#ffffff' }} />
          <View>
            <View style={styles.viewInfo}>
              {/*eslint-disable-next-line */}
                <Text style={styles.dateCardInfo}>{format(date, 'E, d \'de\' MMMM \'de\' yyyy', { locale: pt })}</Text>
            </View>
            <ShimmerPlaceHolder
              style={{ height: 25, marginTop: -20, borderRadius: 10 }}
              autoRun={true}
              visible={!visibleShimmer}
            >
              {!visibleShimmer && (
                <Text style={styles.textCardInfo}>
                  <Ionicons name='wallet-outline' size={25} /> Saldo: {numberToReal(String(caixaSaldo.saldo))}{' '}
                </Text>
              )}
            </ShimmerPlaceHolder>
          </View>
        </Card>

        <FlatList
          data={cards}
          numColumns={1}
          keyExtractor={(item: MenuProps, index: number) => `${index}-${item.id}`}
          renderItem={renderItem}
        />
        <Text style={styles.textAds}>- Propaganda -</Text>
        <AdsBanner margin={-20} />
      </View>
    </Fragment>
  )
}

export default Home
