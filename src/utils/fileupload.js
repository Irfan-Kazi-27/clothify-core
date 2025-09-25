import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_API_KEY
})

const uploadfile = (localpath)=>{
    try {
        if (!localpath) return "File Path Not received"
        const response = cloudinary.uploader.upload(localpath,{resource_type:auto})
        fs.unlinkSync(localpath)
    } catch (error) {
        console.log(error);
        fs.unlinkSync(error)
    }
}

export {uploadfile}