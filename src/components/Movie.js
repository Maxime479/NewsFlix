import {Image, StyleSheet, View, TouchableOpacity} from "react-native";
import React from "react";


class Movie extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

        }

    }



    componentDidMount() {

        const movieData = this.props.movieData
        // console.log({movieData: this.props.movieData})
        const poster = 'https://image.tmdb.org/t/p/w500' + this.props.movieData.poster_path
        this.setState({movieData: movieData})
        this.setState({posterUrl: poster})
    }





    render() {

        if(this.state.posterUrl === undefined){

            return (
                <View>
                </View>
            )
        }else {
            const {navigation} = this.props;
            return(

                <View style={[styles.filmContainer, {marginVertical: this.props.optionalPad}]}>

                    <TouchableOpacity onPress={() => navigation.navigate('Details', {movieData: this.state.movieData, userId: this.props.userId})}>
                        <Image
                            style={styles.moviePoster}
                            source={{uri: this.state.posterUrl}}
                        />
                    </TouchableOpacity>
                </View>

            )

        }
    }
}



const styles = StyleSheet.create({


    moviePoster: {
        // width: 120,
        // height: 178,
        width: 110,
        height: 150,
        borderRadius: 5,
        // marginHorizontal: 2,
    },
    filmContainer: {
        width: 120,
        // marginVertical: 7,
        marginHorizontal: -2,

    },

});




export default Movie;
