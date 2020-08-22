import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Home from '../pages/Home';
import Movimentacao from '../pages/Movimentacao';
import AddMovimentacao from '../pages/AddMovimentacao';
import OthersMov from '../pages/OthersMov';
import Tutorial from '../pages/Tutorial';
import DetailMov from '../pages/DetailMov';
import About from '../pages/About';
import AuthContext from './AuthProvider';

const Stack = createStackNavigator();

const AuthNavigation = () => {

    const { logout } = useContext(AuthContext);

    return(
    <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={Home} 
          options = {{
            headerTitle: 'Livro Caixa', 
            headerTintColor: "#000",
            headerLeft: null,
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity onPress={() => { logout(); }} 
              style={{marginRight: 10}}>
                <Ionicons name="log-out-outline" color="white" size={30} />
              </TouchableOpacity>        
            ),}}/>
          <Stack.Screen name="Movimentacao" component={Movimentacao} 
          options = {{
            headerTitle: 'Movimentação do Caixa', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="AddMov" component={AddMovimentacao} 
          options = {{
            headerTitle: 'Adicionar Movimentação', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="MovAno" component={OthersMov} 
          options = {{
            headerTitle: 'Movimentações/Ano', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="MovMes" component={OthersMov} 
          options = {{
            headerTitle: 'Movimentações/Mês', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
           <Stack.Screen name="Tutorial" component={Tutorial} 
          options = {{
            headerTitle: 'Ajuda', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="DetailMovAno" component={DetailMov} 
          options = {{
            headerTitle: 'Detalhes', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="DetailMovMes" component={DetailMov} 
          options = {{
            headerTitle: 'Detalhes', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
          <Stack.Screen name="About" component={About} 
          options = {{
            headerTitle: 'Sobre', 
            headerTintColor: "#000", 
            headerStyle: {
              backgroundColor: "#4db476",
            }, 
            headerTitleAlign: "center"
          }}/>
        </Stack.Navigator>);
}

export default AuthNavigation;