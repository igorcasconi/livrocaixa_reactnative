import React from 'react'
import { FlatList } from 'react-native'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import AdsBanner from '../../../core/components/AdsBanner'
import { Row, Column, Text } from '../../../core/components'

import BalanceCash from './components/BalanceCash'
import { useHomeViewmodel } from '../viewmodels/useHomeViewmodel'
import { HomeListItem } from './components/HomeListItem'

import { cards } from '../../../core/helpers/home'
import { MenuProps } from '../models/MenuModel'

const Home: React.FC = () => {
  const { date, balanceCash } = useHomeViewmodel()

  return (
    <Column width={1} height='100%' backgroundColor='#4db476' zIndex={99}>
      <Column width={1} height={80} mb={10} py={-10} px={12} backgroundColor='#4db476'>
        <Row width={1} mb={10} justifyContent='center'>
          <Text fontSize={16} fontWeight='bold' textAlign='center' color='black'>
            {/* eslint-disable-next-line */}
            {format(date, "E, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </Text>
        </Row>
        <Row width={1}>
          <BalanceCash balanceCash={balanceCash} />
        </Row>
      </Column>

      <FlatList
        data={cards}
        numColumns={1}
        keyExtractor={(item: MenuProps) => item.id.toString()}
        renderItem={({ item }) => <HomeListItem item={item} />}
      />
      <AdsBanner margin={-1} />
    </Column>
  )
}

export default Home
