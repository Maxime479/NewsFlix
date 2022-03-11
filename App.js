import { StatusBar } from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

// import Icon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

import { useFonts } from 'expo-font';


import MovieList from './src/components/MovieList.js'
import DetailedMovie from "./src/components/DetailedMovie.js";

import { LogBox } from 'react-native';
import MyList from "./src/components/MyList";
import React from "react";
import NavBar from "./src/components/NavBar";
import firebase from "./database/firebase";
import Account from "./src/components/Account";




import * as SecureStore from 'expo-secure-store';



const Stack = createNativeStackNavigator();

function CustomTitle() {
    return (
        <Text style={{ color: '#ffffff', fontSize: 35, fontFamily: "BebasNeue", }}>NEWS<Text style={{ color: '#ff0000' }}>FLIX</Text> </Text>
    );
}



async function savePosition(navigation) {

    const userId = await getToken('id')
    const userMail = await getToken('mail')
        .then(() => {
            if(userId !== (null || undefined) && userMail !== (null || undefined)){
                console.log('Utilisateur [' + userMail + ': ' + userId + '] déja logué')
                navigation.navigate('Home', {userId: userId, userMail: userMail})
            }
        })
}





async function storeToken(userId, userMail){

    // await SecureStore.setItemAsync('secure_token','sahdkfjaskdflas$%^&')
    // const token = await SecureStore.getItemAsync('secure_token')
    // console.log(token); // output: sahdkfjaskdflas$%^&

    try {
        // await SecureStore.setItemAsync('secure_token','sahdkfjaskdflas$%^&')
        await SecureStore.setItemAsync('userId', userId)
        await SecureStore.setItemAsync('userMail', userMail)

    } catch (error) {
        // Error saving data
        console.log('Error while storing userId Token: ' + error)
    }
}

async function getToken(type){


    if(type === 'id'){
        let id

        try {
            id = await SecureStore.getItemAsync('userId')
            // console.log('Token [id] : ' + id);
            return id

        } catch (error) {
            // Error retrieving data
            console.log('Error while getting userId Token: ' + error)
        }



    }

    if(type === 'mail'){
        let mail

        try {
            mail = await SecureStore.getItemAsync('userMail')
            // console.log('Token [mail]: ' + mail)
            return mail

        } catch (error) {
            // Error retrieving data
            console.log('Error while getting userMail Token: ' + error)
        }



    }

    // let token
    // let id
    // let mail
    //
    // try {
    //     // token = await SecureStore.getItemAsync('secure_token')
    //     token = await SecureStore.getItemAsync('secure_token')
    //     console.log('Token : ' + token); // output: sahdkfjaskdflas$%^&
    //     return token
    //
    // } catch (error) {
    //     // Error retrieving data
    //     console.log('Error while getting userId Token: ' + error)
    // }
    //



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
                <Stack.Screen name="Log" component={LogScreen} options={{headerShown: false}} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
                <Stack.Screen name="Home" component={HomeScreen} options={homeNavOptions} />
                <Stack.Screen name="Details" component={DetailsScreen} options={detailsNavOptions} />
                <Stack.Screen name="MyList" component={MyListScreen} options={homeNavOptions} />
                <Stack.Screen name="Account" component={AccountScreen} options={homeNavOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}




function StartScreen({ navigation }) {



    // const [userData] = retrieveData()
    //     .then(() => {
    //         const id = userData[0]
    //         const mail = userData[1]
    //         if(!(id === null)){
    //             navigation.navigate('Home', {userId: id, userMail: mail})
    //         }
    //     })
    //

    //Import custom font
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }

    savePosition(navigation)


    // const componentId = "1"
    // const statusBarHeight = 2


    return (
        <View style={styles.container}>


            <Text style={styles.mainTitle}>NEWS
                <Text style={{ color: '#ff0000' }}>FLIX</Text>
            </Text>

            <Pressable style={styles.startButton} onPress={() => navigation.navigate('Log')}>
                <Text style={styles.textButton}>
                    Launch
                </Text>
            </Pressable>


            <StatusBar style="auto" />
        </View>
    );

}

// async function storeData(userId, userMail){
//     try {
//         await AsyncStorage.setItem(
//             '@mainStore:key',
//             userId
//         )
//
//         await AsyncStorage.setItem(
//             '@mainStore:mail',
//             userMail
//         )
//     } catch (error) {
//         // Error saving data
//     }
// }

// async function retrieveData(){
//     try {
//         const id = await AsyncStorage.getItem('@idStore:key');
//         const mail = await AsyncStorage.getItem('@idStore:mail');
//         if (id !== null) {
//
//             return [value, mail]
//             // We have data!!
//             // console.log(value);
//         }
//     } catch (error) {
//         // Error retrieving data
//     }
// }


function LogScreen({ navigation }) {

    const [login, onChangeLogin] = React.useState(null);

    const [password, onChangePassword] = React.useState(null);

    //Import custom font
    const [loaded] = useFonts({
        BebasNeue: require('./assets/fonts/BebasNeue/BebasNeue-Regular.otf'),
        Helvetica: require('./assets/fonts/Helvetica/Helvetica.ttf'),
        HelveticaBold: require('./assets/fonts/Helvetica/Helvetica-Bold.ttf'),
    });

    if (!loaded) {
        return null;
    }



    function connect(loginData, passwordData) {

        let connected = false
        let userCorrect = false

        firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const {login} = doc.data()
                    const {password} = doc.data()
                    const {mail} = doc.data()
                    const id = doc.id

                    if(loginData === login){
                        userCorrect = true
                        if(passwordData === password){


                            // storeData(id, mail).then(() => {
                            //     connected = true
                            //     navigation.navigate('Home', {userId: id, userMail: mail})
                            // })
                            //

                            storeToken(id, mail).then(() => {
                                connected = true
                                navigation.navigate('Home', {userId: id, userMail: mail})
                            })






                        }

                    }

                    // const str = "\n\nlogin : " + login + "\npassword: " + password + "\nid: " + id
                    // // alert(str)
                    // console.log(str)

                    // movielist.push({liked_movie_id});
                })
            })
            .then(() => {

                setTimeout(() => {
                    if(!connected){
                        if(userCorrect){
                            alert("Mot de passe invalide")
                        }else{
                            alert("Nom d'utilisateur invalide")
                        }
                    }
                    }, 500)



            })
    }



    return (

        <View style={logStyles.container}>


            <Text style={logStyles.mainTitle}>NEWS
                <Text style={{ color: '#ff0000' }}>FLIX</Text>
            </Text>




            <TextInput
                style={logStyles.input}
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

            <TextInput
                style={logStyles.input}
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

            <Pressable style={logStyles.logButton} onPress={() => connect(login, password)}>
                <Text style={logStyles.textButton}>
                    Se connecter
                </Text>
            </Pressable>



            <Pressable style={logStyles.registerButton} onPress={() => navigation.navigate('Register')}>
                <Text style={logStyles.registerText}>
                    Se créer un compte
                </Text>
            </Pressable>





            <StatusBar style="auto" />
        </View>
    );

}

const logStyles = StyleSheet.create({


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
        // flex: 1,
        // backgroundColor: '#232323',
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

    registerText: {
        marginTop: 60,
        color: '#989898',
        fontSize: 15,
        fontFamily: "Helvetica",
    },



});


function RegisterScreen({ navigation }) {

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


    function register(mailData, loginData, passwordData, passwordConfData) {


        // console.log('getDATA: ' + mailData + ' ' + loginData + ' ' + passwordData + ' ' + passwordConfData)

        let accountExist = false
        let userExist = false
        let passwordsMatch = false
        let registered = false
        let emptyField = false

        if(((mailData || loginData || passwordData || passwordConfData) === null) || (mailData || loginData || passwordData || passwordConfData) === " "){
            alert("Certains champs sont vides")
            emptyField = true
            // console.log('emptyField' + emptyField)
            return
        }


        if(passwordData === passwordConfData){
            passwordsMatch = true
        }else{
            alert("Confirmation de mot de passe incorrect")
            return
        }

        firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    const {mail} = doc.data()
                    const {login} = doc.data()
                    // console.log('DATA: ' + mail + ' ' + login)
                    // const id = doc.id

                    if(mailData === mail){
                        accountExist = true
                        alert("Ce mail est déjà enregistré")
                        // console.log('accountExist:' + accountExist)
                        return
                    }


                    if(loginData === login){
                        userExist = true
                        alert("Ce nom d'utilisateur est déjà pris")
                        // console.log('userExist' + userExist)
                        return
                    }
                })

                if(accountExist === false){
                    if(userExist === false){
                        if(passwordsMatch === true){
                            if(emptyField === false){
                                //REGISTER FUNCTION
                                firebase.firestore().collection('users').add({
                                    mail: mailData,
                                    login: loginData,
                                    password: passwordData
                                    // creatAt: firebase.firestore.FieldValue.serverTimestamp(),
                                })


                                registered = true
                                // console.log('registered' + registered)
                            }

                        }

                    }
                }





                })
            // .then(() => {
            //
            //     // if(accountExist){
            //     //     alert("Ce mail est déjà enregistré")
            //     // }else if(emptyField){
            //     //     alert("Certains champs sont vides")
            //     // }else if(userExist){
            //     //     alert("Ce nom d'utilisateur est déjà pris")
            //     // }else if(!passwordsMatch){
            //     //     alert("Confirmation de mot de passe incorrect")
            //     // }
            //
            //     // if((accountExist && userExist && !passwordsMatch && emptyField) === true){
            //     //     //REGISTER FUNCTION
            //     //     firebase.firestore().collection('users').add({
            //     //         mail: mailData,
            //     //         login: loginData,
            //     //         password: passwordData
            //     //         // creatAt: firebase.firestore.FieldValue.serverTimestamp(),
            //     //     })
            //     //
            //     //     registered = true
            //     //     console.log('registered' + registered)
            //
            //     }
            // })
            .then(() => {

                if(registered === true){
                    firebase.firestore().collection('users').get()
                        .then(querySnapshot => {
                            querySnapshot.forEach((doc) => {
                                const {login} = doc.data()
                                const {password} = doc.data()
                                const id = doc.id

                                if(loginData === login){
                                    if(passwordData === password){

                                        const likesId = Math.floor(Math.random() * 100) + 1 + 'dzaeq'

                                        firebase.firestore().collection('users').doc(id).collection('likes').add({
                                            liked_movie_id: 414906,
                                        })



                                        navigation.navigate('Home', {userId: id, userMail: mail})

                                    }

                                }

                                // const str = "\n\nlogin : " + login + "\npassword: " + password + "\nid: " + id
                                // // alert(str)
                                // console.log(str)
                            })
                        })
                }

            })
    }




    return (

        <View style={registerStyles.container}>


            <Text style={registerStyles.mainTitle}>NEWS
                <Text style={{ color: '#ff0000' }}>FLIX</Text>
            </Text>




            <TextInput
                style={registerStyles.input}
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
            <TextInput
                style={registerStyles.input}
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

            <TextInput
                style={registerStyles.input}
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

            <TextInput
                style={registerStyles.input}
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

            <Pressable style={registerStyles.logButton} onPress={() => register(mail, login, password, passwordConf)}>
                <Text style={registerStyles.textButton}>
                    Créer un compte
                </Text>
            </Pressable>



            <Pressable style={registerStyles.signUpButton} onPress={() => navigation.navigate('Log')}>
                <Text style={registerStyles.signUpText}>
                    Se connecter
                </Text>
            </Pressable>





            <StatusBar style="auto" />
        </View>
    );

}

const registerStyles = StyleSheet.create({


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
        // flex: 1,
        // backgroundColor: '#232323',
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








function HomeScreen({ route, navigation }) {

    const {userId} = route.params
    const {userMail} = route.params


    return (

            <View style={homeStyles.body}>


                {/*<Pressable style={homeStyles.buttonTemp} onPress={async () => {*/}

                {/*    const id = await getToken('id')*/}
                {/*    const mail = await getToken('mail')*/}

                {/*    setTimeout(() => {*/}
                {/*        console.log('Data_store: ' + id + ' / ' + mail)*/}
                {/*    }, 1000)*/}



                {/*}}>*/}
                {/*    <Text>*/}
                {/*        getToken*/}
                {/*    </Text>*/}
                {/*</Pressable>*/}


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


function MyListScreen({ route, navigation }) {


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

            <StatusBar style="auto" />

        </View>


    );
}


function AccountScreen({ route, navigation }) {


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

            <StatusBar style="auto" />

        </View>


    );
}


function DetailsScreen({ route, navigation }) {

    const {movieData} = route.params
    const {userId} = route.params

    console.log({dataReceived: movieData, userId})
    return (


            <View style={homeStyles.body}>

                <DetailedMovie
                    movieData={movieData}
                    userId={userId}
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

const homeStyles = StyleSheet.create({

    body: {
        flex: 1,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.63)',


    },

    buttonTemp : {
        backgroundColor: '#919191',
        width: 80,
    },

});



LogBox.ignoreLogs(['Setting a timer for a long period of time'])
LogBox.ignoreLogs(['Require cycles are allowed'])





