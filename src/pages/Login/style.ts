import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4db476",
        padding: 10,
    },
    ViewInputs: {
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 30,
        fontWeight: "bold"
    },
    viewButton: {
        justifyContent: "center",
        alignItems: "center",
        
    },
    viewButtonPass: {
        position: 'relative',
    },
    buttonAccess: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b61e6",
        borderRadius: 30,
        width: "100%",
        paddingLeft: 130,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 130
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17
    },
    socialIcons: {
        marginTop: 15,
        marginBottom: 20
    },
    forgotPassword:{
        marginTop: -30,
        marginBottom: 20,
        
    },
    erroLogin: {
        width: 350,
        backgroundColor: "red",
        padding: 10,
        marginTop: 20,
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
    buttonSignUp: {
        borderBottomWidth: 4,
        borderColor:"#3b61e6",
        padding: 5,
        borderRadius: 20
    }
});

export default styles;