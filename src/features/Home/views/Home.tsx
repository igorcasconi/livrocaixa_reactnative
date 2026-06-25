import React from 'react'
import { FlatList } from 'react-native'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

import { Row, Column, Text } from '../../../core/components'

import BalanceCash from './components/BalanceCash'
import { useHomeViewmodel } from '../viewmodels/useHomeViewmodel'
import { HomeListItem } from './components/HomeListItem'

import { cards } from './helpers/home'
import { MenuProps } from '../models/MenuModel'

const Home: React.FC = () => {
  const { date, balanceCash } = useHomeViewmodel()

  return (
    <Column width={1} height='100%' backgroundColor='background'>
      <Column width={1} height={80} mb={16} py={16} px={12} backgroundColor='background'>
        <Row width={1} mb={10} justifyContent='center'>
          <Text fontSize={16} fontWeight='bold' textAlign='center' color='text'>
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
    </Column>
  )
}

export default Home
