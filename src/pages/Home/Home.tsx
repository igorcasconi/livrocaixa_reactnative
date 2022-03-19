import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AdsBanner from '../../components/AdsBanner'
import { BalanceCash, Row, Column, Text, Button, AlertFullScreen } from '../../components'

import { cards } from '../../helpers/home'
import { getValueStorage, setStorage } from '../../utils/storage'
import { messageAlertHome } from '../../utils/messageData'
import { useRealm } from '../../context/RealmContext'
import { useUser } from '../../context/AuthContext'

interface MenuProps {
  id: number
  name: string
  link: string
  icon: string
  color: string
}

const Home: React.FC = () => {
  const { navigate } = useNavigation()
  const date = new Date()
  const [hasConfirmedTerm, setConfirmedTerm] = useState<boolean>(true)
  const {
    realm,
    createUserFirebase,
    getAllFinancialMovementsOnline,
    isWritingOnlineData,
    userFirebaseRegistered
  } = useRealm()
  const { uid } = useUser()

  const verifyStatusConfirmationTerm = async () => {
    const hasConfirmAlert = await getValueStorage('@terms')

    if (!Boolean(hasConfirmAlert)) return setConfirmedTerm(false)
  }

  const downloadOnlineData = async (uid?: string | null) => {
    const downloadedData = await getValueStorage('@downloadedOnlineData')
    const isUserRegistered = userFirebaseRegistered(uid)

    if (Boolean(downloadedData) || !isUserRegistered) return

    return getAllFinancialMovementsOnline(uid)
  }

  const setUserFirebaseId = (uid?: string | null) => {
    if (!!realm?.objects('UserData').length) return

    !!uid && createUserFirebase(uid)
  }

  useEffect(() => {
    verifyStatusConfirmationTerm()
    setUserFirebaseId(uid)
  }, [hasConfirmedTerm, uid])

  const renderItem = ({ item }: { item: MenuProps }) => (
    <Button onPress={() => navigate(item.link)}>
      <Row
        width={1}
        backgroundColor={item.color}
        height={60}
        ml={-16}
        borderRadius={16}
        pr='10px'
        pl={30}
        justifyContent='space-between'
        alignItems='center'
        mb='10px'
      >
        <Row>
          <Ionicons name={item.icon} size={22} color='white' />
          <Text fontSize={16} fontWeight='bold' color='white' ml='6px'>
            {item.name}
          </Text>
        </Row>
        <Ionicons name='chevron-forward-outline' size={20} color='white' />
      </Row>
    </Button>
  )

  if (!hasConfirmedTerm) {
    return (
      <AlertFullScreen
        title='Atenção'
        messages={messageAlertHome}
        buttonText='Continuar'
        messageCheckbox='Clique aqui para confirmar que está de acordo com o aviso acima e continuar para o uso do Livro Caixa.'
        isVisibleCheckbox={true}
        buttonHandler={() => {
          setStorage('@terms', 'true')
          setConfirmedTerm(true)
          downloadOnlineData(uid)
        }}
      />
    )
  }

  if (isWritingOnlineData) {
    return (
      <Column width={1} height='100%' justifyContent='center' px={10}>
        <Text fontSize={16} textAlign='center' color='black' mb={10}>
          Baixando as suas movimentações do banco de dados...
        </Text>
        <ActivityIndicator />
      </Column>
    )
  }

  return (
    <Column width={1} height='100%' backgroundColor='#4db476' zIndex={99}>
      <Column width={1} height={80} mb={10} py={-10} px={12} backgroundColor='#4db476'>
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
      <Text fontSize={12} mt={2} textAlign='center'>
        - As propagandas ajudam o aplicativo a continuar existindo -
      </Text>
      <AdsBanner margin={-1} />
    </Column>
  )
}

export default Home
