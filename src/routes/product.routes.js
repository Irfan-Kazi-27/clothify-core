import { Router } from "express"
import {addProduct,editProduct,deleteProduct} from "../controllers/product.controllers.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {IsAdmin} from "../middleware/isAdmin.middlerware.js"
import { upload } from "../middleware/multer.middleware.js"



const router = Router()

router.use(verifyJWT)
router.use(IsAdmin)


router.route("/add-product").post(upload.array("images",5),addProduct)


 export default router