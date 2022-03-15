import {StyleSheet} from "react-native";

const startStyles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#232323',
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle: {
        color: '#ffffff',
        fontSize: 80,
        paddingBottom: 70,
        fontFamily: "BebasNeue",
    },

    startButton: {
        backgroundColor: '#000000',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ff0000",
    },
    textButton: {
        color: '#ff0000',
        fontSize: 25,
        fontFamily: "Helvetica",
    },
})

export default startStyles;
