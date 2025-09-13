import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    item:[{
        type:Schema.Types.ObjectId,
        ref:'Product'
    }],

},{timestamps:true})

const Cart = mongoose.model('Cart',cartSchema)