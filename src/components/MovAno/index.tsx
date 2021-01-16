import React, { useEffect, useState } from 'react'
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

import DatabaseService from '../../services/DatabaseService'
import { numberToReal } from '../../utils/numberToReal'

import caixaImg from '../../assets/caixa-reg.png'
import styles from './style'
import { MovListAnoProps } from '../../shared/movList'

const MovAno: React.FC = () => {
  const [movDetail, setMovDetail] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const { navigate } = useNavigation()

  const loadMovDetail = async () => {
    try {
      const response = await DatabaseService.get('/movimentacao_caixa/movs-year/' + auth().currentUser?.uid)
      setMovDetail(response.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadMovDetail()
  }, [movDetail])

  const renderItem = ({ item, index }: { item: MovListAnoProps; index: number }) => (
    <TouchableOpacity onPress={() => navigate('DetailMovAno', { data: item.ano })}>
      <ListItem key={index} bottomDivider>
        <Avatar source={caixaImg} containerStyle={styles.imageCaixa} />
        <ListItem.Content>
          <ListItem.Title>{item.ano}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Title>{numberToReal(Number(item.soma))}</ListItem.Title>
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <View>
      {loading ? (
        <View style={styles.loading}>
          <Image style={styles.imageCaixaLoading} source={caixaImg} />
          <ActivityIndicator size='large' color='#4db476' />
        </View>
      ) : (
        <FlatList data={movDetail} keyExtractor={item => item.ano} renderItem={renderItem} />
      )}
    </View>
  )
}

export default MovAno
