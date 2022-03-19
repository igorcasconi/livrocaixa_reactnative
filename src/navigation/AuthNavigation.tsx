import React, { Fragment } from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import { Row } from '../components'

import { Home, MovementDetail, Movement, MovementReport, About } from '../pages'
import AddMovimentacao from '../pages/AddMovimentacao'
import Tutorial from '../pages/Tutorial'

import { ParamsList } from './type'

const Stack = createStackNavigator<ParamsList>()

const AuthNavigation: React.FC = () => {
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
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
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
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='AddMov'
          component={AddMovimentacao}
          options={{
            headerTitle: 'Adicionar Movimentação',
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
          }}
        />
        <Stack.Screen
          name='Tutorial'
          component={Tutorial}
          options={{
            headerTitle: 'Ajuda',
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
          }}
        />
        <Stack.Screen
          name='About'
          component={About}
          options={{
            headerTitle: 'Sobre',
            ...optionsHeader
          }}
        />
      </Stack.Navigator>
    </Fragment>
  )
}

export default AuthNavigation
