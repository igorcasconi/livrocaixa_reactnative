import React, { useMemo } from 'react'
import { Image } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

import { formatCurrency } from '../../utils/formatters'
import { useUser } from '../../context/AuthContext'
import { ReportListProps } from '../../shared/movement'

import caixaImg from '../../assets/caixa-reg.png'
import styles from './style'
import { format } from 'date-fns'
import { MovementReportProp } from '../../navigation/type'
import { pt } from 'date-fns/locale'
import { useRealm } from '../../context/RealmContext'
import { Button, Column, Row, Text } from '../../components'

const screenYear = 'MovementByYear'
const routeNavigateDetailYear = 'MovementDetailYear'
const routeNavigateDetailMonth = 'MovementDetailMonth'
const year = 'year'
const month = 'month'

const MovementReport: React.FC = () => {
  const { navigate } = useNavigation()
  const route = useRoute<MovementReportProp>()
  const { uid } = useUser()
  const type = route.name
  const isTypeYear = type === screenYear
  const typeRequest = isTypeYear ? year : month
  const routeNavigateDetail = isTypeYear ? routeNavigateDetailYear : routeNavigateDetailMonth
  const { getReportList } = useRealm()
  const dataReportMovement = useMemo(() => getReportList(uid, !isTypeYear), [getReportList, uid, isTypeYear])

  const renderItem = ({ item, index }: { item: ReportListProps; index: number }) => {
    // const date = isTypeYear ? format(new Date(item.date), 'yyyy') : new Date(item.date)
    const balance = item.balanceEntries - item.balanceOutflows
    const itemName = isTypeYear
      ? format(new Date(item.date), 'yyyy')
      : format(new Date(item.date), 'MMMM/yyyy', { locale: pt })
    return (
      <Button key={index} onPress={() => navigate(routeNavigateDetail, { dateMovement: item.date, type: typeRequest })}>
        <Row width={1} height={80} p={18} border='0.5px solid #c1c1c1' justifyContent='flex-start' alignItems='center'>
          <Image source={caixaImg} style={styles.imageCaixa} />
          <Column width={200} px={16} alignItems='flex-start'>
            <Text fontSize={16} color='#21262c' fontWeight='bold'>
              {itemName}
            </Text>
            <Text fontSize={16} color='#21262c'>
              {formatCurrency(balance)}
            </Text>
          </Column>
        </Row>
      </Button>
    )
  }

  return (
    <Column flex={1}>
      <FlatList
        data={dataReportMovement}
        keyExtractor={(item, index) => `${index}-${item.date}`}
        renderItem={renderItem}
      />
    </Column>
  )
}

export default MovementReport
