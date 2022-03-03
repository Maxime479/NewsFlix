import {FlatList, StyleSheet, Text, View, ScrollView, RefreshControl} from "react-native";
import React from "react";
import axios from 'axios';
import Movie from "./Movie";
import firebase from "../../database/firebase";
import Loading from "./Loading";


class MyList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

            init: false,



        }
    }


    getMyList = () => {
        let movielist = [];
        let idList= []
        let movieData = []


        // firebase.firestore().collection('likes').get()
        //     .then(querySnapshot => {
        //         querySnapshot.forEach((doc) => {
        //
        //             const {liked_movie_id} = doc.data()
        //             movielist.push({
        //                 liked_movie_id})
        //
        //         })
        //
        //     })
        //     .then(() => {
        //         for(let i = 0; i < movielist.length; i++) {
        //             idList.push(movielist[i].liked_movie_id)
        //         }
        //       }
        //     ).then(() => {
        //
        //     for(let i=0; i<idList.length; i++){
        //         // let tempMovieData = this.state.movieData
        //
        //
        //         console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
        //
        //         // GET detailed movie data
        //         const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + idList[i] + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
        //         axios.get(infoRequestUrl).then((response) => {
        //             // console.log(response.data);
        //             movieData.push(response.data)
        //         })
        //         //     .then(() => {
        //         //     // console.log({MMMMMMMM: movieData})
        //         //     this.setState({movieData: tempMovieData})
        //         // })
        //     }
        //
        //
        // }).then(() => {
        //         this.setState({movieData: movieData})
        //         console.log({MMMMMMMM: movieData})
        //     console.log("tttttttttttttttttttttttttttttttttttt")
        //

        let i=0

        let init = false

        //Compressed
        firebase.firestore().collection('likes').get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {

                    const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + doc.data().liked_movie_id + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
                    axios.get(infoRequestUrl).then((response) => {
                        const src = "------------" + i + "------------------"
                        console.log({src});
                        console.log({RESPONSE: response.data});
                        console.log("------------------------------");

                        // let temp = []
                        if(!init){

                            // temp = response.data
                            movieData[0] = response.data
                            init = true


                        }else{
                            // temp = this.state.movieData
                            // temp.push(response.data)
                            movieData.push(response.data)
                        }

                        // movieData[i] = response.data
                        i++
                        // movieData[i] = response.data
                        // i++
                        // movieData.push(response.data)

                        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
                    }).then(() => {

                        // return movieData
                        this.setState({movieData: movieData})
                        console.log({FIIIIINNNNAAAALLLLL: movieData})

                    })



                    // const {liked_movie_id} = doc.data()
                    // movielist.push({
                    //     liked_movie_id})
                    //
                })

            })

        //     .then(() => {
        //         this.setState({movieData: movieData})
        //         console.log({MMMMMMMM: movieData})
        //     console.log("tttttttttttttttttttttttttttttttttttt")
        //
        //
        //
        //
        //
        // })
    }

    // //Getting Datas
    componentDidMount() {

        // this.setState({movieData: this.getMyList()})
        this.getMyList()

        // const mylist =  this.getMyList()
        //     .then(() => {console.log({MyList : mylist})})









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
                    {/*<ScrollView*/}
                    {/*    // contentContainerStyle={styles.scrollView}*/}
                    {/*    refreshControl={*/}
                    {/*        <RefreshControl*/}
                    {/*            refreshing={this.state.refreshing}*/}
                    {/*            onRefresh={() => this.refresh()}*/}
                    {/*        />*/}
                    {/*    }*/}
                    {/*>*/}

                        {/*Tendances actuelles*/}
                        <View style={styles.sectionContainer}>

                            <Text style={styles.sectionTitle}>Ma Liste</Text>

                            <FlatList
                                style={styles.list}
                                // horizontal={true}
                                numColumns={3}
                                data={this.state.movieData}
                                renderItem={({item}) => <Movie optionalPad={5} movieData={item} navigation={this.props.navigation} />}
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
        marginLeft: 10,
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
        // paddingTop: 20,
        // backgroundColor: '#c5c5c5',
        // flex: 1,
        // width: '100%',
        // height: '100%',
        // resizeMode: 'contain',
        // alignContent: 'space-around',
        // flexWrap: 'wrap',
        // padding: 20,
        flexGrow:0,
    }


});


export default MyList;
