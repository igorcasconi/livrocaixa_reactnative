import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    imageMov: {
        width: 90,
        height: 90,
        marginRight: 10
    },
    card: {
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        backgroundColor: "#ffebb4"
    },
    textCard: {
        fontSize: 20,
    },
    infoCard: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    inputs: {
        marginTop: 10
    },
    textCardView: {
        width: '80%'
    },
    buttonInfo: {
        backgroundColor: "#187feb",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderStyle: "solid",
        borderRadius: 10,
        padding: 10,
        
    },
    textButton: {
        color: "#ffffff",
        fontWeight: "bold"
    },
    colorTextCheckBox: {
        color: "black",
        fontWeight: "bold"
    },
    dateTime: {
        borderBottomWidth: 1,
        width: 140,
        marginLeft: 12,
        flexDirection: "row",
        padding: 5,
        borderColor: "#747575",
        marginBottom: 20
    },
    textError: { fontSize: 14, color: 'red', marginBottom: 20 }
});

export default styles;