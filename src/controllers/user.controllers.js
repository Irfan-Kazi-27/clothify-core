import { User } from "../models/users.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAccessAndRefreshtoken } from "../utils/generateToken.js"


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
    //get the essential data for the requested body
    const {email,password,username} = req.body
    //check for the User gave the proper data anything will not be miss
    if (!(email || password || username)) {
        throw new ApiError(403,"Email Password required")
    }
    //find the User in the database
    const user = await User.findOne({$or:[{email},{username}]})
   
   
    if (!user) {
        throw new ApiError(402,"User not Found on this email")
    }
    //check the password is correct from the userSchema Method
    const CheckForPassword = await user.ispasswordCorrect(password)
    if (!CheckForPassword) {
        throw new ApiError(400,"Password is Incorrect")
    }
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
     
    //generate the Access token and refresh Token
    const {refreshToken,accessToken} = await generateAccessAndRefreshtoken(user._id)

    const options = {httpOnly:true,secure:true}
    //send this token in the UserCookies with the response
    res
    .status(200)
    .cookie("AccessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{user:loggedInUser,accessToken},"User Logged In SuccessFully"))
    
    
})

const loggedOutUser = asyncHandler(async (req,res) => {
    
})

export {registerUser , loginUser ,loggedOutUser} 