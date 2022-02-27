import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';
import AnimatedLoader from "react-native-animated-loader";
import React from "react";
import Loading from "./Loading.js";


class DetailedMovie extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            // posterUrl: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path,
            upFrame: <Image style={styles.moviePoster} source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path}} />,
            downFrame: <View></View>,
            videoDisplayed: false,
            providersDisplayed: false,


            visible: false,
            providerUnavailable: false,
            timePassed: false,

            numberOfLines: 3,
            buttonText: "plus",
            textHidden: true,
        }

        this.showOverview = this.showOverview.bind(this)
    }

    // //Getting Datas
    componentDidMount() {
        this.setState({movieData: this.props.movieData})
        const id = this.props.movieData.id;

        // GET date from detailed movie data
        const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
        axios.get(infoRequestUrl).then((response) => {
            // console.log(response.data);
            this.getRuntime(response.data.runtime)
        });

        // GET accessible providers
        const distribRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=ecf11955d7eae31ea3a9043b8c70e99a'
        axios.get(distribRequestUrl).then((response) => {


            // console.log({distrib: response.data.results});
            this.extractProviders(response.data.results)
            // console.log('Hello');
            // this.getRuntime(response.data.runtime)
        });

        // GET yt trailer link
        const videoRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
        axios.get(videoRequestUrl).then((response) => {
            // console.log(response.data.results);
            this.setState({movieVideos: response.data.results});
            this.getTrailer(response.data.results)
        });








        setInterval(() => {
            this.setState({
                visible: !this.state.visible
            });
        }, 2000);


        setInterval( () => {
            this.setTimePassed();
        },3000);


    }

    setTimePassed() {
        this.setState({timePassed: true});
    }

    getTrailer = (movieVideos) => {

        let frenchTrailer;
        let ytBaseUrl = 'https://www.youtube.com/watch?v='

        for(let i=0; i<movieVideos.length; i++){
            if(movieVideos[i].name.includes("VF")){
                // frenchTrailer = ytBaseUrl + movieVideos[i].key
                // this.setState({frenchTrailer: frenchTrailer})
                const key = movieVideos[i].key
                const slicedKey = key.slice(1, key.length)
                this.setState({frenchTrailer: key})
                // console.log({key: key})
                // console.log({slicedKey: slicedKey})
                return
            }
        }
    }

    getRuntime = (strRuntime) => {
        const runtime = Number(strRuntime)
        let min = runtime%60;
        let hour = (runtime - min)/60
        let final = hour + " h " + min + " min"

        this.setState({runtime: final})
        console.log({duration: final})
    }


    showVideo = () => {

        if(this.state.providerUnavailable){
            return;
        }

        const image = <Image style={styles.moviePoster} source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path}} />
        const video = <YoutubePlayer height={'28%'} play={true} videoId={this.state.frenchTrailer} />

        let toSet

        if(this.state.videoDisplayed){
            toSet = image
            this.setState({videoDisplayed: false})
        }else{
            toSet = video
            this.setState({videoDisplayed: true})
        }

        this.setState({upFrame: toSet})
    }

    showProviders = () => {

        const empty = <View></View>
        const providers = this.state.stackedLogos

        let toSet

        if(this.state.providersDisplayed){
            toSet = empty
            this.setState({providersDisplayed: false})
        }else{
            toSet = providers
            this.setState({providersDisplayed: true})
        }

        this.setState({downFrame: toSet})
    }

    extractProviders = (providersData) => {

        let list, providers
        let listFound = false

        if(providersData.FR !== undefined && !listFound){
            list = providersData.FR
            listFound = true
        }

        if(providersData.BE !== undefined && !listFound){
            list = providersData.BE
            listFound = true
        }

        if(providersData.CA !== undefined && !listFound){
            list = providersData.CA
            listFound = true
        }

        if(providersData.CH !== undefined && !listFound){
            list = providersData.CH
            listFound = true
        }

        if(providersData.GB !== undefined && !listFound){
            list = providersData.GB
            listFound = true
        }

        if(providersData.US !== undefined && !listFound){
            list = providersData.US
            listFound = true
        }

        if(!listFound){
            list = providersData[Object.keys(providersData)[0]]
            listFound = true
        }



        let providerFound = false


        if(list.flatrate !== undefined && !providerFound){
            providers = list.flatrate
            providerFound = true
        }

        if(list.buy !== undefined && !providerFound){
            providers = list.buy
            providerFound = true
        }

        if(!providerFound){
            providers = list.rent
            providerFound = true
        }






        // console.log({LIST: list})
        // console.log({PROVIDER: providers})

        this.stackLogos(providers)
        // console.log({PROV: providers})

        this.setState({providersList: providers})

    }


    stackLogos = (providersList) => {

        let stackedLogos = []

        // let inn = <View> <Image style={styles.distribLogo} source={{uri: 'https://image.tmdb.org/t/p/w500' + providersList[i].logo_path}} /> <Text>providersList[i].provider_name</Text></View>

        for(let i=0; i<providersList.length; i++){
            stackedLogos.push(<Image style={styles.distribLogo} source={{uri: 'https://image.tmdb.org/t/p/w500' + providersList[i].logo_path}} />)
            // stackedLogos.push( <View> <Image style={styles.distribLogo} source={{uri: 'https://image.tmdb.org/t/p/w500' + providersList[i].logo_path}} /> <Text>providersList[i].provider_name</Text></View>)
        }

        this.setState({stackedLogos: stackedLogos})
    }

    showOverview = () => {
        if(this.state.textHidden){
            this.setState({numberOfLines: 0})
            this.setState({buttonText: 'moins'})
            this.setState({textHidden: false})
        }else{
            this.setState({numberOfLines: 3})
            this.setState({buttonText: 'plus'})
            this.setState({textHidden: true})
        }

    }




    render() {

        const movieData = this.props.movieData
        // const posterUrl = 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path
        const date = movieData.release_date.slice(0, 4)

        const playIcon = <Icon name="caretright" size={20} color="#000" />;
        const dlIcon = <Icon name="download" size={20} color="#fff" />;

        if((this.state.frenchTrailer === undefined || this.state.upFrame === undefined || this.state.providersList === undefined || this.state.stackedLogos === undefined) && (!this.state.timePassed)){

            const { visible } = this.state;
            // console.log({trailer: this.state.frenchTrailer, frame: this.state.upFrame, provider: this.state.providersList})

            return (
                <View>
                    <Loading/>
                </View>
            )
        }else{

            if(this.state.frenchTrailer === undefined && !this.state.providerUnavailable){
                this.setState({providerUnavailable: true})
            }


            return (
                <View style={styles.mainContainer}>
                    {/*<View style={styles.videoContainer}>*/}
                    {this.state.upFrame}
                    {/*</View>*/}


                    <View style={styles.body}>
                        <Text style={styles.title} >{movieData.title}</Text>


                        {/*Date + Runtime*/}
                        <View style={styles.subLine} >
                            <Text style={styles.year} >{date}    </Text>
                            <Text style={styles.duration} >{this.state.runtime}</Text>
                        </View>


                        {/*Play Button*/}
                        <Pressable style={styles.startButton}
                                   onPress={() => {
                                       this.showVideo()
                                   }}
                        >
                            <Text style={styles.startTextButton}>
                                <Text style={styles.buttonIcon}>{playIcon}</Text><Text style={styles.playText}>  Lecture</Text>
                            </Text>
                        </Pressable>
                        {/*Download Button*/}
                        <Pressable style={styles.dlButton}
                                   onPress={() => {
                                       this.showProviders()
                                   }}
                        >
                            <Text style={styles.dlTextButton}>
                                <Text style={styles.buttonIcon}>{dlIcon}</Text><Text style={styles.playText}>  Télécharger</Text>
                            </Text>
                        </Pressable>


                        {/*Description*/}
                        {/*{this.state.overviewComponent}*/}
                        <View style={styles.overviewContainer}>
                            <Text
                                style={styles.description}
                                numberOfLines={this.state.numberOfLines}
                                // ellipsizeMode={'tail'}
                            >
                                {this.props.movieData.overview}
                                {/*<Pressable style={styles.pressable} onPress={() => (this.showOverview())}>*/}
                                {/*    <Text style={styles.bold} >*/}
                                {/*        plus*/}
                                {/*    </Text>*/}

                                {/*</Pressable>*/}
                            </Text>

                            <Pressable
                                onPress={() => this.showOverview()}
                                style={styles.plusButton}
                            >
                                <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                            </Pressable>
                        </View>

                        {/*Rotten Tomatoes Grade Score*/}
                        <Text style={styles.grade} >🍅  {movieData.vote_average}</Text>


                        {/*Providers*/}
                        <View style={styles.providersContainer} >
                            {this.state.downFrame}
                        </View>



                    </View>
                </View>
            )
        }
    }
}



const styles = StyleSheet.create({

    bold: {
        fontFamily: 'HelveticaBold',
        color: '#ffffff',
        flex: 1,
        // paddingBottom: 2,
    },

    plusButton: {
        // backgroundColor: '#7c7c7c',
        color: '#d73333',
        height: 18,
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: "bold",
    },
    overviewContainer: {
        // backgroundColor: '#606060',
        color: '#ffffff',
        flexDirection: "row",
        // justifyContent: "flex-end",
        alignItems: "flex-end",
    },


    pressable: {
        paddingTop: -7,
        backgroundColor: '#888888',
        flex: 1,
        height: 12,
        justifyContent: 'flex-start',
    },




    video: {
        width: '100%',
        height: '100%',

    },

    moviePoster: {
        width: '100%',
        height: '22%',
    },

    distribLogo: {
        width: 40,
        height: 40,
        margin: 20,
        borderRadius: 50,
    },


    mainContainer: {
        backgroundColor: '#000000',
        width: '100%',
        height: '100%',
    },

    videoContainer: {
        backgroundColor: '#8d620a',
        width: '100%',
        height: '22%',
    },

    body: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 10,
        // alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        alignItems: "flex-start",
    },

    startButton: {
        marginVertical: 10,
        width: '100%',
        height: '7%',
        backgroundColor: '#ffffff',
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    buttonIcon: {
        fontSize: 24,
        fontFamily: 'Roboto',
    },
    playText: {
        // marginBottom: 25,

    },
    startTextButton: {
        color: '#000000',
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: 'Helvetica',
    },

    dlButton: {
        width: '100%',
        height: '7%',
        backgroundColor: '#282828',
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    dlTextButton: {
        color: '#ffffff',
        fontSize: 17,
        // fontWeight: "bold",
        fontFamily: 'Helvetica',
    },


    title: {
        marginVertical: 10,
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Helvetica',
        fontWeight: "bold",
    },
    subLine: {
        flexDirection: "row",
        width: '100%',
        height: 20,
        // marginHorizontal: 20,
    },
    year: {
        color: '#989898',
        fontSize: 17,
        fontFamily: 'Helvetica',
    },
    duration: {
        color: '#989898',
        fontSize: 17,
        fontFamily: 'Helvetica',
    },
    description: {
        marginVertical: 10,
        color: '#e0e0e0',
        fontSize: 15,
        fontFamily: 'Helvetica',
    },
    grade: {
        color: '#e0dad1',
        fontSize: 14,
        fontFamily: 'Helvetica',
    },


    providersContainer: {
        // backgroundColor: '#000000',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",

    },

});


export default DetailedMovie;
