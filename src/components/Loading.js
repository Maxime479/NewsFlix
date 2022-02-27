import {StyleSheet, Text, View} from "react-native";
import React from "react";
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';


class Loading extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
        }

    }



    render() {
            return(


                <View>
                    <AnimatedLoader
                        visible={true}
                        // overlayColor="rgba(255,255,255,0.75)"
                        overlayColor="rgba(255,255,255,0)"
                        animationStyle={styles.lottie}
                        speed={2}
                    >
                        <Text>Loading...</Text>
                    </AnimatedLoader>



                    {/*<LottieView*/}
                    {/*    // source={require('../path/to/animation.json')}*/}
                    {/*    source={{uri: 'https://assets5.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json'}}*/}
                    {/*    colorFilters={[*/}
                    {/*        {*/}
                    {/*            keypath: 'button',*/}
                    {/*            color: '#F00000',*/}
                    {/*        },*/}
                    {/*        {*/}
                    {/*            keypath: 'Sending Loader',*/}
                    {/*            color: '#F00000',*/}
                    {/*        },*/}
                    {/*    ]}*/}
                    {/*    autoPlay*/}
                    {/*    loop*/}
                    {/*/>*/}
                </View>
            )
    }
}



const styles = StyleSheet.create({

    lottie: {
        width: 100,
        height: 100,
    },

});




export default Loading;
