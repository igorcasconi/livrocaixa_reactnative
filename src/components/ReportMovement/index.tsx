import React from 'react'
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { numberToReal } from '../../utils/numberToReal'
import { useUser } from '../../context/AuthContext'
import { ReportListProps } from '../../shared/movement'
import { financialReportList } from '../../services/movimentacao'

import caixaImg from '../../assets/caixa-reg.png'
import styles from './style'
import { format } from 'date-fns'

const MovAno: React.FC = () => {
  const { navigate } = useNavigation()
  const { uid } = useUser()

  const { data: dataMovement, isLoading: isGettingMovementYear } = useQuery(['movementListGetter', uid], () =>
    financialReportList({ uid, type: 'year' })
  )

  const renderItem = ({ item, index }: { item: ReportListProps; index: number }) => {
    const year = format(new Date(item.date), 'yyyy')
    return (
      <TouchableOpacity onPress={() => navigate('MovementDetailYear', { dateMovement: year, type: 'year' })}>
        <ListItem key={`${index}-${year}`} bottomDivider>
          <Avatar source={caixaImg} containerStyle={styles.imageCaixa} />
          <ListItem.Content>
            <ListItem.Title>{year}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Title>{numberToReal(Number(item.balance))}</ListItem.Title>
        </ListItem>
      </TouchableOpacity>
    )
  }

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
          keyExtractor={(item, index) => `${index}-${item.date}`}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}

export default MovAno
