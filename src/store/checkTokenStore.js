import getToken from "./getToken";



//Fonction appelé au lancement de l'apllication pour savoir si un Token existe et agir en fonction
async function checkTokenStore(navigation) {

    const userId = await getToken('id')
    const userMail = await getToken('mail')
        .then(() => {
            if (userId !== (null || undefined) && userMail !== (null || undefined)) {
                console.log('Utilisateur [' + userMail + ': ' + userId + '] déja logué')
                navigation.navigate('Home', {userId: userId, userMail: userMail})
            }
        })
}

export default checkTokenStore;
