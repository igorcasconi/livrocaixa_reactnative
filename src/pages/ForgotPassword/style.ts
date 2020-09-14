import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4db476",
        padding: 20,
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
    buttonAccess: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b61e6",
        borderRadius: 10,
        width: "95%",
        padding: 10,
        flexDirection: 'row',
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
    WarnLogin: {
        width: "92%",
        padding: 15,
        backgroundColor: "yellow",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: 'row',
    },
    textWarnLogin: {
        color: "black",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10
    },
    buttonSignUp: {
        borderBottomWidth: 4,
        borderColor:"#3b61e6",
        padding: 5,
        borderRadius: 20
    },
    textInfoSignUp: {
        textAlign: "center",
        fontSize: 16,
        marginBottom: 20
    }
});

export default styles;