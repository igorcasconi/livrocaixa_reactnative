import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, 
        justifyContent: 'center',
        marginTop: 20
    },
    imageCard: {
        width: 193,
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    cardConfig: {
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: 60,
        marginBottom: 10,
        backgroundColor: "#2970d1"
    },
    textCard: {
        marginLeft: 10,
        marginTop: 2,
        marginBottom: 5,
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        marginRight: 10
    },
    cardInfoCaixa: {
        borderRadius: 10,
        backgroundColor: "#4db476",
        marginBottom: 15
    },
    textCardInfo: {
        position: "absolute",
        left: 2,
        bottom: 0,
        fontWeight: "bold",
        fontSize: 17,
        color: "#fff",
    },
    dateCardInfo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
        color: "#fff"
    },
    viewInfo: {
        marginBottom: 40
    },
    iconConfig: {
        fontWeight: "bold",
        position: "absolute",
        bottom: 0,
        right: 0,

    },

    textAds: {
        textAlign: 'center',
        marginBottom: 10
    }
});

export default styles;