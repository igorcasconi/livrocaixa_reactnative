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

  const optionTransactionHeader: NativeStackNavigationOptions = {
    headerTintColor: '#000',
    headerBackground: () => <Row width={1} backgroundColor='#4db476' height={60} />,
    headerTitleAlign: 'center',
    headerTitle: 'Movimentação do caixa'
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
            ...optionTransactionHeader
          }}
        />
        <Stack.Screen name='Outflows' component={Transactions} options={{ ...optionTransactionHeader }} />
        <Stack.Screen
          name='AddTransaction'
          component={AddTransaction}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Adicionar Movimentação'
          }}
        />
        <Stack.Screen
          name='TransactionsByYear'
          component={TransactionReport}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Movimentações/Ano'
          }}
        />
        <Stack.Screen
          name='TransactionsByMonth'
          component={TransactionReport}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Movimentações/Mês'
          }}
        />
        {/* <Stack.Screen
          name='Tutorial'
          component={Tutorial}
          options={{
            headerTitle: 'Ajuda',
            ...optionTransactionHeader
          }}
        /> */}
        <Stack.Screen
          name='TransactionDetailYear'
          component={TransactionDetail}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Detalhes'
          }}
        />
        <Stack.Screen
          name='TransactionDetailMonth'
          component={TransactionDetail}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Detalhes'
          }}
        />
        <Stack.Screen
          name='About'
          component={About}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Sobre'
          }}
        />
        <Stack.Screen
          name='PolicyPrivacy'
          component={PolicyPrivacy}
          options={{
            ...optionTransactionHeader,
            headerTitle: 'Política de Privacidade'
          }}
        />
      </Stack.Navigator>
    </Fragment>
  )
}

export default AuthNavigation
