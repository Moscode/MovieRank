import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return
        }
        try{
            reviews = await conn.db(process.env.MOVIERANK_DBN).collection("reviews")
        }
        catch(e){
            console.error(`unable to establish connection handle in reviewDAO:${e}`)
        }
    }

    static async addReview(movieId, userInfo, review, date){
        try{
            const reviewDoc = {
                name:userInfo.name,
                user_id:userInfo._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }
            return await reviews.insertOne(reviewDoc)
        }
        catch(e){
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }

    static async updateReview(reviewId, review, userId, date){
        try{
            const updateId = {
                user_id: userId,
                _id: ObjectId(reviewId),
            }
            const updateInfo = {
                review_info: review,
                date: date
            }
            const updateResponse = await review.updateOne(
                {
                    user_id: updateId.user_id,
                    _id: updateId._id
                },
                {$set:
                    {
                    review:updateInfo.review_info,
                    date: updateInfo.date
                    }
                }
            )
            return updateResponse
        }
        catch(e){
            console.error(`unable to connect to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId
            })
            return deleteResponse
        }
        catch(e){
            console.error(`unable to delete review: ${e}`)
            return {error: e}
        }
    }
}