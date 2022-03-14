import {FlatList, StyleSheet, Text, View, RefreshControl} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "../components/Movie";
import firebase from "../../database/firebase";
import Loading from "../components/Loading";


class MyList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

            userId: this.props.userId,
            likesPath: 'users/' + this.props.userId + '/likes',

            init: false,



        }
    }


    getMyList = () => {
        let movieData = []

        let init = false

        //Compressed
        firebase.firestore().collection(this.state.likesPath).get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {

                    const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + doc.data().liked_movie_id + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
                    axios.get(infoRequestUrl).then((response) => {
                        if(!init){
                            movieData[0] = response.data
                            init = true
                        }else{
                            movieData.push(response.data)
                        }
                    }).then(() => {
                        this.setState({movieData: movieData})
                    })
                })

            })
    }

    // //Getting Datas
    componentDidMount() {
        this.getMyList()
    }



    refresh = () => {
        this.setState({refreshing: true})

        setInterval(() => {
            this.setState({refreshing: false})
        }, 2000);


    }


    render() {

        // const wait = (timeout) => {
        //     return new Promise(resolve => setTimeout(resolve, timeout));
        // }
        //
        //
        // const [refreshing, setRefreshing] = React.useState(false);
        //
        // const onRefresh = React.useCallback(() => {
        //     setRefreshing(true);
        //     wait(2000).then(() => setRefreshing(false));
        // }, []);


        if(this.state.movieData === undefined){

            const { visible } = this.state;
            // console.log({trailer: this.state.frenchTrailer, frame: this.state.upFrame, provider: this.state.providersList})

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

                            <Text style={styles.sectionTitle}>Ma Liste</Text>

                            <FlatList
                                style={styles.list}
                                // horizontal={true}
                                numColumns={1000}
                                // keyExtractor={(item, index) => index}
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
        justifyContent: "flex-start",
        // backgroundColor: '#c41616',
    },

    sectionContainer: {
        // marginLeft: 10,
        marginVertical: 5,
        // // paddingTop: 20,
        // backgroundColor: '#381818',
        alignItems: "center",
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
        fontSize: 25,
        // fontWeight: 'Black',
        fontFamily: 'HelveticaBold',
        marginTop: 10,
        marginBottom: 5,
    },
    list: {
        marginBottom: '30%',
        // paddingTop: 20,
        // backgroundColor: '#c5c5c5',
        // flex: 1,
        // width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        // alignContent: 'space-around',
        // flexWrap: 'wrap',
        // padding: 20,
        // flexGrow:0,
    }


});


export default MyList;
