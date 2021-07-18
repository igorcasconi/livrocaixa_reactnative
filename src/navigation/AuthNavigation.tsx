import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useUser } from '../context/AuthContext'

import { Home, MovementDetail, Movement } from '../pages'
import AddMovimentacao from '../pages/AddMovimentacao'
import OthersMov from '../pages/OthersMov'
import Tutorial from '../pages/Tutorial'
import About from '../pages/About'

import { ParamsList } from './type'

const Stack = createStackNavigator<ParamsList>()

const AuthNavigation: React.FC = () => {
  const { logout } = useUser()

  const Logout = () => (
    <TouchableOpacity onPress={logout} style={{ marginRight: 10 }}>
      <Ionicons name='log-out-outline' color='white' size={30} />
    </TouchableOpacity>
  )

  return (
    <Fragment>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTitle: 'Livro Caixa',
            headerTintColor: '#000',
            headerLeft: undefined,
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center',
            headerRight: () => <Logout />
          }}
        />
        <Stack.Screen
          name='Movimentacao'
          component={Movement}
          options={{
            headerTitle: 'Movimentação do Caixa',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='AddMov'
          component={AddMovimentacao}
          options={{
            headerTitle: 'Adicionar Movimentação',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='MovAno'
          component={OthersMov}
          options={{
            headerTitle: 'Movimentações/Ano',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='MovMes'
          component={OthersMov}
          options={{
            headerTitle: 'Movimentações/Mês',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='Tutorial'
          component={Tutorial}
          options={{
            headerTitle: 'Ajuda',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='MovementDetailYear'
          component={MovementDetail}
          options={{
            headerTitle: 'Detalhes',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='MovementDetailMonth'
          component={MovementDetail}
          options={{
            headerTitle: 'Detalhes',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='About'
          component={About}
          options={{
            headerTitle: 'Sobre',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </Fragment>
  )
}

export default AuthNavigation
