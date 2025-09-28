import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import {addItemToCart,removeItemfromCart,getUserCartList} from "../controllers/cart.controllers.js"

const router = Router()


router.route("/add-to-cart").post(verifyJWT,addItemToCart)
router.route("/remove-from-cart").patch(verifyJWT,removeItemfromCart)
router.route("/User-cart").get(verifyJWT,getUserCartList)
