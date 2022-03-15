import * as SecureStore from "expo-secure-store";


//Fonction servant à stocker un Token des données utilisateurs
async function storeToken(userId) {

    try {
        await SecureStore.setItemAsync('userId', userId)

    } catch (error) {
        // Error saving data
        console.log('Error while storing userId Token: ' + error)
    }
}

export default storeToken;
