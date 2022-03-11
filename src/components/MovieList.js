import {FlatList, StyleSheet, Text, View, ScrollView, RefreshControl} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "./Movie";


class MovieList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    //Getting Datas
    componentDidMount() {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`).then((response) => {
            // console.log(response.data.results);
            this.setState({popularMovies: response.data.results});
        });

        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`).then((response) => {
            // console.log(response.data.results);
            this.setState({upcomingMovies: response.data.results});
        });

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`).then((response) => {
            // console.log(response.data.results);
            this.setState({topRatedMovies: response.data.results});
        });

        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr&region=FR`).then((response) => {
            // console.log(response.data.results);
            this.setState({topRatedFRMovies: response.data.results});
        });

        axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`).then((response) => {
            // console.log(response.data.results);
            this.setState({nowPlayingMovies: response.data.results});
        });

        // axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr`).then((response) => {
        //     console.log({ApiResult: response.data.results});
        //     this.setState({latestMovies: response.data.results});
        // });
    }

    refresh = () => {
        this.setState({refreshing: true})

        setInterval(() => {
            this.setState({refreshing: false})
        }, 2000);
    }


    render() {
        return (
                <View style={styles.mainContainer}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
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
                        <View style={styles.sectionContainer}>

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
            );
    }
}



const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "flex-start",
        // backgroundColor: '#c41616',
    },

    sectionContainer: {
        marginLeft: 10,
        marginVertical: 5,
        // paddingTop: 20,
        // backgroundColor: '#381818',
        // flex: 1,
        // width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        // alignContent: 'space-around',
        // flexWrap: 'wrap',
        // flexGrow:0,
    },
    sectionTitle: {
        // paddingTop: 20,
        color: '#ffffff',
        fontSize: 20,
        // fontWeight: 'Black',
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 5,
    },
    list: {
        // paddingTop: 20,
        // backgroundColor: '#c5c5c5',
        // flex: 1,
        // width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        // alignContent: 'space-around',
        // flexWrap: 'wrap',
        flexGrow:0,
    }


});


export default MovieList;
