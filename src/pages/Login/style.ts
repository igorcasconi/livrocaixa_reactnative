import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4db476",
        padding: 10,
    },
    ViewInputs: {
        padding: 30,
        marginTop: 90
    },
    imageLogo: {
        width: 90,
        height: 90
    },
    viewImageLogo: {
        justifyContent: "center",
        alignItems: "center"
    },
    textInit: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: "bold"
    },

    viewButton: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    buttonAccess: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b61e6",
        borderRadius: 10,
        width: "100%",
        paddingLeft: 130,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 130
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
    },

    textButtonForgot: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 50,
    },

    buttonsLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 60,
        marginBottom: 20,
    },

    buttonSignUp: {
        backgroundColor: "#212121",
        padding: 10,
        width: 190,
        height: 70,
        borderRadius: 10,
    },

    buttonForgot:{
        backgroundColor: "#3b61e6",
        padding: 10,
        height: 70,
        borderRadius: 10,
    },
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