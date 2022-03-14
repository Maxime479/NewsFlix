import * as SecureStore from "expo-secure-store";


//Fonction servant à stocker un Token des données utilisateurs
async function storeToken(userId, userMail) {

    try {
        await SecureStore.setItemAsync('userId', userId)
        await SecureStore.setItemAsync('userMail', userMail)

    } catch (error) {
        // Error saving data
        console.log('Error while storing userId Token: ' + error)
    }
}

export default storeToken;
