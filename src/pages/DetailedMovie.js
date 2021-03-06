import {Button, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe';
import React from "react";
import Loading from "../components/Loading.js";

import firebase from "../../database/firebase";

class DetailedMovie extends React.Component{

    constructor(props) {
        super(props);


        // this.docs = firebase.firestore().collection('likes')

        this.state = {

            isLoading: true,

            userId: this.props.userId,
            likesPath: 'users/' + this.props.userId + '/likes',

            buttonWidth: 40,

            validButton: <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.removeLikeFromFirebase(this.props.movieData.id)}
                style={styles.touchableOpacityStyle}>

                <Image
                    source={require('../../assets/icon/ValidButton.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>,


            plusButton: <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.addLikeToFirebase(this.props.movieData.id)}
                style={styles.touchableOpacityStyle}>
                <Image
                    source={require('../../assets/icon/PlusButton.png')}
                    style={styles.floatingButtonStyle}
                />
            </TouchableOpacity>,


            init: false,

            upFrame: <Image style={{height: '28%', width: '100%', alignSelf: 'center'}} source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path}} />,
            downFrame: <View/>,
            videoDisplayed: false,
            providersDisplayed: false,


            providerUnavailable: false,
            timePassed: false,

            numberOfLines: 3,
            buttonText: "plus",
            textHidden: true,
        }

        this.addLikeToFirebase = this.addLikeToFirebase.bind(this)
    }

    _isMounted = false;


    //Initialisation des donn??es
    componentDidMount() {
        this._isMounted = true;


        const like = this.isItLiked(this.props.movieData.id)

        this.setState({liked: like})

        const windowWidth = Dimensions.get('window').width;
        let imgWidth = windowWidth //100%
        if(imgWidth > 900){
            imgWidth = 900
        }
        let imgHeight = imgWidth/16*9//22%
        const image = <Image style={{height: imgHeight, width: imgWidth, alignSelf: 'center'}} source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path}} />

        this.setState({upFrame: image})

        const id = this.props.movieData.id;


        this.getRuntime(id)

        this.getProviders(id)

        this.getYtLink(id)


        //Modifie l'apparence du bouton de like en fonction du statut du film dans la base de donn??e
        if (!this.state.init) {
            this.changeButton(like)
            this.setState({init: true})
        }


        //Timer avant lequel la page ne doit pas ??tre affich??
        setTimeout(() => {
            this.setState({timePassed: true})


        }, 3000);
    }



    componentWillUnmount() {
        this._isMounted = false;
    }






    //Ajoute l'id du film dans la base de donn??e
    addLikeToFirebase = (id) => {
        this.changeButton(true)

        //Annule l'action si le film est d??j?? lik??
        if(this.state.liked){return}

        firebase.firestore().collection(this.state.likesPath).add({
            liked_movie_id: id
            // creatAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {this.setState({liked: true})})
            .catch(error => {console.log("Erreur lors de l'ajout du film ?? la liste sur la base de donn??e\nErreur : " + error)})
    }

    //Retire l'id du film de la base de donn??e
    removeLikeFromFirebase = (id) => {
        this.changeButton(false)

        //Annule l'action si le film n'est pas d??j?? lik??
        if(!this.state.liked){return}

        let deleteQuery = firebase.firestore().collection(this.state.likesPath).where('liked_movie_id', '==', id)

            deleteQuery.get()
                .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete().then(() => {this.setState({liked: false})})
                        .catch(error => {console.log("Erreur lors de la suppression du film de la liste sur la base de donn??e\nErreur : " + error)})
                })
            }).catch(error => {console.log("Erreur lors du parcours de la r??ponse de firebase dans la fonction removeLikeFromFirebase\nErreur : " + error)})
    }

    //Change l'apparence du bouton
    changeButton = (liked) => {
        if(liked){
            this.setState({floatingButton: this.state.validButton})
        }else{
            this.setState({floatingButton: this.state.plusButton})
        }
    }

    //V??rifie si le film est pr??sent dans la liste de likes de l'utilisateur
    isItLiked = (id) => {

        let movielist = [];
        let tempCheck = false;

        firebase.firestore().collection(this.state.likesPath).get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const {liked_movie_id} = doc.data()
                    movielist.push({liked_movie_id});
                })
            })
            .then(() => {
                for(let i = 0; i < movielist.length; i++) {
                    // Outil de d??bogage laiss?? en commentaire au cas o?? le bug des likes reviendrait
                    // const str = "[Check " + i + "] firebase={" + movielist[i].liked_movie_id + "} || app={" + id + "}"
                    // console.log(str)

                    if (movielist[i].liked_movie_id === id) {
                        // console.log("STOPPED")
                        this.setState({liked: true})
                        this.changeButton(true)
                        tempCheck = true
                        break
                    }
                }
            })
            .catch(error => {console.log("Erreur lors de la v??rification de la fonction isItLiked()\nErreur : " + error)})

        if(tempCheck === false){
            this.setState({liked: false})
        }

        return tempCheck
    }



    //R??cup??re le lien de la vid??o youtube du Trailer
    getYtLink = (id) => {
        const videoRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
        axios.get(videoRequestUrl).then((response) => {
            const allMovieTrailers = response.data.results

            //Trouve la vid??o en fran??ais
            for(let i=0; i<allMovieTrailers.length; i++){
                if(allMovieTrailers[i].name.includes("VF")){
                    this.setState({frenchTrailer: allMovieTrailers[i].key})
                    return
                }
            }
        }).then(() => {
            if(this.state.frenchTrailer === undefined && !this.state.providerUnavailable){
                this.setState({providerUnavailable: true})
            }
        }).then(() => {
            if (this._isMounted) {
                this.setState({isLoading: false})
            }
        }).catch(error => {console.log("Erreur lors de la r??cup??ration du lien de la vid??o\nErreur : " + error)})
    }

    //Action qui remplace l'image de fond par un youtube-iframe, ainsi la vid??o du trailer est lue
    showVideo = () => {

        if(this.state.providerUnavailable){
            return;
        }

        const imgPath = 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path

        const windowWidth = Dimensions.get('window').width;

        let marginLeft = 0


        let imgWidth = windowWidth //100%

        if(imgWidth > 900){
            imgWidth = 900
            marginLeft = (windowWidth - 900) / 2
        }
        let imgHeight = imgWidth/16*9//22%



        console.log({width: {width: imgWidth, height: imgHeight}})

        const image = <Image style={{height: imgHeight, width: imgWidth, alignSelf: 'center'}} source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movieData.backdrop_path}} />
        const video = <YoutubePlayer style={{marginLeft: marginLeft}} width={imgWidth} height={imgHeight} play={true} videoId={this.state.frenchTrailer} />

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




    //Modifie les donn??es brut pour afficher la dur??e du film sous le format HH/MM
    getRuntime = (id) => {

        const infoRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=ecf11955d7eae31ea3a9043b8c70e99a&language=fr'
        axios.get(infoRequestUrl).then((response) => {
            const strRuntime = response.data.runtime

            const runtime = Number(strRuntime)
            let min = runtime%60;
            let hour = (runtime - min)/60
            let final = hour + " h " + min + " min"

            this.setState({runtime: final})
        }).catch(error => {console.log("Erreur lors de la r??cup??ration de la dur??e du film\nErreur : " + error)})
    }


    //Affichage altern?? en version restreinte ou compl??te du synopsis
    showOverview = () => {
        if(this.state.textHidden){
            this.setState({numberOfLines: 0})
            this.setState({buttonWidth: 50})
            this.setState({buttonText: 'moins'})
            this.setState({textHidden: false})
        }else{
            this.setState({numberOfLines: 3})
            this.setState({buttonWidth: 40})
            this.setState({buttonText: 'plus'})
            this.setState({textHidden: true})
        }

    }



    //Appel API pour r??cup??rer les diff??rents services de streaming poss??dant le film
    getProviders = (id) => {
        const distribRequestUrl = 'https://api.themoviedb.org/3/movie/' + id + '/watch/providers?api_key=ecf11955d7eae31ea3a9043b8c70e99a'
        axios.get(distribRequestUrl).then((response) => {
            this.extractProviders(response.data.results)
        }).catch(error => {console.log("Erreur lors de la r??cup??ration des services de streaming\nErreur : " + error)})
    }

    //Trie la liste des services de streaming en prenant en priorit?? la liste France si elle est disponible
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
        }


        this.stackLogos(providers)
        this.setState({providersList: providers})
    }

    //Cr?? un composant qui regroupe tous les logos pour optimiser l'affichage en cas d'appui sur le bouton T??l??charger
    stackLogos = (providersList) => {

        let stackedLogos = []

        for(let i=0; i<providersList.length; i++){
            stackedLogos.push(<Image key={i} style={styles.distribLogo} source={{uri: 'https://image.tmdb.org/t/p/w500' + providersList[i].logo_path}} />)
        }

        this.setState({stackedLogos: stackedLogos})
    }

    //Affiche les diff??rents services de streaming poss??dant le film (bouton T??l??charger)
    showProviders = () => {

        const empty = <View/>
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




    render() {

        const movieData = this.props.movieData

        let date = movieData.release_date
        if(date !== undefined){
            date = date.slice(0, 4)
        }else{
            date = 'Unknown'
        }


        const playIcon = <Icon name="caretright" size={20} color="#000" />;
        const dlIcon = <Icon name="download" size={20} color="#fff" />;

            if((this.state.frenchTrailer || this.state.upFrame || this.state.providersList || this.state.stackedLogos ) === undefined && (!this.state.timePassed)){

                return (
                <View>
                    <Loading/>
                </View>
            )

        }else{


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
                                <Text style={styles.buttonIcon}>{dlIcon}</Text><Text style={styles.playText}>  T??l??charger</Text>
                            </Text>
                        </Pressable>


                        {/*Description*/}
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
                                style={[styles.plusButton, {width: this.state.buttonWidth}]}
                            >
                                <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                            </Pressable>
                        </View>

                        {/*Rotten Tomatoes Grade Score*/}
                        <Text style={styles.grade} >????  {movieData.vote_average}</Text>


                        {/*Providers*/}
                        <View style={styles.providersContainer} >
                            {this.state.downFrame}
                        </View>


                        {/*My List + button*/}
                            {this.state.floatingButton}

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
        backgroundColor: '#282828',
        borderRadius: 15,
        // backgroundColor: '#7c7c7c',
        color: '#d73333',
        // height: 18,
        height: 25,
        // width: 40,
        // width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: "bold",
    },
    overviewContainer: {
        color: '#ffffff',
        alignItems: "flex-start",
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
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",

    },


    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },

});


export default DetailedMovie;
