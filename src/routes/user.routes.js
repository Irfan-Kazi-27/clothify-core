import { registerUser,loginUser, loggedOutUser} from "../controllers/user.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"


 const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/loggedout').post(verifyJWT,loggedOutUser)


export default router