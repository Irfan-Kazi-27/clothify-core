import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Category } from "../models/categories.models.js"
import { isValidObjectId } from "mongoose"

const CreateCategory = asyncHandler(async (req,res) => {
    const {name,description} = req.body
    
    if (!name || !description) {
        throw new ApiError(404,"name and descriptiom of the Category Required")
    }

    if (name.length < 3 || description.length < 3) {
        throw new ApiError(403,"Name and description cannot be less than 3")
    }

    const category = await Category.create({
        name,
        description
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            category,
            "Category Created SuccessFully"
        )
    )


    
})

const EditCategory = asyncHandler(async (req,res) => {
    const {newName,newDescription} = req.body
    const {categoryId} = req.params
    console.log(categoryId);
    

    if (!isValidObjectId(categoryId)) {
        throw new ApiError(403,"Invalid Object Id")
    }

     if (newName.length < 3 || newDescription.length < 3) {
        throw new ApiError(403,"Name and description cannot be less than 3")
    }

    const newcategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set:{
                name:newName,
                description:newDescription
            }
        },
        {
            new:true
        }
    )

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            newcategory,
            "Category Edited SuccessFully"
        )
    )
})

const DeleteCategory = asyncHandler(async (req,res) => {
    const {categoryId} = req.params

    if (!isValidObjectId(categoryId)) {
        throw new ApiError(404,"Category not Found")
    }

    const category = await Category.findByIdAndDelete(categoryId)
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            category,
            "Category Deleted SuccessFully"
        )
    )
})

const getAllcategory = asyncHandler(async ( _,res) => {
    const category = await Category.find()
   
    if (!category) {
        throw new ApiError(404,"Category Not Found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            category,
            "Category Fetched SuccessFully"
        )
    )
})

export {CreateCategory,EditCategory,DeleteCategory,getAllcategory}