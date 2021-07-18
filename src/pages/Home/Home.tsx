import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AdsBanner from '../../components/AdsBanner'
import VerifyInternet from '../../components/VerifyInternet'
import { BalanceCash, Row, Column, Text } from '../../components'

import styles from './style'
import { cards } from '../../helpers/home'

type MenuProps = {
  id: number
  name: string
  link: string
}

const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const date = new Date()

  const renderItem = ({ item }: { item: MenuProps }) => (
    <TouchableOpacity onPress={() => navigate(item.link)}>
      <Row
        width={1}
        backgroundColor='#2970d1'
        height={50}
        px='10px'
        justifyContent='space-between'
        alignItems='center'
        borderBottomWidth='1px'
        borderBottomColor='#170e62'
      >
        <Text fontSize={16} fontWeight='bold' color='white'>
          {item.name}
        </Text>
        <Ionicons name='chevron-forward-outline' size={14} color='white' />
      </Row>
    </TouchableOpacity>
  )

  return (
    <Column width={1}>
      <VerifyInternet />
      <Column width={1} height={80} mb={10} py={-10} px={12} backgroundColor='#4db476' zIndex={99}>
        <Row width={1} mb={10} justifyContent='center'>
          <Text fontSize={16} fontWeight='bold' textAlign='center' color='black'>
            {/* eslint-disable-next-line */}
          {format(date, "E, d 'de' MMMM 'de' yyyy", { locale: pt })}
          </Text>
        </Row>
        <Row width={1}>
          <BalanceCash variant={2} />
        </Row>
      </Column>

      <FlatList
        data={cards}
        numColumns={1}
        keyExtractor={(item: MenuProps, index: number) => `${index}-${item.id}`}
        renderItem={renderItem}
      />
      <Text style={styles.textAds}>- Propaganda -</Text>
      <AdsBanner margin={-10} />
    </Column>
  )
}

export default Home
