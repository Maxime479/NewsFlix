import {FlatList, StyleSheet, Text, View} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";


class Search extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    //Initialisation
    componentDidMount() {
        this.setState({storedSearch: this.props.search})
    }


    //Appel API pour récupérer les informations du film recherché
    searchMovieByName = (name) => {
        let searchLink = 'https://api.themoviedb.org/3/search/movie?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr&query=' + name

        axios.get(searchLink).then((response) => {
            this.setState({foundMovies: response.data.results});
        }).catch(error => {console.log("Erreur lors de la recherche de film par nom\nErreur : " + error)})
    }


    //À chaque lettre tapée par l'utilisateur, un nouvel appel API est lancé pour affiner la recherche
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.storedSearch !== this.props.search){
            this.searchMovieByName(this.props.search)
            this.setState({storedSearch: this.props.search})
        }
    }


    //Option de rafraichissement de la page
    refresh = () => {
        this.setState({refreshing: true})

        setTimeout(() => {
            this.setState({refreshing: false})
        }, 2000);
    }


    render() {

        let margin = '15%'

        if(this.props.opacity === 0){
            margin = 0
        }

        if(this.props.search === null || this.state.foundMovies === undefined){

            return (
                <View style={styles.mainContainer}>

                        <Text style={styles.backText}>Votre recherche...</Text>

                </View>
            )

        }else{

            return (
                <View style={styles.mainContainer}>

                    <FlatList
                        style={[styles.list, {marginBottom: margin}]}
                        numColumns={3}
                        data={this.state.foundMovies}
                        renderItem={({item}) => <Movie optionalPad={5} movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                    />

                </View>
            )

        }


    }
}



const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
    },

    sectionContainer: {
        marginVertical: 5,
    },

    sectionTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 5,
    },

    backText: {
        color: '#646464',
        fontSize: 20,
        fontFamily: 'HelveticaBold',
        marginBottom: 90,
        alignSelf: "center",
    },

    list: {
        flexGrow:0,
    }

})


export default Search;
