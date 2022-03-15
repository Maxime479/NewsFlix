import {StyleSheet, Text, View, Pressable} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

class NavBar extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        //Affichage du texte et de l'icône sélectionné d'une manière différente dans la barre de navigation
        // (icône plein et couleur blanche)
        const selected = this.props.selected
        const {userId} = this.props

        let homeColor = '#505050'
        let searchColor = '#505050'
        let myListColor = '#505050'
        let accountColor = '#505050'

        switch (selected){
            case 'home':
                homeColor = '#fff'
                break
            case 'search':
                searchColor = '#fff'
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



        //Liste des icônes non sélectionnés
        const homeIconEmpty = <Icon name="md-home-outline" size={23} color={homeColor} />
        const searchIconEmpty = <Icon name="md-search" size={23} color={searchColor} />
        const starIconEmpty = <Icon name="md-heart-outline" size={23} color={myListColor} />
        // const starIcon = <Icon name="md-star-outline" size={23} color={myListColor} />
        // const accountIcon = <Icon name="person-circle-outline" size={23} color={accountColor} />
        const accountIconEmpty = <Icon name="md-person-outline" size={23} color={accountColor} />



        //Liste des icônes sélectionnés
        const homeIconFull = <Icon name="md-home" size={23} color={homeColor} />
        const searchIconFull = <Icon name="md-search" size={23} color={searchColor} />
        const starIconFull = <Icon name="md-heart" size={23} color={myListColor} />
        const accountIconFull = <Icon name="md-person" size={23} color={accountColor} />



        let homeIcon = homeIconEmpty
        let searchIcon = searchIconEmpty
        let starIcon = starIconEmpty
        let accountIcon = accountIconEmpty


        switch (selected){
            case 'home':
                homeIcon = homeIconFull
                break

            case 'search':
                searchIcon = searchIconFull
                break

            case 'myList':
                starIcon = starIconFull
                break

            case 'account':
                accountIcon = accountIconFull
                break

            default:
                break
        }


        let opacity = this.props.opacity

        if(this.props.opacity === undefined){
            opacity = 1
        }



        return(

            <View style={[mainButtonStyle.navBar, {opacity: opacity}]}>

                {/*Bouton Accueil*/}
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Home', {userId: userId})}>
                    <Text>
                        {homeIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: homeColor}]}>Accueil</Text>
                </Pressable>


                {/*Bouton Rechercher*/}
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Search', {userId: userId})}>
                    <Text>
                        {searchIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: searchColor}]}>Rechercher</Text>
                </Pressable>


                {/*Bouton Ma Liste*/}
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('MyList', {userId: userId})}>
                    <Text>
                        {starIcon}
                    </Text>
                    <Text style={[mainButtonStyle.textButton, {color: myListColor}]}>Ma Liste</Text>
                </Pressable>


                {/*Bouton Mon compte*/}
                <Pressable style={mainButtonStyle.button} onPress={() => navigation.navigate('Account', {userId: userId})}>
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
        width: '100%',
        height: '7%',

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        position: 'absolute',
        bottom: 0,
    },

    button: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    textButton: {
        color: '#fff',
        fontSize: 9,
    },

})


export default NavBar;
