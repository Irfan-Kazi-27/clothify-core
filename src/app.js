import express from "express"
import cookieParser from "cookie-parser"




export const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




//User Router
import userRouter from "./routes/user.routes.js"
import { verifyJWT } from "./middleware/auth.middleware.js";
app.use('/api/v1/users',userRouter)


