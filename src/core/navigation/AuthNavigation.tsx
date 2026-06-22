import React, { Fragment } from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack'

import { Button, Row, Text } from '../components'

import { ParamsList } from './type'
import Home from '../../features/Home/views/Home'
import Transactions from '../../features/Transactions/views/Transactions'
import AddTransaction from '../../features/Transactions/views/AddTransaction'
import TransactionReport from '../../features/Transactions/views/TransactionReport'
import TransactionDetail from '../../features/Transactions/views/TransactionDetail'
import About from '../../features/AboutApp/views/About'
import PolicyPrivacy from '../../features/PolicyPrivacy/views/PolicyPrivacy'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { useUser } from '../../context/AuthContext'

const Stack = createNativeStackNavigator<ParamsList>()

const AuthNavigation: React.FC = () => {
  const { logout } = useUser()
  const optionsHeader: NativeStackNavigationOptions = {
    headerTintColor: '#000',
    headerStyle: {
      backgroundColor: '#4db476'
    },
    headerTitleAlign: 'center',
    headerRight: () => (
      <Row backgroundColor='#4db476'>
        <Button onPress={logout}>
          <Text color='#fff' fontSize={16} fontWeight='bold'>
            Sair
          </Text>
        </Button>
      </Row>
    )
  }

  return (
    <Fragment>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerTitle: 'Livro Caixa',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='Entries'
          component={Transactions}
          options={{
            headerTitle: 'Movimentação do Caixa',
            headerTintColor: '#000',
            headerTransparent: true,
            headerBackground: () => <Row width={1} backgroundColor='#4db476' height={60} mb={60} />,
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='Outflows'
          component={Transactions}
          options={{
            headerTitle: 'Movimentação do Caixa',
            headerTintColor: '#000',
            headerTransparent: true,
            headerBackground: () => <Row width={1} backgroundColor='#4db476' height={60} mb={60} />,
            headerTitleAlign: 'center'
          }}
        />
        <Stack.Screen
          name='AddTransaction'
          component={AddTransaction}
          options={{
            headerTitle: 'Adicionar Movimentação',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='TransactionsByYear'
          component={TransactionReport}
          options={{
            headerTitle: 'Movimentações/Ano',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='TransactionsByMonth'
          component={TransactionReport}
          options={{
            headerTitle: 'Movimentações/Mês',
            ...optionsHeader
          }}
        />
        {/* <Stack.Screen
          name='Tutorial'
          component={Tutorial}
          options={{
            headerTitle: 'Ajuda',
            ...optionsHeader
          }}
        /> */}
        <Stack.Screen
          name='TransactionDetailYear'
          component={TransactionDetail}
          options={{
            headerTitle: 'Detalhes',
            ...optionsHeader
          }}
        />
        <Stack.Screen
          name='TransactionDetailMonth'
          component={TransactionDetail}
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
  )
}

export default AuthNavigation
