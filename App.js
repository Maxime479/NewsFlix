import React from "react";

import {StatusBar} from 'expo-status-bar';
import {Pressable, Text, View, TextInput, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';


import MovieList from './src/pages/MovieList.js'
import Search from "./src/pages/Search";
import MyList from "./src/pages/MyList";
import Account from "./src/pages/Account";

import DetailedMovie from "./src/pages/DetailedMovie.js";
import NavBar from "./src/components/NavBar";

import register from "./src/account/register";
import connect from "./src/account/connect";
import checkTokenStore from "./src/store/checkTokenStore";

import startStyles from "./src/styles/startStyles";
import homeStyles from "./src/styles/homeStyles";
import searchStyles from "./src/styles/searchStyles";
import connectStyles from "./src/styles/connectStyles";




const Stack = createNativeStackNavigator()

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

        <View style={connectStyles.container}>


            <Text style={connectStyles.mainTitle}>NEWS
                <Text style={{color: '#ff0000'}}>FLIX</Text>
            </Text>


            {/*Input nom d'utilisateur*/}
            <TextInput
                style={connectStyles.input}
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
                style={connectStyles.input}
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
            <Pressable style={connectStyles.logButton} onPress={() => connect(login, password, navigation)}>
                <Text style={connectStyles.textButton}>
                    Se connecter
                </Text>
            </Pressable>


            {/*Bouton pour se rendre à la page de connexion*/}
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={connectStyles.signUpText}>
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

        <View style={connectStyles.container}>


            <Text style={connectStyles.mainTitle}>NEWS
                <Text style={{color: '#ff0000'}}>FLIX</Text>
            </Text>


            {/*Input Mail*/}
            <TextInput
                style={connectStyles.input}
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
                style={connectStyles.input}
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
                style={connectStyles.input}
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
                style={connectStyles.input}
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
            <Pressable style={connectStyles.logButton} onPress={() => register(mail, login, password, passwordConf, navigation)}>
                <Text style={connectStyles.textButton}>
                    Créer un compte
                </Text>
            </Pressable>


            {/*Bouton pour se rendre à la page de connexion*/}
            <Pressable onPress={() => navigation.navigate('Log')}>
                <Text style={connectStyles.signUpText}>
                    Se connecter
                </Text>
            </Pressable>


            <StatusBar style="auto"/>
        </View>
    );

}




//Page d'Accueil
function HomeScreen({route, navigation}) {

    const {userId} = route.params


    return (

        <View style={homeStyles.body}>


            <MovieList
                navigation={navigation}
                userId={userId}
            />

            <NavBar
                navigation={navigation}
                userId={userId}
                selected={"home"}
            />


            <StatusBar style="auto"/>
        </View>


    );
}


//Page de Recherche
function SearchScreen({route, navigation}) {

    const {userId} = route.params

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
                selected={"search"}
                opacity={opacity}
            />


            <StatusBar style="auto"/>
        </View>


    );
}


//Page d'affichage de la Liste des favoris de l'utilisateur
function MyListScreen({route, navigation}) {


    const {userId} = route.params


    return (

        <View style={homeStyles.body}>

            <MyList
                navigation={navigation}
                userId={userId}
            />


            <NavBar
                navigation={navigation}
                userId={userId}
                selected={"myList"}
            />

            <StatusBar style="auto"/>

        </View>


    );
}


//Page d'affichage des informations personnelles de l'utilisateur
function AccountScreen({route, navigation}) {


    const {userId} = route.params


    return (

        <View style={homeStyles.body}>

            <Account
                navigation={navigation}
                userId={userId}
            />


            <NavBar
                navigation={navigation}
                userId={userId}
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


    )
}


//Ignore l'erreur du timer lié à un conflit entre le setTimeout et la base de donnée Firebase
// Après plusieurs recherches sur des forums tout le monde semble ignorer cette erreur, car elle est liée à un conflit entre ces 2 éléments
LogBox.ignoreLogs(['Setting a timer for a long period of time'])





