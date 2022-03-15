

//Trie les données pour ne garder que l'essentiel
function parseData (rawData) {

    let moviesData = []

    for(let i=0; i<rawData.length; i++){
        const id = rawData[i].id

        const title = rawData[i].title
        const release_date = rawData[i].release_date
        const overview = rawData[i].overview
        const vote_average = rawData[i].vote_average
        const backdrop_path = rawData[i].backdrop_path
        const poster_path = rawData[i].poster_path

        const movieData = {
            id,
            title,
            release_date,
            overview,
            vote_average,
            backdrop_path,
            poster_path,
        }

        moviesData.push(movieData)
    }

    return moviesData
}

export default parseData
