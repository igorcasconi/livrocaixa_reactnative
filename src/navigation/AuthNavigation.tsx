import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useUser } from '../context/AuthContext'
import { Button, Row } from '../components'

import { Home, MovementDetail, Movement, MovementReport } from '../pages'
import AddMovimentacao from '../pages/AddMovimentacao'
import Tutorial from '../pages/Tutorial'
import About from '../pages/About'

import { ParamsList } from './type'

const Stack = createStackNavigator<ParamsList>()

const AuthNavigation: React.FC = () => {
  const { logout } = useUser()

  const Logout = () => (
    <Button onPress={logout} mr={10}>
      <Ionicons name='log-out-outline' color='white' size={30} />
    </Button>
  )

  return (
    <Fragment>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerLeft: undefined,
            headerTitle: 'Livro Caixa',
            headerRight: () => <Logout />,
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='MovementFinancial'
          component={Movement}
          options={{
            headerTitle: 'Movimentação do Caixa',
            headerTintColor: '#000',
            headerTransparent: true,
            headerBackground: () => <Row width={1} backgroundColor='#4db476' height={60} mb={60} />,
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
          name='MovementByYear'
          component={MovementReport}
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
          name='MovementByMonth'
          component={MovementReport}
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
