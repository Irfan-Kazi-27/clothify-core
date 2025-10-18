import { isValidObjectId } from "mongoose"
import {Product} from "../models/products.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {uploadFile} from "../utils/fileupload.js"


const getAllProduct = asyncHandler(async (req,res) => {
    //add the page no ,skip and limit
    //get the product based on this
    //count the total number of product not neccessary optional but for Frontend
    //return the Product
    
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const skip = (page-1)*limit

    const product = await Product.find().skip(skip).limit(limit)

    const totalproducts = await Product.countDocuments()
    
    if (!product) {
        throw new ApiError(403,"There is Something Went Wrong")
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
           [ page,totalproducts,product],
            "Product Fetched Succesfully"
        )   
    )

})

const addProduct = asyncHandler(async (req,res) => { 
    const {name,description,price,stock,category} =req.body
    let imageUrl = []
    

    if (!req.files || req.files.length === 0) {
        throw new ApiError(404,"File not Uploaded")
    }
    
    for (const file of req.files) {
        const productimages = await uploadFile(file.path)
        if(productimages) imageUrl.push(productimages.url)
    }
     
    
    if (!name || !description || !price || !stock|| !category) {
        throw new ApiError(403,"Every Field Is required")
    }
    if (stock > 100) {
        throw new ApiError(403,"We Cannot Take that much Stock")
    }

   
    
   
    
    const addedProduct = await Product.create({
        name,
        description,
        price,
        stock,
        category,
        images:imageUrl
    })

    return res.status(200)
    .json(
        new ApiResponse(200,addedProduct,"Product Added Succesfully")
    )
})

const editProduct = asyncHandler(async (req,res) => {
    const {newname,newdescription,newprice,newcategory} = req.body

    const {productId} = req.params
   
    
    if(!isValidObjectId(productId)) {
        throw new ApiError(402,"Invalid Object Id")
    }

    if (!newname && !newdescription && !newprice && !newcategory) {
        throw new ApiError(403,"Atleast One neeed To be change")
    }


    const editedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name:newname,
          description:newdescription,
          price:newprice,
          category:newcategory  
        }
    )

    if (!editedProduct) {
        throw new ApiError(403,"Problem While Editing Product")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,editedProduct,"Product Added Succesfully")
    )
    
})

const deleteProduct = asyncHandler(async (req,res) => {

    const {productId} = req.params

    if (!isValidObjectId(productId)) {
        throw new ApiError(403,"Invalid Product Id")
    }

    const deletingProduct = await Product.findByIdAndDelete(productId)
    return res.status(200)
    .json(
        new ApiResponse(200,deletingProduct,"The Above Fetched Product deleted Succesfully")
    )
})




export {addProduct,editProduct,deleteProduct,getAllProduct}