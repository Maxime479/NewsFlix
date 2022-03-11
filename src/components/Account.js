import {FlatList, StyleSheet, Text, View, RefreshControl, Pressable} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "./Movie";
import firebase from "../../database/firebase";
import Loading from "./Loading";


class Account extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

            userId: this.props.userId,
            userMail: this.props.userMail,
            likesPath: 'users/' + this.props.userId + '/likes',

            init: false,



        }
    }


    getAccountData = () => {
        let accountData = {}



        //Compressed
        const db = firebase.firestore()




        let getQuery = db.collection('users').where('mail', '==', this.props.userMail)

        getQuery.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.ref.delete()
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





        // db.collection(this.state.likesPath).add({
        //     liked_movie_id: id
        //     // creatAt: firebase.firestore.FieldValue.serverTimestamp(),
        // })






    }

    // //Getting Datas
    componentDidMount() {
        this.getAccountData()
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

                            <View style={[styles.sectionContainer, styles.startContainer]}>
                                    <Text style={styles.bold}>
                                        Mail
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.mail}
                                    </Text>
                            </View>



                            <View style={styles.sectionContainer}>
                                    <Text style={styles.bold}>
                                        Nom d'utilisateur
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.login}
                                    </Text>
                            </View>



                            <View style={[styles.sectionContainer, styles.endContainer]}>
                                    <Text style={styles.bold}>
                                        Mot de passe
                                    </Text>
                                    <Text style={styles.data}>
                                        {this.state.accountData.password}
                                    </Text>
                            </View>





                        </View>


                    <Pressable style={styles.deconnectButton} onPress={() => navigation.navigate('Log')}>
                        <Text style={styles.deconnectButtonText} >Déconnexion</Text>
                    </Pressable>




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
        // // paddingTop: 20,
        backgroundColor: '#0a0a0a',
        alignItems: "flex-start",
        justifyContent:"center",
        borderWidth: 1,
        borderColor: '#494949',
        width: '100%',
        // height: '60%',
        flexDirection: "column",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    dataContainer: {
        marginLeft: 10,
        marginVertical: 5,
        // paddingHorizontal: 20,
        // // paddingTop: 20,
        backgroundColor: '#0a0a0a',
        alignItems: "flex-start",
        borderRadius: 7,
        width: '90%',
        height: '60%',
    },
    title: {
        // paddingTop: 20,
        color: '#ffffff',
        fontSize: 25,
        // fontWeight: 'Black',
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 20,
    },
    data: {
        // paddingTop: 20,
        color: '#cbcbcb',
        fontSize: 17,
        // fontWeight: 'Black',
        fontFamily: 'Helvetica',
        // marginVertical: 15,
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
        // fontWeight: 'Black',
        fontFamily: 'HelveticaBold',
        color: '#9a9a9a',
    },



});


export default Account;
