# Bienvenue sur NewsFlix !
 
NewsFlix est une application React Native construite à l'aide d'[Expo](https://www.expo.io). Elle a pour objectif de servir d'outil de recherche de données sur n'importe quel film.


## Tester l'application

> Prérequis : avoir Node.js installé sur le pc

Pour tester l'application à partir d'**Expo** directement :

 1. Ouvrir le projet dans un IDE
 2. Exécuter la commande `npm install`
 3. Exécuter la commande `expo start`
 4. Ouvrir la [console](http://localhost:19002) expo dans le navigateur
 5. Ouvrir l'application [expoGo](https://expo.dev/client)
 6. Flasher le QR code dans la console à partir de l'application
 7. L'application se lance   



Pour tester l'application en la **téléchargeant** : 
- Aller directement sur la page de téléchargement de [NewsFlix](http://newsflix.tk/download)

> Pour Android : télécharger simplement l'apk sur le smartphone   
> Pour IOS : télécharger le simulateur à lancer sur un émulateur XCode 





## Fonctionnalités de l'application

### Base de donnée
L'application utilise une base de données [Firebase](https://firebase.google.com/) pour stocker les données utilisateurs.

> Cela comprend les informations de connexions ainsi que la liste des films ajoutés à sa liste


### Connexion / Création de compte
Il est possible de créer un compte ou de se connecter au démarrage de l'application grâce aux informations stockées dans la base de données **Firebase**.



### Affichage des tendances
Après la connexion, la page `Accueil` est directement affichée. Sur cette page, différentes catégories sont affichées, tels que les **films à venir au cinéma** ou le **top 20 des films les mieux notés en France**.

### Recherche d'un film
Dans la barre de navigation, le bouton `Rechercher` permet de rechercher un film précis à partir de son nom.


### Ajout d'un film à sa liste
Il est possible d'ajouter (ou de retirer) un film à sa liste de favoris. L' **id** du film sera directement enregistré sur la base de données. On pourra ensuite consulter cette liste sur la page `Ma liste`.



### Affichage des détails du film
En cliquant sur une affiche de film, on obtient une vue détaillée des informations qui lui sont liées. On obtient donc :

 - le poster du film
 - le titre
 - l'année de sortie
 - la durée
 - le synopsis
 - la note du film sur Rotten Tomatoes 🍅

De plus, 2 fonctions supplémentaires sont disponibles:

 - le bouton `Lecture` remplace le poster du film par un Youtube-iframe qui affiche la bande-annonce du film
 - le bouton `Télécharger` affiche la liste des différents services de streaming sur lesquelles est disponible le film


### Affichage des détails du compte
Dans la barre de navigation, le bouton `Mon compte` permet de consulter les informations personnelles liées au compte tel que l'adresse mail, le nom d'utilisateur ou le mot de passe.




## Equivalents des composants/librairies Swift/React Native

Voici une liste de composants et des librairies équivalents entre Swift et React Native :

|                |Swift                          |React Native                         |
|----------------|-------------------------------|-----------------------------|
|vue Principale | UITableViewController           |FlatList            |
|vue Détail | UIViewController            |??           |
|liaison des vues         | Segue (Show) | React Navigation|
|??        | UIImage (Assets.xcassets) | ??|
|??        | XCUITest (api) | ??|
|stockage locales        | CoreData | ??|
