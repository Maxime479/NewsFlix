import getToken from "./getToken";

//Fonction appelé au lancement de l'apllication pour savoir si un Token existe et agir en fonction
async function checkTokenStore(navigation) {

    const userId = await getToken()
        .then(() => {
            if (userId !== (null || undefined)) {
                console.log('Utilisateur [' + userId + '] déja logué')
                navigation.navigate('Home', {userId: userId})
            }
        })
}

export default checkTokenStore;
