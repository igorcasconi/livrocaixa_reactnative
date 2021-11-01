import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AdsBanner from '../../components/AdsBanner'
import { BalanceCash, Row, Column, Text, Button, AlertFullScreen } from '../../components'

import { cards } from '../../helpers/home'
import { getValueStorage, setStorage } from '../../utils/storage'
import { messageAlertHome } from '../../utils/messageData'

type MenuProps = {
  id: number
  name: string
  link: string
  icon: string
}

const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const date = new Date()
  const [hasConfirmedTerm, setConfirmedTerm] = useState<boolean>(true)

  const verifyStatusConfirmationTerm = async () => {
    const hasConfirmAlert = await getValueStorage('@terms')

    if (!Boolean(hasConfirmAlert)) return setConfirmedTerm(false)
  }

  useEffect(() => {
    verifyStatusConfirmationTerm()
  }, [hasConfirmedTerm])

  const renderItem = ({ item }: { item: MenuProps }) => (
    <Button onPress={() => navigate(item.link)}>
      <Row
        width={1}
        backgroundColor='#21262c'
        height={50}
        px='10px'
        justifyContent='space-between'
        alignItems='center'
        borderBottomWidth='1px'
        borderBottomColor='#000000'
        mb='0.5px'
      >
        <Row>
          <Ionicons name={item.icon} size={22} color='white' />
          <Text fontSize={16} fontWeight='bold' color='white' ml='6px'>
            {item.name}
          </Text>
        </Row>
        <Ionicons name='chevron-forward-outline' size={14} color='white' />
      </Row>
    </Button>
  )

  if (!hasConfirmedTerm) {
    return (
      <AlertFullScreen
        title='Atenção'
        message1={messageAlertHome.message1}
        message2={messageAlertHome.message2}
        buttonText='Continuar'
        messageCheckbox='Clique aqui para confirmar que está de acordo com o aviso acima e continuar para o uso do Livro Caixa.'
        isVisibleCheckbox={true}
        buttonHandler={() => {
          setStorage('@terms', 'true')
          setConfirmedTerm(true)
        }}
      />
    )
  }

  return (
    <Column width={1}>
      <Column width={1} height={80} mb={10} py={-10} px={12} backgroundColor='#4db476' zIndex={99}>
        <Row width={1} mb={10} justifyContent='center'>
          <Text fontSize={16} fontWeight='bold' textAlign='center' color='black'>
            {/* eslint-disable-next-line */}
          {format(date, "E, d 'de' MMMM 'de' yyyy", { locale: pt })}
          </Text>
        </Row>
        <Row width={1}>
          <BalanceCash />
        </Row>
      </Column>

      <FlatList
        data={cards}
        numColumns={1}
        keyExtractor={(item: MenuProps, index: number) => `${index}-${item.id}`}
        renderItem={renderItem}
      />
      <Text fontSize={12} mb={10} mt={16} textAlign='center'>
        - As propagandas ajudam o aplicativo a continuar existindo -
      </Text>
      <AdsBanner margin={-10} />
    </Column>
  )
}

export default Home
