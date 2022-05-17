import React from "react";
import {StyleSheet, Text, View, Pressable, TouchableHighlight, TextInput} from "react-native";

import firebase from "../../database/firebase";
import Loading from "../components/Loading";
import Icon from "react-native-vector-icons/Ionicons";


// import styles from "../styles/css/account.css";


class Account extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.userId,
            passIsHidden: true,
            likesPath: 'users/' + this.props.userId + '/likes',
            admin: false,

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
                    const {permission} = doc.data()

                    accountData = {
                        mail: mail,
                        login: login,
                        password: password,
                        permission: permission
                    }
                })
            }).then(()=> {this.setState({accountData: accountData})}).then(()=> {console.log(accountData)})
            .catch(error => {console.log("Erreur lors de la récupération des données utilisateur\nErreur : " + error)})
    }

    //  changeHidePass = () => {
    //     const eyeClearIcon = <Icon name="eye" size={23} color={"#808080"} />
    //     const eyeHiddenIcon = <Icon name="eye-off" size={23} color={"#7b7b7b"} />
    //
    //     // if(this.state.passIsHidden){
    //     //     this.setState({eyeIcon: eyeClearIcon})
    //     // }
    //     if(this.state.passIsHidden){
    //         this.setState({passIsHidden: false})
    //         return(eyeClearIcon)
    //     }else{
    //         this.setState({passIsHidden: true})
    //         return(eyeHiddenIcon)
    //     }
    // }



    render() {

        const eyeClearIcon = <Icon name="eye" size={23} color={"#808080"} />
        const eyeHiddenIcon = <Icon name="eye-off" size={23} color={"#7b7b7b"} />

        let eyeIcon = eyeHiddenIcon


        const {navigation} = this.props

        let adminCase = null


        function changeHidePass() {
            const eyeClearIcon = <Icon name="eye" size={23} color={"#808080"} />
            const eyeHiddenIcon = <Icon name="eye-off" size={23} color={"#7b7b7b"} />

            // if(this.state.passIsHidden){
            //     this.setState({eyeIcon: eyeClearIcon})
            // }
            console.log("HIDDENNNN")
            console.log(this.state)
            let hidden = this.state.passIsHidden
                .then(() => {
                    if(hidden){
                        this.setState({passIsHidden: false})
                        return eyeClearIcon
                    }else{
                        this.setState({passIsHidden: true})
                        return eyeHiddenIcon
                    }
                })

        }

        if(this.state.accountData === undefined){

            return (
                <View>
                    <Loading/>
                </View>
            )

        }else {

            if (this.state.accountData.permission === 1) {

                adminCase = <View style={[styles.monitoringContainer]}>
                    <View>
                        <Text style={styles.bold}>
                            Permission
                        </Text>
                        <Text style={styles.data}>
                            Administrateur
                        </Text>

                    </View>

                    <View style={[styles.miniContainer]}>
                        {/*Affichage permission admin*/}
                        <TouchableHighlight style={styles.monitoringButton}
                                            onPress={() => navigation.navigate('Monitoring', {userId: this.state.userId})}
                                            activeOpacity={0.6}
                                            underlayColor="#400000"
                        >
                            <Text style={styles.monitoringButtonText}>Monitoring</Text>
                        </TouchableHighlight>
                    </View>

                </View>

            }


                // let hiddenPass = ""
                //
                // for(let i=0; i<=)


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

                            {/*Affichage permission admin*/}
                            {adminCase}

                            {/*Affichage du mot de passe*/}
                            {/*<View style={[styles.sectionContainer, styles.endContainer]}>*/}
                            {/*    <Text style={styles.bold}>*/}
                            {/*        Mot de passe*/}
                            {/*    </Text>*/}
                            {/*    <TextInput secureTextEntry={false} style={styles.data}>*/}
                            {/*        {this.state.accountData.password}*/}
                            {/*    </TextInput>*/}
                            {/*</View>*/}


                            <View style={[styles.monitoringContainer, styles.endContainer]}>
                                <View>
                                    <Text style={styles.bold}>
                                        Mot de passe
                                    </Text>
                                    <TextInput secureTextEntry={this.state.passIsHidden} style={styles.data}>
                                        {this.state.accountData.password}
                                    </TextInput>
                                </View>

                                <View>
                                    {/*Affichage permission admin*/}
                                    <TouchableHighlight onPress={() => {
                                        eyeIcon = changeHidePass()
                                    }}>
                                        <Text><Text>
                                            {eyeIcon}
                                        </Text></Text>
                                    </TouchableHighlight>
                                </View>

                            </View>




                        </View>


                         {/*Bouton de déconnexion */}
                         <TouchableHighlight style={styles.deconnectButton}
                                             onPress={() => navigation.navigate('Log')}
                                             activeOpacity={0.6}
                                             underlayColor="#400000"
                                            >
                             <Text style={styles.deconnectButtonText}>Déconnexion</Text>
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


    monitoringContainer: {
        backgroundColor: '#0a0a0a',
        alignItems: "flex-end",
        justifyContent:"space-between",
        borderWidth: 1,
        borderColor: '#494949',
        width: '100%',
        flexDirection: "row",
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
        // backgroundColor: '#670000',
        fontSize: 14,
        padding: 5,
        borderRadius: 5,


        backgroundColor: '#000000',
        borderWidth: 0.5,
        borderColor: '#ff0000',
        elevation: 20,
        shadowColor: '#ff0000',
        // transform: [{ rotate: '180deg'}]
    },

    deconnectButtonText: {
        fontWeight: "bold",
        fontSize: 18,
        fontFamily: 'HelveticaBold',
        // color: '#9a9a9a',

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

    // monitoringButton: {
    //     fontWeight: "bold",
    //     backgroundColor: '#0a0a0a',
    //     borderWidth: 1,
    //     borderColor: '#353535',
    //     padding: 5,
    //     borderRadius: 5,
    //     alignSelf: "center",
    // },




});

export default Account;
