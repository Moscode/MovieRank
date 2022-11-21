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

}