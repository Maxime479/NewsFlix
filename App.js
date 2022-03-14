import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';


import MovieList from './src/pages/MovieList.js'
import DetailedMovie from "./src/pages/DetailedMovie.js";

import {LogBox} from 'react-native';
import MyList from "./src/pages/MyList";
import React from "react";
import NavBar from "./src/components/NavBar";
import firebase from "./database/firebase";
import Account from "./src/pages/Account";


import Search from "./src/pages/Search";
import storeToken from "./src/store/storeToken";
import register from "./src/account/register";
import connect from "./src/account/connect";



const Stack = createNativeStackNavigator();

//Composant pour afficher un titre personnalisé dans la barre de navigation
function CustomTitle() {
    return (
        <Text style={{color: '#ffffff', fontSize: 35, fontFamily: "BebasNeue",}}>NEWS<Text
            style={{color: '#ff0000'}}>FLIX</Text> </Text>
    );
}





export default function App() {


//Paramètres de la barre de navigation
    const homeNavOptions = {
        headerTitle: (props) => <CustomTitle {...props} />,
        // headerSearchBarOptions: {
        //     obscureBackground: true,
        //     autoFocus: false,
        //     autoCapitalize: 'none',
        //     barTintColor: '#6e6e6e',
        //     hideNavigationBar: false,
        //     placeholder: "Rechercher",
        //     textColor: '#fff',
        //     hintTextColor: '#fff',
        //     headerIconColor: '#c43434',
        //     shouldShowHintSearchIcon: true,
        //     // onChangeText: (event) => setSearch(event.nativeEvent.text),
        //     // onChangeText: (event) => searchData = event.nativeEvent.text,
        //     // onChangeText: () => navigation.navigate('Details', {movieData: this.state.movieData}),
        //     // onPress={() => navigation.navigate('Home')}
        //     headerTransparent: false,
        //     // onPress: () => alert("hellooo"),
        // },
        // headerSearchBarStyle: {
        //     backgroundColor: '#b61e1e',
        //     width: 100,
        //     height: 50,
        //     color: '#b61e1e',
        //     textColor: '#0c459a',
        // },
        animation: "none",
        headerLeft: () => null,
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


    //Arborescence de la navigation de l'App
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Log" component={LogScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={homeNavOptions}/>
                <Stack.Screen name="Search" component={SearchScreen} options={homeNavOptions}/>
                <Stack.Screen name="Details" component={DetailsScreen} options={detailsNavOptions}/>
                <Stack.Screen name="MyList" component={MyListScreen} options={homeNavOptions}/>
                <Stack.Screen name="Account" component={AccountScreen} options={homeNavOptions}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


//Page de lancement de l'App
function StartScreen({navigation}) {

    //Import des polices custom
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    //Vérification de l'existence du Token utilisateur
    checkTokenStore(navigation)


    return (
        <View style={startStyles.container}>


            <Text style={startStyles.mainTitle}>NEWS
                <Text style={{color: '#ff0000'}}>FLIX</Text>
            </Text>

            <Pressable style={startStyles.startButton} onPress={() => navigation.navigate('Log')}>
                <Text style={startStyles.textButton}>
                    Launch
                </Text>
            </Pressable>


            <StatusBar style="auto"/>
        </View>
    );

}

const startStyles = StyleSheet.create({
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




//Page de connexion au compte utilisateur
function LogScreen({navigation}) {

    const [login, onChangeLogin] = React.useState(null);

    const [password, onChangePassword] = React.useState(null);

    //Import des polices custom
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }



    return (

        <View style={accountStyles.container}>


            <Text style={accountStyles.mainTitle}>NEWS
                <Text style={{color: '#ff0000'}}>FLIX</Text>
            </Text>


            {/*Input nom d'utilisateur*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangeLogin(text)}
                value={login}
                placeholder="Nom d'utilisateur"
                keyboardType="default"
                placeholderTextColor='#989898'

                // For ANDROID
                autoComplete='username'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Input mot de passe*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangePassword(text)}
                value={password}
                placeholder="Mot de passe"
                keyboardType="visible-password"
                placeholderTextColor='#989898'
                secureTextEntry={true}

                // For ANDROID
                autoComplete='password'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Bouton pour se connecter*/}
            <Pressable style={accountStyles.logButton} onPress={() => connect(login, password, navigation)}>
                <Text style={accountStyles.textButton}>
                    Se connecter
                </Text>
            </Pressable>


            {/*Bouton pour se rendre à la page de connexion*/}
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={accountStyles.signUpText}>
                    Se créer un compte
                </Text>
            </Pressable>


            <StatusBar style="auto"/>
        </View>
    );

}

//Page de création du compte utilisateur
function RegisterScreen({navigation}) {

    const [mail, onChangeMail] = React.useState(null);
    const [login, onChangeLogin] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [passwordConf, onChangePasswordConf] = React.useState(null);

    //Import custom font
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }


    return (

        <View style={accountStyles.container}>


            <Text style={accountStyles.mainTitle}>NEWS
                <Text style={{color: '#ff0000'}}>FLIX</Text>
            </Text>


            {/*Input Mail*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangeMail(text)}
                value={mail}
                placeholder="Adresse mail"
                keyboardType="email-address"
                placeholderTextColor='#989898'

                // For ANDROID
                autoComplete='email'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Input nom d'utilisateur*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangeLogin(text)}
                value={login}
                placeholder="Nom d'utilisateur"
                keyboardType="default"
                placeholderTextColor='#989898'

                // For ANDROID
                autoComplete='username'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Input mot de passe*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangePassword(text)}
                value={password}
                placeholder="Mot de passe"
                keyboardType="visible-password"
                placeholderTextColor='#989898'
                secureTextEntry={true}

                // For ANDROID
                autoComplete='password'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Input confirmation de mot de passe*/}
            <TextInput
                style={accountStyles.input}
                onChangeText={text => onChangePasswordConf(text)}
                value={passwordConf}
                placeholder="Confirmation mot de passe"
                keyboardType="visible-password"
                placeholderTextColor='#989898'
                secureTextEntry={true}

                // For ANDROID
                autoComplete='password'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            {/*Bouton pour s'enregistrer*/}
            <Pressable style={accountStyles.logButton} onPress={() => register(mail, login, password, passwordConf, navigation)}>
                <Text style={accountStyles.textButton}>
                    Créer un compte
                </Text>
            </Pressable>


            {/*Bouton pour se rendre à la page de connexion*/}
            <Pressable onPress={() => navigation.navigate('Log')}>
                <Text style={accountStyles.signUpText}>
                    Se connecter
                </Text>
            </Pressable>


            <StatusBar style="auto"/>
        </View>
    );

}

const accountStyles = StyleSheet.create({


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


    input: {
        marginVertical: 10,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 60,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 10,
        fontFamily: "Helvetica",
        color: '#e7e7e7',
    },


    logButton: {
        marginTop: 30,
        backgroundColor: '#000000',
        borderRadius: 7,
        height: 55,
        width: '90%',
        borderWidth: 2,
        borderColor: "#939393",
        justifyContent: "center",
        alignItems: "center",
    },

    textButton: {
        color: '#e7e7e7',
        fontSize: 20,
        fontFamily: "Helvetica",
    },

    signUpText: {
        marginTop: 60,
        color: '#989898',
        fontSize: 15,
        fontFamily: "Helvetica",
    },


});




//Page d'Accueil
function HomeScreen({route, navigation}) {

    const {userId} = route.params
    const {userMail} = route.params


    return (

        <View style={homeStyles.body}>


            <MovieList
                navigation={navigation}
                userId={userId}
            />

            <NavBar
                navigation={navigation}
                userId={userId}
                userMail={userMail}
                selected={"home"}
            />


            <StatusBar style="auto"/>
        </View>


    );
}

const homeStyles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.63)',


    },

    buttonTemp: {
        backgroundColor: '#919191',
        width: 80,
    },

});



//Page de Recherche
function SearchScreen({route, navigation}) {

    const {userId} = route.params
    const {userMail} = route.params

    //useState stockant la recherche de l'utilisateur
    const [search, onChangeSearch] = React.useState(null)

    //masquage de la barre de navigation pendant la recherche
    const [opacity, onChangeFocus] = React.useState(null)

    return (

        <View style={searchStyles.body}>


            <TextInput
                style={searchStyles.input}
                onChangeText={text => onChangeSearch(text)}
                value={search}
                placeholder="Rechercher"
                keyboardType="default"
                placeholderTextColor='#989898'
                autoCapitalize="none"

                onFocus={() => onChangeFocus(0)}
                onEndEditing={() => onChangeFocus(1)}
                onSubmitEditing={() => onChangeFocus(1)}

                // For ANDROID
                autoComplete='off'

                // For IOS
                keyboardAppearance='dark'
                spellCheck={false}
                clearButtonMode='while-editing'
            />


            <Search
                navigation={navigation}
                userId={userId}
                search={search}
                opacity={opacity}
            />


            <NavBar
                navigation={navigation}
                userId={userId}
                userMail={userMail}
                selected={"search"}
                opacity={opacity}
            />


            <StatusBar style="auto"/>
        </View>


    );
}

const searchStyles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.63)',
        alignItems: "center",


    },

    buttonTemp: {
        backgroundColor: '#919191',
        width: 80,
    },


    input: {
        // flex: 1,
        // backgroundColor: '#232323',
        marginVertical: 20,
        backgroundColor: '#282828',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        fontSize: 18,
        borderRadius: 5,
        paddingLeft: 10,
        fontFamily: "Helvetica",
        color: '#e7e7e7',
    },


});



//Page d'affichage de la Liste des favoris de l'utilisateur
function MyListScreen({route, navigation}) {


    const {userId} = route.params
    const {userMail} = route.params


    return (

        <View style={homeStyles.body}>

            <MyList
                navigation={navigation}
                userId={userId}
            />


            <NavBar
                navigation={navigation}
                userId={userId}
                userMail={userMail}
                selected={"myList"}
            />

            <StatusBar style="auto"/>

        </View>


    );
}


//Page d'affichage de la Liste des favoris de l'utilisateur
function AccountScreen({route, navigation}) {


    const {userId} = route.params
    const {userMail} = route.params


    return (

        <View style={homeStyles.body}>

            <Account
                navigation={navigation}
                userId={userId}
                userMail={userMail}
            />


            <NavBar
                navigation={navigation}
                userId={userId}
                userMail={userMail}
                selected={"account"}
            />

            <StatusBar style="auto"/>

        </View>


    );
}


//Page de détails du film
function DetailsScreen({route, navigation}) {

    const {movieData} = route.params
    const {userId} = route.params

    return (


        <View style={homeStyles.body}>

            <DetailedMovie
                movieData={movieData}
                userId={userId}
            />

            <StatusBar style="auto"/>
        </View>


    );
}






LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['Require cycles are allowed'])





