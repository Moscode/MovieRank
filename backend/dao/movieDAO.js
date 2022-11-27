import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
// movies provides data reference to movies (database)
let movies

export default class MoviesDAO{
    static async injectDB(conn){
        // if reference already gotten just return
        if(movies){
            return
        }
        //else, get the reference to the movies form db
        try{
            movies = await conn.db(process.env.MOVIERANK_DBN).collection('movies')
        }
        catch(e){
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }
    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20 } = {}) {
        let query
        if (filters) {
            if("title" in filters){
                query = {$text: {$search: filters["title"]}}
            }else if("rated" in filters){
                query = {"rate": {$eq: filters["rated"]}}
            }
        }
        let cursor
        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)
            return { moviesList, totalNumMovies }
        }
        catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0 }
        }
    }

    static async getRatings(){
        let ratings = []
        try{
            ratings = await movies.distinct("rating")
            return ratings
        }
        catch(e){
            console.error(`unable to get ratings: ${e}`)
            return ratings
        }
    }
    static async getMovieById(id){
        try{
            return await movies.aggregate([
                {
                    $match:{
                        _id: new ObjectId(id),
                    }
                },
                {$lookup:{
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'movie_id',
                    as: 'reviews',
                }}
            ]).next()
        }
        catch(e){
            console.error(`something went wrong in the getMovieById: ${e}`)
            throw e
        }
    }
}