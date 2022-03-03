import { StatusBar } from 'expo-status-bar';
import {Button, Linking, Pressable, StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';



import { useFonts } from 'expo-font';


import MovieList from './src/components/MovieList.js'
import DetailedMovie from "./src/components/DetailedMovie.js";
import {InfluxDB, Point} from "@influxdata/influxdb-client";

import { LogBox } from 'react-native';
import MyList from "./src/components/MyList";
import React from "react";
import NavBar from "./src/components/NavBar";





const Stack = createNativeStackNavigator();

function CustomTitle() {
    return (
        <Text style={{ color: '#ffffff', fontSize: 35, fontFamily: "BebasNeue", }}>NEWS<Text style={{ color: '#ff0000' }}>FLIX</Text> </Text>
    );
}

export default function App() {

    //Pour le paramètre onChangeText
    // const [search, setSearch] = React.useState('');
    let searchData = ""


    const homeNavOptions = {
        // headerTitle: (props) => <CustomTitle {...props} />,
        headerTitle: (props) => <CustomTitle {...props} />,
        headerSearchBarOptions: {
            obscureBackground: true,
            autoFocus: false,
            autoCapitalize: 'none',
            barTintColor: '#6e6e6e',
            hideNavigationBar: false,
            placeholder: "Rechercher",
            textColor: '#fff',
            hintTextColor: '#fff',
            headerIconColor: '#c43434',
            shouldShowHintSearchIcon: true,
            // onChangeText: (event) => setSearch(event.nativeEvent.text),
            // onChangeText: (event) => searchData = event.nativeEvent.text,
            // onChangeText: () => navigation.navigate('Details', {movieData: this.state.movieData}),
            // onPress={() => navigation.navigate('Home')}
            headerTransparent: false,
            onPress: () => alert("hellooo"),
        },
        headerSearchBarStyle: {
            backgroundColor: '#b61e1e',
            width: 100,
            height: 50,
            color: '#b61e1e',
            textColor: '#0c459a',
        },
        animation: "fade",
        headerLeft: ()=> null,
        headerBackVisible: false,
        headerStyle: {backgroundColor: '#000000'},
        headerTitleStyle: {
            fontWeight: 'bold',
            backgroundColor: '#1089d2',
            color: '#be9c10',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
    }

    const detailsNavOptions = {
        headerTitle: (props) => <CustomTitle {...props} />,
        animation: "flip",
        headerStyle: {backgroundColor: '#000000'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
    }


    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={HomeScreen} options={homeNavOptions} />
                <Stack.Screen name="Details" component={DetailsScreen} options={detailsNavOptions} />
                <Stack.Screen name="MyList" component={MyListScreen} options={homeNavOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}




function StartScreen({ navigation }) {


    //Import custom font
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    // const componentId = "1"
    // const statusBarHeight = 2


    return (
        <View style={styles.container}>


            <Text style={styles.mainTitle}>NEWS
                <Text style={{ color: '#ff0000' }}>FLIX</Text>
            </Text>

            <Pressable style={styles.startButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.textButton}>
                    Launch
                </Text>
            </Pressable>


            <StatusBar style="auto" />
        </View>
    );

}






function HomeScreen({ navigation }) {


    return (

            <View style={homeStyles.body}>

                    <MovieList
                        navigation={navigation}
                    />

                <NavBar
                    navigation={navigation}
                    selected={"home"}
                />


                <StatusBar style="auto" />
                {/*<StatusBar*/}
                {/*    animated={true}*/}
                {/*    barStyle="light-content"*/}
                {/*    // backgroundColor="#6a51ae"*/}
                {/*    backgroundColor="#000"*/}
                {/*    style="light"*/}
                {/*/>*/}
            </View>


    );
}


function MyListScreen({ navigation }) {
    return (

        <View style={homeStyles.body}>

            <MyList
                navigation={navigation}
            />


            <NavBar
                navigation={navigation}
                selected={"myList"}
            />

            <StatusBar style="auto" />

        </View>


    );
}


function DetailsScreen({ route, navigation }) {
    const {movieData} = route.params;
    console.log({dataReceived: movieData})
    return (


            <View style={homeStyles.body}>

                <DetailedMovie
                    movieData={movieData}
                />

                <StatusBar style="auto" />
            </View>


    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#232323',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 80,
    paddingBottom: 70,
    fontFamily: "BebasNeue",
  },

  startButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ff0000",
  },
  textButton: {
    color: '#ff0000',
    fontSize: 25,
      fontFamily: "Helvetica",
  },
});

const mainButtonStyle = StyleSheet.create({

    navBar: {
        backgroundColor: '#151515',
        width: '100%',
        height: '7%',
        // height: '17%',

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 40,

    },

    textButton: {
        color: '#fff',
        fontSize: 9,


    },






});


const homeStyles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.63)',


    },

});



LogBox.ignoreLogs(['Setting a timer for a long period of time'])





