import { isValidObjectId } from "mongoose"
import {Cart} from "../models/cart.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const addItemToCart = asyncHandler(async (req,res) => {
   //product Id -> req.params
   //user Id -> req.user
   //check for the Fields
   //check for the Product is Already in Cart
   //create A Cart 
   //return the response   
    const {productId} = req.params
    const userId = req.user._id

   if (!isValidObjectId(productId)) {
    throw new ApiError(403,"Invalid product id ")
   }

   if (!userId) {
    throw new ApiError(403,"User not loggedIn ")
   }

   let productQuantity;
   let productPrice
   const product = await Cart.findById(productId)
   
   if (product) {
        productQuantity =(product.quantity += 1)
        productPrice = product.price * productQuantity
   }
   console.log(productQuantity);
   
   const productAddedTocart = await Cart.create({
        user:userId,
        item:productId,
        quantity:productQuantity,
        TotalPrice:productPrice
   })

   if (!productAddedTocart) {
        throw new ApiError(402,"Item Not added To cart")
   }

   return res
   .status(200)
   .json(
    new ApiResponse(
        200,
        productAddedTocart,
        "Product Added To cart Succesfully"
    )
   )
})

const removeItemfromCart = asyncHandler(async (req,res) => {
    //taking product Id from the request 
    const productId = req.params

    if (!isValidObjectId(productId)) {
          throw new ApiError(403,"Invalid Object Id")
     }
    //get the item from the cart
     const productFromCart = await Cart.findById(productId)
     //If the cart does not have product then Gave Product not their in the Cart 
     if (!productFromCart) {
          throw new ApiError(404,"Product is not In cart")
     }
    //if it is their and quantity is more then one then Remove them by 1 
    //if the quantity is 1 then remove the product From cart
     let deleteProductFromCart;
     if (productFromCart.quantity === 0){
          deleteProductFromCart = await Cart.findByIdAndDelete(productId)
     }else{
          productFromCart.quantity - 1
     }
     console.log(deleteProductFromCart);
     
    //return the response 
    return res
    .status(200)
    .json(
     new ApiResponse(
          200,
          deleteProductFromCart,
          "Product Remove Succesfully from the Cart"
     )
    )
})

const getUserCartList = asyncHandler(async (req,res) => {
     //get the User Id From the Requested User
     const UserId = req.user._id

     if (!UserId) {
          throw new ApiError(404,"User not Found")
     }
     //Call Cart the data base 
     const userCart = await Cart.find({
          user:UserId
     })

     if (!userCart) {
          throw new ApiError(401,"Cart is Empty")
     }
     //return the response
     return res
     .status(200)
     .json(
          new ApiResponse(
               200,
               userCart,
               "User Cart Fetched Succesfully"
          )
     )
})






export {addItemToCart,removeItemfromCart,getUserCartList}