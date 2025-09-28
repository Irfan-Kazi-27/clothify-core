import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    item:[{
        type:Schema.Types.ObjectId,
        ref:'Product',
        max:[20,"Cart Limit exceeds"]
    }],
    quantity:{
        type:Number,
        default:1
    },
    TotalPrice:{
        type:Number,
        default:0
    }

},{timestamps:true})

export const Cart = mongoose.model('Cart',cartSchema)

