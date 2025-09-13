import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    descriptiom:{
        type:true,
        required:true,
    }
},{timestamps:true})

export const Category = mongoose.model('Category',categoriesSchema) 