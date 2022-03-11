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
        const {userId} = this.props
        const {userMail} = this.props

        let homeColor = '#505050'
        let myListColor = '#505050'
        let accountColor = '#505050'

        switch (selected){
            case 'home':
                homeColor = '#fff'
                break
            case 'myList':
                myListColor = '#fff'
                break
            case 'account':
                accountColor = '#fff'
                break
            default:
                break
        }




        const navigation = this.props.navigation;
        const homeIcon = <Icon name="home-outline" size={23} color={homeColor} />;
        const starIcon = <Icon name="star-outline" size={23} color={myListColor} />;
        const accountIcon = <Icon name="person-circle-outline" size={23} color={accountColor} />;


        return(

            <View style={mainButtonStyle.navBar}>


                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Home', {userId: userId, userMail: userMail})}>
                    <Text>
                        {homeIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: homeColor}]}>Accueil</Text>
                </Pressable>


                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('MyList', {userId: userId, userMail: userMail})}>
                    <Text>
                        {starIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: myListColor}]}>Ma Liste</Text>
                </Pressable>


                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Account', {userId: userId, userMail: userMail})}>
                    <Text>
                        {accountIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: accountColor}]}>Mon compte</Text>
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

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        // backgroundColor: '#282828',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 30,
        width: 60,

    },

    textButton: {
        color: '#fff',
        fontSize: 9,
    },






});




export default NavBar;
