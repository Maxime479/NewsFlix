import * as SecureStore from "expo-secure-store";


//Fonction servant à récupérer le Token
async function getToken(type) {
    if (type === 'id') {
        let id

        try {
            id = await SecureStore.getItemAsync('userId')
            return id

        } catch (error) {
            // Error retrieving data
            console.log('Error while getting userId Token: ' + error)
        }
    }

    if (type === 'mail') {
        let mail

        try {
            mail = await SecureStore.getItemAsync('userMail')
            return mail

        } catch (error) {
            // Error retrieving data
            console.log('Error while getting userMail Token: ' + error)
        }
    }
}

export default getToken;
