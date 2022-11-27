import e from 'express'
import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController{
    static async apiPostReview(req, res, next){
        try{
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.body.review_id
            const review = req.body.review
            const userId = req.body.user_id
            
            const date = Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                review,
                userId,
                date
            )

            var { error } = ReviewResponse
            if(error){
                res.status.json({error})
            }
            if (ReviewResponse.modifiedCount===0){
                throw new Error("unable to update review. User may not be original poster")
            }
            res.status(200).json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = ReviewsDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}