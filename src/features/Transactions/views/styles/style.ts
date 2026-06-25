import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import theme from '../../../../core/theme'
import { Column } from '../../../../core/components'

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'black',
  tabBarInactiveBackgroundColor: theme.colors.background,
  tabBarActiveBackgroundColor: theme.colors.green.n100,
  tabBarStyle: {
    elevation: 0,
    shadowOpacity: 0,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  tabBarIconStyle: {
    flex: 0,
    width: 24,
    height: 28,
    marginTop: 6
  },
  tabBarLabelStyle: {
    fontSize: 13,
    marginLeft: 6
  }
}

export const ImageCard = styled.Image`
  width: 120px;
  height: 120px;
  min-height: 120px;
`

export const StyledCard = styled(Column)`
  elevation: 2;
`

export const ImageCashRegister = styled.Image`
  width: 60px;
  height: 60px;
`

export const ImageReceipt = styled.Image`
  width: 60px;
  height: 60px;
`

export const TransactionListComponent = styled.FlatList`
  height: 100%;
  flex: 1;
  width: 100%;
`
