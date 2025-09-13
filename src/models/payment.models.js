import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number,
    },
    method:{
        type:String
    },
    status:{
        type:String,
        enum:['Pending','Completed','Falied']
    }
},{timestamps:true})

export const Payment = mongoose.model('Payment',paymentSchema)