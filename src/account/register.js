import firebase from "../../database/firebase";

//Fonction appelée pour enregistrer un nouvel utilisateur
function register(mailData, loginData, passwordData, passwordConfData, navigation) {


    // console.log('getDATA: ' + mailData + ' ' + loginData + ' ' + passwordData + ' ' + passwordConfData)
    let accountExist = false
    let userExist = false
    let passwordsMatch = false
    let registered = false
    let emptyField = false

    if (((mailData || loginData || passwordData || passwordConfData) === null) || (mailData || loginData || passwordData || passwordConfData) === " ") {
        alert("Certains champs sont vides")
        emptyField = true
        // console.log('emptyField' + emptyField)
        return
    }


    if (passwordData === passwordConfData) {
        passwordsMatch = true
    } else {
        alert("Confirmation de mot de passe incorrect")
        return
    }

    firebase.firestore().collection('users').get()
        .then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                const {mail} = doc.data()
                const {login} = doc.data()
                // console.log('DATA: ' + mail + ' ' + login)

                if (mailData === mail) {
                    accountExist = true
                    alert("Ce mail est déjà enregistré")
                    // console.log('accountExist:' + accountExist)
                    return
                }


                if (loginData === login) {
                    userExist = true
                    alert("Ce nom d'utilisateur est déjà pris")
                    // console.log('userExist' + userExist)
                    return
                }
            })

            if (accountExist === false) {
                if (userExist === false) {
                    if (passwordsMatch === true) {
                        if (emptyField === false) {
                            //REGISTER FUNCTION
                            firebase.firestore().collection('users').add({
                                mail: mailData,
                                login: loginData,
                                password: passwordData,
                                creatAt: firebase.firestore.FieldValue.serverTimestamp(),
                            })

                            registered = true
                            // console.log('registered' + registered)
                        }

                    }

                }
            }


        })
        .then(() => {

            if (registered === true) {
                firebase.firestore().collection('users').get()
                    .then(querySnapshot => {
                        querySnapshot.forEach((doc) => {
                            const {login} = doc.data()
                            const {password} = doc.data()
                            const id = doc.id

                            if (loginData === login) {
                                if (passwordData === password) {

                                    firebase.firestore().collection('users').doc(id).collection('likes').add({
                                        liked_movie_id: 414906,
                                    })


                                    navigation.navigate('Home', {userId: id})

                                }

                            }

                            // const str = "\n\nlogin : " + login + "\npassword: " + password + "\nid: " + id
                            // // alert(str)
                            // console.log(str)
                        })
                    })
            }

        }).catch(error => {console.log("Erreur lors de l'enregistrement du compte d'un nouvel utilisateur\nErreur : " + error)})
}

export default register;
