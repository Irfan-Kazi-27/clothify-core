import { User } from "../models/users.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res) => {
    //first get the Email,password firstname from the req.body
    const {username,email,password} = req.body
    //check for the every data is provided and with proper format
    if (!(email && username && password)) {
        throw new ApiError(402,"Username,Email,password required")
    }
    if (!(email.endsWith('@gmail.com')  )) {
        throw new ApiError(403,"Invalid Email Address")
    }
    if (password.length < 8 || password[0] !==password[0].toUpperCase()){
        throw new ApiError(403,"Password Should Contain more than 8 character and Start with Upper Case")
        }

    if (!(password.includes("@")||password.includes('$')||password.includes("#"))) {
        throw new ApiError(403,"Password Must contain one Special character [@#$]")
    }
    //check if the User is already Exist or not in the data base
    const existingUser = await User.findOne({email,username}) 
    if (existingUser) {
        throw new ApiError(403,"User already Exist with This or Username")
    }
    //Create a new User
    const user = await User.create({
        username,
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    //return the response
    return res.status(200).json(
        new ApiResponse(200,createdUser,"User Register SuccessFully")
    )
})

const  loginUser = asyncHandler(async (req,res) => {
    
})

export {registerUser , loginUser} 