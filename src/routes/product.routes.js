import { Router } from "express"
import {addProduct,editProduct,deleteProduct,getAllProduct  } from "../controllers/product.controllers.js"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {IsAdmin} from "../middleware/isAdmin.middlerware.js"
import { upload } from "../middleware/multer.middleware.js"



const router = Router()

router.use(verifyJWT)



router.route("/add-product").post(IsAdmin,upload.array("images",5),addProduct)
router.route("/edit-product/:productId").patch(IsAdmin,editProduct)
router.route("/delete-product/:productId").delete(IsAdmin,deleteProduct)
router.route("/").get(getAllProduct)


 export default router