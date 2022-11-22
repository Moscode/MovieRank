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
}