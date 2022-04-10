import {StyleSheet, Text, View} from "react-native";
import React from "react";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';

//Affiche une animations de chargement en attendant que la page génère tous les composants
class Loading extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            loadingLimitTime: 10000,
            stopLoading: false,
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({stopLoading: true})
        }, this.state.loadingLimitTime);
    }



    render() {

        //Au bout de 10 secondes, si le composant n'est pas chargé on affiche un message d'erreur pour ne pas bloquer l'utilisateur
        if(this.state.stopLoading){

            return(
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Erreur lors du chargement.. 😥</Text>
                </View>
            )

        }else{
            return(

                <View style={styles.back}>


                    {/*<AnimatedLoader*/}
                    {/*    visible={true}*/}
                    {/*    // overlayColor="rgba(255,255,255,0.75)"*/}
                    {/*    overlayColor="rgba(255,255,255,0)"*/}
                    {/*    animationStyle={styles.lottie}*/}
                    {/*    speed={2}*/}
                    {/*>*/}
                    {/*    <Text>Loading...</Text>*/}
                    {/*</AnimatedLoader>*/}


                    {/*<LottieView*/}
                    {/*    // source={require('../path/to/animation.json')}*/}
                    {/*    source={{uri: 'https://assets5.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json'}}*/}
                    {/*    // colorFilters={[*/}
                    {/*    //     {*/}
                    {/*    //         keypath: 'button',*/}
                    {/*    //         color: '#F00000',*/}
                    {/*    //     },*/}
                    {/*    //     {*/}
                    {/*    //         keypath: 'Sending Loader',*/}
                    {/*    //         color: '#F00000',*/}
                    {/*    //     },*/}
                    {/*    // ]}*/}
                    {/*    autoPlay*/}
                    {/*    loop*/}
                    {/*/>*/}


                    <LottieView source={require('../animations/loading_circle.json')} autoPlay />



                </View>
            )
        }
    }
}

const styles = StyleSheet.create({

    back :{
        // backgroundColor: '#545454',
        width: '100%',
        height: '90%',

    },

    lottie: {
        width: 100,
        height: 100,
    },

    errorContainer : {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',

    },

    errorText : {
        marginBottom: 130,
        color: '#fff',
        fontFamily: "Roboto",
        fontSize: 20,

    },

})


export default Loading;
