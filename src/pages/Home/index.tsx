import React, { Fragment, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { Card, ListItem } from 'react-native-elements'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useNavigation } from '@react-navigation/native'

import AdsBanner from '../../components/AdsBanner'
import VerifyInternet from '../../components/VerifyInternet'
import SaldoCaixa from '../../components/SaldoCaixa'

import styles from './style'
import { cards } from '../../helpers/home'
import { useUser } from '../../context/AuthContext'
import { getSaldo } from '../../services/saldo'
import { useRequest } from 'ahooks'

type MenuProps = {
  id: number
  name: string
  link: string
}

interface SaldoProps {
  data: { saldo: number }
}

const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const date = new Date()

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

            <SaldoCaixa variant={2} />
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
