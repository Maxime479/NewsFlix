import React from "react";
import {StyleSheet, Text, View, Pressable, TouchableHighlight} from "react-native";

import firebase from "../../database/firebase";
import Loading from "../components/Loading";


class Account extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            likesPath: 'users/' + this.props.userId + '/likes',

            init: false,
        }
    }

    //Initialisation
    componentDidMount() {
        this.getAccountData()
    }


    //Récupère les données utilisateur du compte qui est connecté
    getAccountData = () => {
        let accountData = {}
        const db = firebase.firestore()

        let getQuery = db.collection('users').where(firebase.firestore.FieldPath.documentId(), '==', this.props.userId)
        getQuery.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    const {mail} = doc.data()
                    const {login} = doc.data()
                    const {password} = doc.data()

                    accountData = {
                        mail: mail,
                        login: login,
                        password: password
                    }
                })
            }).then(()=> {this.setState({accountData: accountData})})
            .catch(error => {console.log("Erreur lors de la récupération des données utilisateur\nErreur : " + error)})
    }



    render() {

        const {navigation} = this.props




        if(this.state.accountData === undefined){

            return (
                <View>
                    <Loading/>
                </View>
            )

        }else {

            return (
                <View style={styles.mainContainer}>

                    <Text style={styles.title}>Mon Compte</Text>

                        <View style={styles.dataContainer}>


                            {/*Affichage du mail*/}
                            <View style={[styles.sectionContainer, styles.startContainer]}>
                                    <Text style={styles.bold}>
                                        Mail
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.mail}
                                    </Text>
                            </View>


                            {/*Affichage du nom d'utilisateur*/}
                            <View style={styles.sectionContainer}>
                                    <Text style={styles.bold}>
                                        Nom d'utilisateur
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.login}
                                    </Text>
                            </View>


                            {/*Affichage du mot de passe*/}
                            <View style={[styles.sectionContainer, styles.endContainer]}>
                                    <Text style={styles.bold}>
                                        Mot de passe
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.password}
                                    </Text>
                            </View>


                        </View>

                    {/*Bouton de déconnexion */}
                    <TouchableHighlight style={styles.deconnectButton}
                                        onPress={() => navigation.navigate('Log')}
                                        activeOpacity={0.6}
                                        underlayColor="#400000"
                    >
                        <Text style={styles.deconnectButtonText} >Déconnexion</Text>
                    </TouchableHighlight>

                </View>
            )
        }



    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: '#0a0a0a',
    },

    startContainer: {
        borderTopEndRadius: 7,
        borderTopStartRadius: 7,
    },

    endContainer: {
        borderBottomEndRadius: 7,
        borderBottomStartRadius: 7,
    },


    sectionContainer: {
        backgroundColor: '#0a0a0a',
        alignItems: "flex-start",
        justifyContent:"center",
        borderWidth: 1,
        borderColor: '#494949',
        width: '100%',
        flexDirection: "column",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    dataContainer: {
        marginLeft: 10,
        marginVertical: 5,
        backgroundColor: '#0a0a0a',
        alignItems: "flex-start",
        borderRadius: 7,
        width: '90%',
        height: '60%',
    },
    title: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 20,
    },
    data: {
        color: '#cbcbcb',
        fontSize: 17,
        fontFamily: 'Helvetica',
    },
    bold: {
        fontWeight: "bold",
        color: '#8c8c8c',
        fontSize: 14,
    },

    deconnectButton: {
        fontWeight: "bold",
        backgroundColor: '#670000',
        fontSize: 14,
        padding: 5,
        borderRadius: 5,
    },

    deconnectButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: 'HelveticaBold',
        color: '#9a9a9a',
    },



});

export default Account;
