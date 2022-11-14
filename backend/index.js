import app from './server'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

async function main(){
    dotenv.config()
    const client = new mongodb.MongoClient(
        process.env.MOVIERANK_DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    const port = process.env.PORT || 8000

    try {
        //Connect to the MongoDB cluster
        await client.connect()

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })
    } catch(e){
        console.log(e)
        process.exit(1)
    }
}

main().catch(console.error)