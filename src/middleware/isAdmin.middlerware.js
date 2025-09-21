import {ApiError} from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const IsAdmin = asyncHandler(async (req,res,next) => {
    if (req.user.role !== "admin") {
        throw new ApiError(410,"Access Denied Only Admin can do This Task")
    }
    next()
})