import React from 'react'
import { TransactionProps } from '../../models/TransactionModel'
import reciboEntradaImg from '../../../../assets/recibo.png'
import reciboSaidaImg from '../../../../assets/recibo_saida.png'
import { Button, Column, Row, Text } from '../../../../core/components'
import Ionicons from '@react-native-vector-icons/ionicons'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../core/utils/formatters'
import { TransactionComponentStyles } from '../styles/style'
import { Image } from 'react-native'

type TransactionListItemProps = {
  item: TransactionProps
  isTypeRoute: number
  alertDeleteHandler?: (uid: string) => void
}

export const TransactionListItem = React.memo(({ item, isTypeRoute, alertDeleteHandler }: TransactionListItemProps) => {
  const imageItem = isTypeRoute === 1 ? reciboEntradaImg : reciboSaidaImg
  const colorValue = isTypeRoute === 1 ? '#4db476' : 'red'
  const formattedDate = format(new Date(item?.datetime), 'dd/MM/yyyy HH:mm')
  const payMode = item?.paymode
  const formattedValue = formatCurrency(item?.value)

  return (
    <Row
      width={1}
      height='auto'
      minHeight={80}
      flex={1}
      px={16}
      py={18}
      border='0.5px solid #c1c1c1'
      justifyContent='center'
      alignItems='center'
    >
      <Column width={1} maxWidth='90%'>
        <Row width='80%' ml='8px'>
          <Image source={imageItem} style={TransactionComponentStyles.imageRecibo} />
          <Column width='100%' height='100%' justifyContent='center'>
            <Text fontSize={16} color='#21262c' fontWeight='bold'>
              {item?.product}
            </Text>
            <Text fontSize={16} color={colorValue} mr='16px' fontWeight='bold'>
              {formattedValue}
            </Text>
            {!!payMode && (
              <Text fontSize={14} color='#21262c'>
                {payMode}
              </Text>
            )}
            <Text fontSize={14} color='#21262c'>
              {formattedDate}
            </Text>
          </Column>
        </Row>
      </Column>
      <Column maxWidth='10%' justifyContent='flex-end'>
        <Button backgroundColor='transparent' onPress={() => alertDeleteHandler?.(item?.uid!)}>
          <Ionicons name='trash-bin' color='red' size={25} />
        </Button>
      </Column>
    </Row>
  )
})

export default TransactionListItem
