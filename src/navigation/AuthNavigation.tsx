<<<<<<< HEAD
import React, { Fragment } from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import { Row } from '../components'

import { Home, MovementDetail, Movement, MovementReport, About, PolicyPrivacy } from '../pages'
import AddMovimentacao from '../pages/AddMovimentacao'
import Tutorial from '../pages/Tutorial'
=======
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useUser } from '../context/AuthContext'

import Home from '../pages/Home'
import Movimentacao from '../pages/Movimentacao'
import AddMovimentacao from '../pages/AddMovimentacao'
import OthersMov from '../pages/OthersMov'
import Tutorial from '../pages/Tutorial'
import DetailMov from '../pages/DetailMov'
import About from '../pages/About'
>>>>>>> 000880b (fix(app): fixed app)

import { ParamsList } from './type'

const Stack = createStackNavigator<ParamsList>()

const AuthNavigation: React.FC = () => {
<<<<<<< HEAD
  // const { logout } = useUser()

  // const Logout = () => (
  //   <Button onPress={logout} mr={10}>
  //     <Ionicons name='log-out-outline' color='white' size={30} />
  //   </Button>
  // )

  const optionsHeader: StackNavigationOptions = {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#4db476'
    },
    headerTitleAlign: 'center'
  }

  return (
    <Fragment>
=======
  const { logout } = useUser()

  const Logout = () => (
    <TouchableOpacity onPress={logout} style={{ marginRight: 10 }}>
      <Ionicons name='log-out-outline' color='white' size={30} />
    </TouchableOpacity>
  )

  return (
    <>
>>>>>>> 000880b (fix(app): fixed app)
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
<<<<<<< HEAD
            headerLeft: undefined,
            headerTitle: 'Livro Caixa',
            ...optionsHeader
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
=======
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
          component={Movimentacao}
          options={{
            headerTitle: 'Movimentação do Caixa',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
>>>>>>> 000880b (fix(app): fixed app)
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='AddMov'
          component={AddMovimentacao}
          options={{
            headerTitle: 'Adicionar Movimentação',
<<<<<<< HEAD
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='MovementByYear'
          component={MovementReport}
          options={{
            headerTitle: 'Movimentações/Ano',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='MovementByMonth'
          component={MovementReport}
          options={{
            headerTitle: 'Movimentações/Mês',
            ...optionsHeader
=======
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
>>>>>>> 000880b (fix(app): fixed app)
          }}
        />
        <Stack.Screen
          name='Tutorial'
          component={Tutorial}
          options={{
            headerTitle: 'Ajuda',
<<<<<<< HEAD
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='MovementDetailYear'
          component={MovementDetail}
          options={{
            headerTitle: 'Detalhes',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='MovementDetailMonth'
          component={MovementDetail}
          options={{
            headerTitle: 'Detalhes',
            ...optionsHeader
=======
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='DetailMovAno'
          component={DetailMov}
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
          name='DetailMovMes'
          component={DetailMov}
          options={{
            headerTitle: 'Detalhes',
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
>>>>>>> 000880b (fix(app): fixed app)
          }}
        />
        <Stack.Screen
          name='About'
          component={About}
          options={{
            headerTitle: 'Sobre',
<<<<<<< HEAD
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='PolicyPrivacy'
          component={PolicyPrivacy}
          options={{
            headerTitle: 'Política de Privacidade',
            ...optionsHeader
          }}
        />
      </Stack.Navigator>
    </Fragment>
=======
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#4db476'
            },
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    </>
>>>>>>> 000880b (fix(app): fixed app)
  )
}

export default AuthNavigation
