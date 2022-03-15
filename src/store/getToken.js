import * as SecureStore from "expo-secure-store";


//Fonction servant à récupérer le Token
async function getToken() {
        let id

        try {
            id = await SecureStore.getItemAsync('userId')
            return id

        } catch (error) {
            // Error retrieving data
            console.log('Error while getting userId Token: ' + error)
        }

}

export default getToken;
