import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:
    [
    {
        type:String
    }
    ],
    category:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Product = mongoose.model('Product',productSchema)