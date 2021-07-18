import React from 'react'
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { numberToReal } from '../../utils/numberToReal'
import { useUser } from '../../context/AuthContext'
import { MovementYearProps } from '../../shared/movement'
import { getMovementByYear } from '../../services/movimentacao'

import caixaImg from '../../assets/caixa-reg.png'
import styles from './style'

const MovAno: React.FC = () => {
  const { navigate } = useNavigation()
  const { uid } = useUser()

  const { data: dataMovement, isLoading: isGettingMovementYear } = useQuery(['movementListGetter', uid], () =>
    getMovementByYear({ uid })
  )

  const renderItem = ({ item, index }: { item: MovementYearProps; index: number }) => (
    <TouchableOpacity onPress={() => navigate('MovementDetailYear', { dateMovement: item.year, type: 'year' })}>
      <ListItem key={`${index}-${item.year}`} bottomDivider>
        <Avatar source={caixaImg} containerStyle={styles.imageCaixa} />
        <ListItem.Content>
          <ListItem.Title>{item.year}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Title>{numberToReal(Number(item.balance))}</ListItem.Title>
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <View>
      {isGettingMovementYear ? (
        <View style={styles.loading}>
          <Image style={styles.imageCaixaLoading} source={caixaImg} />
          <ActivityIndicator size='large' color='#4db476' />
        </View>
      ) : (
        <FlatList
          data={dataMovement?.data}
          keyExtractor={(item, index) => `${index}-${item.year}`}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}

export default MovAno
