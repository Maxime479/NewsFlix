import {StyleSheet} from "react-native";


const searchStyles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.63)',
        alignItems: "center",


    },

    buttonTemp: {
        backgroundColor: '#919191',
        width: 80,
    },


    input: {
        // flex: 1,
        // backgroundColor: '#232323',
        marginVertical: 20,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 10,
        fontFamily: "Helvetica",
        color: '#e7e7e7',
    },


})

export default searchStyles
