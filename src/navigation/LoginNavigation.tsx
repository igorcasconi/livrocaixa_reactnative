import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';

const Stack = createStackNavigator();

const LoginNavigation = () => {
    return  (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={Login} 
            options = {{
                headerShown: false
            }}/>
        </Stack.Navigator>
    );
}

export default LoginNavigation;