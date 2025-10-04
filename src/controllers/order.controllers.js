import { Order } from "../models/order.models.js";
import {Product} from  "../models/products.models.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { razorpayInstance } from "../utils/Razorpay.js";
import { isValidObjectId } from "mongoose";


const createOrder = asyncHandler(async (req,res) => {
    const Instance = razorpayInstance()
    const {productId} = req.body

    if (!isValidObjectId(productId)) {
        throw new ApiError(403,"Invalid Product Id")
    }

   const product = await Product.findById(productId)

   const productPrice = product.price
   if(!product){
        throw new ApiError(404,"Product Not Found")
    }
    
    const orderCreated= Instance.orders.create({
        "amount":productPrice*100,
        "currency": "INR",
        "receipt": "receipt#1"
    })
    
    const newOrder = await Order.create({
        user:req.user._id,
        products:product,
        totalamount:productPrice,
        Status
    })

    if (!newOrder) {
        throw new ApiError(501,"Server Error Order Not created")
    }
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            newOrder,
            "order created Succesfully"
        )
    )
})



export {createOrder}