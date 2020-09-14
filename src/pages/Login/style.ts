import React from 'react';
import { StyleSheet, Dimensions } from "react-native";
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('screen').width;

export const Container = styled.KeyboardAvoidingView`
    background-color: #4db476;
    height: 100%;
    padding: 20px;
`;

export const ViewButtonLogin = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 20px;
    padding: 5px;
`;

export const ViewInit = styled.View`
    justify-content: center;
    align-items: center;
`;

export const ImageLogo = styled.Image`
    width: 90px;
    height: 90px;
`;

export const TextInit = styled.Text`
    font-size: 25px;
    margin-bottom: 40px;
    font-weight: bold;
`;

export const ButtonAccess = styled.TouchableOpacity`
    background-color: #3b61e6;
    border-radius: 10px;
    width: 97%;
    padding: 10px;

    ${ windowWidth >= 411 && `
        margin-left: 5px;
    `}
`;

export const ButtonSignUp = styled.TouchableOpacity`
    background-color: #212121;
    padding: 10px;
    width: 150px;
    height: 70px;
    borderRadius: 10px;

    ${ windowWidth >= 411 && `
        width: 190px;
    `}
`;

export const ButtonForgot = styled.TouchableOpacity`
    background-color: #3b61e6;
    padding: 10px;
    width: 150px;
    height: 70px;
    borderRadius: 10px;

    ${ windowWidth >= 411 && `
        width: 190px;
    `}
`;

export const TextButton = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-align: center;

    ${ windowWidth >= 411 && `
        font-size: 16px;
    `}
`;

export const TextButtonForgot = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    line-height: 40px;

    ${ windowWidth >= 411 && `
        font-size: 16px;
    `}
`;

export const ErroLogin = styled.View`
    width: 100%;
    background-color: red;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 10px; 
    flex-direction: row;
    margin-bottom: 10px;
`;

const styles = StyleSheet.create({
    erroLogin: {
        width: 350,
        backgroundColor: "red",
        padding: 10,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10, 
        flexDirection: 'row',
    },
    textErroLogin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    
});

export default styles;