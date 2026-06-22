import React from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'
import { Button, Row, Text } from '../../../../core/components'
import { useNavigation } from '@react-navigation/native'
import { MenuProps } from '../../models/MenuModel'

export const HomeListItem = React.memo(({ item }: { item: MenuProps }) => {
  const { navigate } = useNavigation()

  return (
    <Button onPress={() => navigate(item.link as never)}>
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
})
