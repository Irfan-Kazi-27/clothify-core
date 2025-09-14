import {User} from "../models/users.models.js"
import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"

export const verifyJWT = asyncHandler(async(req,res,next)=>{
  try {
      const token = req.cookies?.token || req.headers['authorization']?.split(" ")[1]
      if (!token) {
        throw new ApiError(404,"Unauthorized User")
      }

      const decodedInfo = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     

      const user = await User.findById(decodedInfo._id).select("-password -token")
      if (!user) {
        throw new ApiError(504,"Invalid access token")
      }
      req.user = user 
      next()
  } catch (error) {
        throw new ApiError(401,error?.message||"invalid Acces Token")
    }
})