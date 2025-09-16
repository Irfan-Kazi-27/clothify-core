import express from "express"


export const app = express();

app.use(express.json())



//User Router
import userRouter from "./routes/user.routes.js"
app.use('/api/v1/users',userRouter)


