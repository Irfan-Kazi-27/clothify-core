import mongoose, { Schema } from "mongoose";


const userproductSchema = new mongoose.Schema({
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    }
})

const orderSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    products:[userproductSchema],
    totalamount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['']
    }
},{timestamps:true})