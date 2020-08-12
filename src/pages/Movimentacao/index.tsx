import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MovComponent from '../../components/MovComponent';

const Tab = createBottomTabNavigator();

const Movimentacao: React.FC = () => (
   
    <Tab.Navigator initialRouteName="Entradas" 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Entradas') {
          iconName = focused
            ? 'arrow-up-circle'
            : 'arrow-up-circle-outline';
        } else if (route.name === 'Saidas') {
          iconName = focused ? 'arrow-down-circle' : 'arrow-down-circle-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={40} color={color} />;
      },
    })}
    tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        style: {backgroundColor: "#4db476", height: 60}
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