import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MovComponent from '../../components/MovComponent';

const Tab = createBottomTabNavigator();

const Movimentacao: React.FC = () => (
   
    <Tab.Navigator initialRouteName="Entradas" 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: any;

        if (route.name === 'Entradas') {
          iconName = focused
            ? 'arrow-up-circle'
            : 'arrow-up-circle-outline';
        } else if (route.name === 'Saidas') {
          iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: '#4db476',
        activeBackgroundColor: '#89ac97',
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          
        },
        tabStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconStyle: {
            flex: 0,
            width: 20,
            height: 20
        },
        labelStyle: {
            fontSize: 14,
            marginLeft: 16,
        },
      }}>
        <Tab.Screen name="Entradas" component={MovComponent} options={{
          tabBarLabel: 'Entradas',
        }}/>
        <Tab.Screen name="Saidas" component={MovComponent} options={{
          tabBarLabel: 'Saídas',
        }}/>
    </Tab.Navigator>
);

export default Movimentacao;