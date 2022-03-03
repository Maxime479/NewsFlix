import {Image, StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Pressable} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

class NavBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }

    }




    render() {

        const selected = this.props.selected

        let homeColor = '#505050'
        let myListColor = '#505050'

        switch (selected){
            case 'home':
                homeColor = '#fff'
                break
            case 'myList':
                myListColor = '#fff'
                break
            default:
                break
        }




        const navigation = this.props.navigation;
        const homeIcon = <Icon name="home" size={23} color={homeColor} />;
        const starIcon = <Icon name="star" size={23} color={myListColor} />;


        return(

            <View style={mainButtonStyle.navBar}>
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Home')}>
                    <Text>
                        {homeIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: homeColor}]}>Accueil</Text>
                </Pressable>
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('MyList')}>
                    <Text>
                        {starIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: myListColor}]}>Ma Liste</Text>
                </Pressable>
            </View>

        )

    }
}



const mainButtonStyle = StyleSheet.create({

    navBar: {
        backgroundColor: '#151515',
        // backgroundColor: '#282828',
        width: '100%',
        height: '7%',
        // height: '17%',

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 40,

    },

    textButton: {
        color: '#fff',
        fontSize: 9,


    },






});




export default NavBar;
