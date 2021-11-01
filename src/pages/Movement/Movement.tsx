import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MovementComponent } from '../../components'

const Tab = createBottomTabNavigator()

const Movement: React.FC = () => (
  <Tab.Navigator
    initialRouteName='Entries'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = ''

        if (route.name === 'Entries') {
          iconName = focused ? 'arrow-up-circle' : 'arrow-up-circle-outline'
        } else if (route.name === 'Outflows') {
          iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline'
        }
        return <Ionicons name={iconName} size={size} color={color} />
      }
    })}
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: 'black',
      inactiveBackgroundColor: '#4db476',
      activeBackgroundColor: '#89ac97',
      style: {
        elevation: 0,
        shadowOpacity: 0,
        height: 64
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconStyle: {
        flex: 0,
        width: 20,
        height: 20
      },
      labelStyle: {
        fontSize: 14,
        marginLeft: 16
      }
    }}
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
