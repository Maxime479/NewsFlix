import {FlatList, StyleSheet, Text, View, RefreshControl, Pressable, TouchableOpacity} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";
import firebase from "../../database/firebase";
import Loading from "../components/Loading";
import parseData from "../api/parseData";


class MyList extends React.Component{

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
        this.getMyList()
    }


    //Récupération la liste de favoris de l'utilisateur
    getMyList = () => {
        let movieData = []

        let init = false

        firebase.firestore().collection(this.state.likesPath).get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {

                    //Récupération des informations pour chaque film trouvé
                    const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + doc.data().liked_movie_id + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
                    axios.get(infoRequestUrl).then((response) => {
                        if(!init){
                            movieData[0] = response.data
                            init = true
                        }else{
                            movieData.push(response.data)
                        }
                    }).then(() => {
                        this.setState({movieData: parseData(movieData)})
                    }).catch(error => {console.log("Erreur lors de l'enregistrement de la liste\nErreur : " + error)})
                })

            }).catch(error => {console.log("Erreur lors de la récupération de la liste\nErreur : " + error)})
    }


    //Option de rafraichissement de la page
    refresh = () => {
        this.setState({refreshing: true})

        setTimeout(() => {
            this.setState({refreshing: false})
            this.getMyList()
        }, 2000);
    }


    render() {
        if(this.state.movieData === undefined){

            return (
                <View>
                    <Loading/>
                </View>
            )
        }else {
            return (
                <View style={styles.mainContainer}>

                        {/*Tendances actuelles*/}
                        <View style={styles.sectionContainer}>

                            {/*<View style={styles.elevation}>*/}
                            {/*    <TouchableOpacity style={styles.button}>*/}
                            {/*        <Text style={styles.buttonText}>Hey</Text>*/}
                            {/*    </TouchableOpacity>*/}
                            {/*</View>*/}

                            <Text style={styles.sectionTitle}>Ma Liste</Text>

                            {/*Liste qui affiche le composant film à chaque itération d'objet de movieData*/}
                            <FlatList
                                style={styles.list}
                                numColumns={1000}
                                columnWrapperStyle={{ flexWrap: 'wrap', flex: 1, marginTop: 5, marginLeft: 10, flexGrow: 1, justifyContent: 'center'}}
                                data={this.state.movieData}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={() => this.refresh()}
                                    />
                                }
                                renderItem={({item}) => <Movie optionalPad={5} userId={this.props.userId} movieData={item} navigation={this.props.navigation} />}
                            />

                        </View>

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
    },

    sectionContainer: {
        marginVertical: 5,
        alignItems: "center",
    },

    sectionTitle: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 5,
        // textShadowColor: '#03e9f4',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 15,

    },

    list: {
        marginBottom: '30%',
    },

    // button: {
    //     backgroundColor: '#e4e0e0',
    //     // shadowColor: '#03e9f4',
    //     shadowOffset: {width: -1, height: 1},
    //     shadowRadius: 15,
    //     shadowOpacity: 1,
    // },
    // elevation: {
    //     backgroundColor: '#955b5b',
    //     elevation: 20,
    //     shadowColor: '#03e9f4',
    //     padding: 15,
    //     borderRadius: 10
    // },
    //
    // buttonText: {
    //     // textShadowColor: '#03e9f4',
    //     // textShadowOffset: {width: -1, height: 1},
    //     // textShadowRadius: 15,
    //     fontSize: 25,
    // }


});


export default MyList;
