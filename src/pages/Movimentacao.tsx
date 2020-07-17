import React from 'react';
import Entrada from '../components/Entrada';
import Saida from '../components/Saida';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Movimentacao: React.FC = () => (
   
    <Tab.Navigator initialRouteName="Entradas" tabBarOptions={{
        activeTintColor: '#4db476',
        inactiveTintColor: 'gray',
      }}>
        <Tab.Screen name="Entradas" component={Entrada} options={{
          tabBarLabel: 'Entradas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-up-circle-outline" color={color} size={30} />
          ),}}/>
        <Tab.Screen name="Saidas" component={Saida} options={{
          tabBarLabel: 'Saídas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="arrow-down-circle-outline" color={color} size={30} />
          ),}}/>
    </Tab.Navigator>
);

export default Movimentacao;