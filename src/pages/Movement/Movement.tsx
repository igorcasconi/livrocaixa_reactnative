import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MovementComponent } from '../../components'
import { tabBarOptions } from './style'
import { RouteProp } from '@react-navigation/native'

const screenRoute = (route: RouteProp<Record<string, object | undefined>, string>) => ({
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName = ''

    if (route.name === 'Entries') {
      iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'
    } else if (route.name === 'Outflows') {
      iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline'
    }
    return <Ionicons name={iconName} size={size} color={color} />
  }
})

const Tab = createBottomTabNavigator()

const Movement: React.FC = () => (
  <Tab.Navigator
    initialRouteName='Entries'
    screenOptions={({ route }) => screenRoute(route)}
    tabBarOptions={tabBarOptions}
  >
    <Tab.Screen
      name='Entries'
      component={MovementComponent}
      options={{
        tabBarLabel: 'Entradas'
      }}
    />
    <Tab.Screen
      name='Outflows'
      component={MovementComponent}
      options={{
        tabBarLabel: 'Saídas'
      }}
    />
  </Tab.Navigator>
)

export default Movement
