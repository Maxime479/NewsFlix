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
        // backgroundColor: '#000000',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        // borderWidth: 1,
        // borderColor: "#ff0000",

        backgroundColor: '#000000',
        borderWidth: 0.5,
        borderColor: '#ff0000',
        elevation: 10,
        shadowColor: '#ff0000',
    },
    textButton: {
        // color: '#ff0000',
        fontSize: 25,
        fontFamily: "Helvetica",

        color: '#ff0000',
        textShadowColor: '#ff0000',
        textShadowRadius: 20,
    },


    monitoringButtonText: {
        fontWeight: "bold",
        fontSize: 17,
        fontFamily: 'HelveticaBold',

        color: '#FF7A00',
        textShadowColor: '#FF7A00',
        textShadowRadius: 20,
    },

    monitoringButton: {
        fontWeight: "bold",
        alignSelf: "center",
        padding: 5,
        borderRadius: 5,

        backgroundColor: '#000000',
        borderWidth: 0.5,
        borderColor: '#FF7A00',
        elevation: 10,
        shadowColor: '#FF7A00',
        // filter: 'blur(5)'
    },

})

export default startStyles;
