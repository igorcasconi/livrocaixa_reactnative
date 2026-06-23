import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@react-native-vector-icons/ionicons'
import TransactionComponent from './components/TransactionComponent'
import { tabBarOptions } from './styles/style'
import { RouteProp } from '@react-navigation/native'

const screenRoute = (route: RouteProp<Record<string, object | undefined>, string>) => ({
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName: any = ''

    if (route.name === 'Entries') {
      iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'
    } else if (route.name === 'Outflows') {
      iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline'
    }
    return <Ionicons name={iconName} size={size} color={color} />
  }
})

const Tab = createBottomTabNavigator()

const Transactions: React.FC = () => (
  <Tab.Navigator
    initialRouteName='Entries'
    screenOptions={({ route }) => ({
      ...screenRoute(route),
      ...tabBarOptions,
      headerShown: false
    })}
  >
    <Tab.Screen
      name='Entries'
      component={TransactionComponent as React.ComponentType<any>}
      options={{
        tabBarLabel: 'Entradas'
      }}
    />
    <Tab.Screen
      name='Outflows'
      component={TransactionComponent as React.ComponentType<any>}
      options={{
        tabBarLabel: 'Saídas'
      }}
    />
  </Tab.Navigator>
)

export default Transactions
