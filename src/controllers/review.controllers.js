import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Review } from "../models/review.models.js"
import { Product } from "../models/products.models.js"
import { isValidObjectId } from "mongoose"

const AddReview = asyncHandler(async (req,res) => {
    //get the User id from the req.user
    const userId = req.user._id
    //get the productId on which You want to add review
    const {productId} = req.params
    
    if (!isValidObjectId(productId)) {
        throw new ApiError(404,"Invalid Product id")
    }

    const product = await Product.findById(productId)
    if (!product) {
        throw new ApiError(404,"Product Not Found")
    }
    
    //get the rating out of 5 from the
    //add the Comment On the Product Review
    const {rating,comment} = req.body
    if (!rating || !comment) {
        throw new ApiError(402,"rating and comment Both required")
    }
    if (rating>5) {
        throw new ApiError(403,"Cannot rate more than 5")
    }

    //check if the User Already Review the product
    const alreadyreview = await Review.findOne({user:userId,product:productId})
    if(alreadyreview){
        throw new ApiError(403,"You have Already Review On this Product")
    }

    const freshreview = await Review.create({
        user:userId,
        product:productId,
        rating,
        comment
    })

    if (!freshreview) {
        throw new ApiError(400,"Problem in reviewing the Product")
    }
    //return the response
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            freshreview,
            "Review upload Successfully"
        )
    )
})


const EditReview = asyncHandler(async (req,res) => {
    //get the user Id 
    const userId = req.user._id
    //get the rating and comment from re.body
   const {rating,comment} = req.body


    if (!rating ||!comment) {
        throw new ApiError(403,"both the fields are Required")
    }

    if (rating>5) {
        throw new ApiError(403,"Cannot rate more than 5")
    }
   //get the Product id from req.params
   const {productId} = req.params
   if (!isValidObjectId(productId)) {
        throw new ApiError(403,"Invalid product id")
   }
   //check if the review exist if not then change throw error
   const existingreview = await Review.findOne({user:userId,product:productId})
   
   //if exist check the req.user user and database save user are 
   if (existingreview.user.toString() !== userId.toString()){
        throw new ApiError(403,"You can Only Edit Your Review")
    }
    //update the review
    const editedreview = await Review.findOneAndUpdate(
        {user:userId,product:productId,},
        {
            $set:{
                rating,
                comment
            }
        },
        {
            new:true
        }
    )
   //return the response
   return res
   .status(200)
   .json(
    new ApiResponse(
        200,
        editedreview,
        "Review Edited Successfully"
    )
   )
})

const DeleteReview = asyncHandler(async (req,res) => {

})

const getReviewOnAProduct = asyncHandler(async (req,res) => {
    
})

export {AddReview,EditReview,DeleteReview,getReviewOnAProduct}