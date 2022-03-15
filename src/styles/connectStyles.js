import {StyleSheet} from "react-native";


const connectStyles = StyleSheet.create({


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


    input: {
        marginVertical: 10,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 60,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 10,
        fontFamily: "Helvetica",
        color: '#e7e7e7',
    },


    logButton: {
        marginTop: 30,
        backgroundColor: '#000000',
        borderRadius: 7,
        height: 55,
        width: '90%',
        borderWidth: 2,
        borderColor: "#939393",
        justifyContent: "center",
        alignItems: "center",
    },

    textButton: {
        color: '#e7e7e7',
        fontSize: 20,
        fontFamily: "Helvetica",
    },

    signUpText: {
        marginTop: 60,
        color: '#989898',
        fontSize: 15,
        fontFamily: "Helvetica",
    },


})


export default connectStyles
