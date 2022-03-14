import firebase from "../../database/firebase";
import storeToken from "../store/storeToken";


//Fonction appelée pour connecter un utilisateur existant
function connect(loginData, passwordData, navigation) {

    let connected = false
    let userCorrect = false

    firebase.firestore().collection('users').get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                const {login} = doc.data()
                const {password} = doc.data()
                const {mail} = doc.data()
                const id = doc.id

                if (loginData === login) {
                    userCorrect = true
                    if (passwordData === password) {

                        storeToken(id, mail).then(() => {
                            connected = true
                            navigation.navigate('Home', {userId: id, userMail: mail})
                        })
                    }

                }
                // const str = "\n\nlogin : " + login + "\npassword: " + password + "\nid: " + id
                // // alert(str)
                // console.log(str)
            })
        })
        .then(() => {

            setTimeout(() => {
                if (!connected) {
                    if (userCorrect) {
                        alert("Mot de passe invalide")
                    } else {
                        alert("Nom d'utilisateur invalide")
                    }
                }
            }, 500)


        })
}

export default connect;
