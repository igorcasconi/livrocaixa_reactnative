import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

export const tabBarOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: 'white',
  tabBarInactiveTintColor: 'black',
  tabBarInactiveBackgroundColor: '#4db476',
  tabBarActiveBackgroundColor: '#89ac97',
  tabBarStyle: {
    elevation: 0,
    shadowOpacity: 0,
    height: 64,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  tabBarIconStyle: {
    flex: 0,
    width: 24,
    height: 28,
    marginTop: 6
  },
  tabBarLabelStyle: {
    fontSize: 13,
    marginLeft: 6
  }
}

export const TransactionDetailStyles = StyleSheet.create({
  imageCard: {
    width: 120,
    height: 120,
    minHeight: 120
  }
})

export const TransactionReportStyles = StyleSheet.create({
  imageCaixa: {
    width: 60,
    height: 60
  },
  imageCaixaLoading: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  loading: {
    padding: 10,
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const TransactionComponentStyles = StyleSheet.create({
  imageRecibo: {
    width: 60,
    height: 60
  },
  fab: {
    position: 'absolute',
    margin: 10,
    right: 0,
    bottom: 0
  },
  deleteConfig: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 30
  },
  centeredViewDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalViewDelete: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonsModal: {
    flexDirection: 'row',
    marginTop: 20
  },
  buttonModalCancel: {
    width: 90,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonModalDelete: {
    width: 90,
    backgroundColor: 'red',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20
  },
  textModalDelete: {
    fontWeight: 'bold',
    color: 'white'
  },
  imageCaixaLoading: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  loading: {
    padding: 10,
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export const TransactionListComponent = styled.FlatList`
  height: 100%;
  flex: 1;
  width: 100%;
`
