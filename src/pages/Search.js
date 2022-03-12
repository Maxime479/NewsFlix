import {FlatList, StyleSheet, Text, View, ScrollView, RefreshControl, TextInput} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";


class Search extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    //Getting Datas
    componentDidMount() {

        this.setState({storedSearch: this.props.search})

        // let movie = 'spiderman'
        //
        // let searchLink = 'https://api.themoviedb.org/3/search/movie?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr&query=' + movie
        //
        // axios.get(searchLink).then((response) => {
        //     // console.log(response.data.results);
        //     this.setState({foundMovies: response.data.results});
        // });

    }




    searchMovieByName = (name) => {

        let searchLink = 'https://api.themoviedb.org/3/search/movie?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr&query=' + name

        axios.get(searchLink).then((response) => {
            // console.log(response.data.results);
            this.setState({foundMovies: response.data.results});
        });

    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.state.storedSearch !== this.props.search){
            this.searchMovieByName(this.props.search)
            this.setState({storedSearch: this.props.search})
        }
    }

    refresh = () => {
        this.setState({refreshing: true})

        setInterval(() => {
            this.setState({refreshing: false})
        }, 2000);
    }


    render() {


        if(this.props.search === null || this.state.foundMovies === undefined){

            return (
                <View style={styles.mainContainer}>

                        <Text style={styles.backText}>Votre recherche...</Text>

                </View>
            )


        }else{

            return (
                <View style={styles.mainContainer}>

                    {/*<ScrollView*/}
                    {/*    refreshControl={*/}
                    {/*        <RefreshControl*/}
                    {/*            refreshing={this.state.refreshing}*/}
                    {/*            onRefresh={() => this.refresh()}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*>*/}

                        {/*/!*Tendances actuelles*!/*/}
                        {/*<View style={styles.sectionContainer}>*/}

                            <FlatList
                                style={styles.list}
                                // horizontal={true}
                                numColumns={3}
                                data={this.state.foundMovies}
                                renderItem={({item}) => <Movie optionalPad={5} movieData={item} userId={this.props.userId} navigation={this.props.navigation} />}
                            />

                        {/*</View>*/}


                    {/*</ScrollView>*/}

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


});


export default Search;
