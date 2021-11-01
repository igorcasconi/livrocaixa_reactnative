import React from 'react'
import { View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { numberToReal } from '../../utils/numberToReal'
import { useUser } from '../../context/AuthContext'
import { ReportListProps } from '../../shared/movement'
import { financialReportList } from '../../services/movimentacao'

import caixaImg from '../../assets/caixa-reg.png'
import styles from './style'
import { format } from 'date-fns'
import { MovementReportProp } from '../../navigation/type'
import { pt } from 'date-fns/locale'

const screenYear = 'MovementByYear'
const routeNavigateDetailYear = 'MovementDetailYear'
const routeNavigateDetailMonth = 'MovementDetailMonth'
const year = 'year'
const month = 'month'

const MovAno: React.FC = () => {
  const { navigate } = useNavigation()
  const route = useRoute<MovementReportProp>()
  const { uid } = useUser()
  const type = route.name
  const isTypeYear = type === screenYear
  const typeRequest = isTypeYear ? year : month
  const routeNavigateDetail = isTypeYear ? routeNavigateDetailYear : routeNavigateDetailMonth

  const { data: dataMovement, isLoading: isGettingMovementYear } = useQuery(
    ['movementListGetter', uid, typeRequest],
    () => financialReportList({ uid, type: typeRequest })
  )

  const renderItem = ({ item, index }: { item: ReportListProps; index: number }) => {
    const date = isTypeYear ? format(new Date(item.date), 'yyyy') : new Date(item.date)
    const itemName = isTypeYear
      ? format(new Date(item.date), 'yyyy')
      : format(new Date(item.date), 'MMMM/yyyy', { locale: pt })
    return (
      <TouchableOpacity onPress={() => navigate(routeNavigateDetail, { dateMovement: date, type: typeRequest })}>
        <ListItem key={`${index}-${date}`} bottomDivider>
          <Avatar source={caixaImg} containerStyle={styles.imageCaixa} />
          <ListItem.Content>
            <ListItem.Title>{itemName}</ListItem.Title>
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
