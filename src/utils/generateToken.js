import {User} from "../models/users.models.js"
import {ApiError} from "../utils/ApiError.js"

export const generateAccessAndRefreshtoken = async (user_id) => {
    try {
        const user = await User.findById(user_id)
        
        
        const refreshToken = user.generateRefreshToken()
        const accessToken= user.generateAccessToken()

        user.refreshToken = refreshToken
        user.save({validateBeforeSave:true})
        
        return {refreshToken,accessToken}
    } catch (error) {
       if (error) {
        throw new ApiError(500,error||"Something Went Wrong While Generating Token")
       }
    }
}