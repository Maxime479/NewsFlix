import {FlatList, StyleSheet, Text, View, ScrollView, RefreshControl} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import parseData from "../api/parseData";


class MovieList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }
    }


    //Appelle toutes les fonctions d'appel API
    getMultipleApiData = () => {
        this.getPopularMovies()
        this.getUpcomingMovies()
        this.getTopRatedMovies()
        this.getTopRatedFRMovies()
        this.getNowPlayingMovies()
    }




    //Récupère les films populaires actuellement
    getPopularMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`)
            .then((response) => { this.setState({popularMovies: parseData(response.data.results)}) })
    }

    //Récupère les films à venir bientôt
    getUpcomingMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`)
            .then((response) => { this.setState({upcomingMovies: parseData(response.data.results)}) })
    }

    //Récupère les films les mieux notés de tous
    getTopRatedMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`)
            .then((response) => { this.setState({topRatedMovies: parseData(response.data.results)}) })
    }

    //Récupère les films les mieux notés de tous en France
    getTopRatedFRMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr&region=FR`)
            .then((response) => { this.setState({topRatedFRMovies: parseData(response.data.results)}) })
    }

    //Récupère les films actuellement au cinéma
    getNowPlayingMovies = () => {
        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`)
            .then((response) => { this.setState({nowPlayingMovies: parseData(response.data.results)}) })
    }


    componentDidMount() {
        this.getMultipleApiData()
    }


    //Option de rafraichissement de la page
    refresh = () => {
        this.setState({refreshing: true})
        this.getMultipleApiData()

        setTimeout(() => {
            this.setState({refreshing: false})
        }, 2000);
    }



    render() {
        if((this.state.popularMovies || this.state.topRatedFRMovies || this.state.upcomingMovies || this.state.nowPlayingMovies || this.state.topRatedMovies ) === undefined){

            return (
                <View>
                    <Loading/>
                </View>
            )

        }else{

            return (
                <View style={styles.mainContainer}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing ={this.state.refreshing}
                                onRefresh={() => this.refresh()}
                            />
                        }
                    >

                        {/*Tendances actuelles*/}
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>Tendances actuelles</Text>

                            <FlatList
                                style={styles.list}
                                horizontal={true}
                                // numColumns={3}
                                data={this.state.popularMovies}
                                renderItem={({item}) => <Movie movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        </View>

                        {/*Top 20 en France*/}
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>Top 20 en France</Text>

                            <FlatList
                                style={styles.list}
                                horizontal={true}
                                // numColumns={3}
                                data={this.state.topRatedFRMovies}
                                renderItem={({item}) => <Movie movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        </View>

                        {/*À venir*/}
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>À venir</Text>

                            <FlatList
                                style={styles.list}
                                horizontal={true}
                                // numColumns={3}
                                data={this.state.upcomingMovies}
                                renderItem={({item}) => <Movie movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        </View>

                        {/*Actuellement en salle*/}
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>Actuellement en salle</Text>

                            <FlatList
                                style={styles.list}
                                horizontal={true}
                                // numColumns={3}
                                data={this.state.nowPlayingMovies}
                                renderItem={({item}) => <Movie movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        </View>

                        {/*Les mieux notés*/}
                        <View style={[styles.sectionContainer,{marginBottom: '17%'}]}>

                            <Text style={styles.sectionTitle}>Les mieux notés</Text>

                            <FlatList
                                style={styles.list}
                                horizontal={true}
                                // numColumns={3}
                                data={this.state.topRatedMovies}
                                renderItem={({item}) => <Movie movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        </View>


                    </ScrollView>

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
        marginLeft: 10,
        marginVertical: 5,
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 20,
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 5,
    },
    list: {
        flexGrow:0,
    }


});


export default MovieList;
