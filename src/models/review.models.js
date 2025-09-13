import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Review = mongoose.model('Review',reviewSchema)