import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { CreateCategory,EditCategory,DeleteCategory,getAllcategory} from "../controllers/categories.controllers.js";
import {IsAdmin} from "../middleware/isAdmin.middlerware.js"

const router = Router();
router.use(verifyJWT)
router.route("/create-Category").post(IsAdmin,CreateCategory)
router.route("/Edit-category/:categoryId").patch(IsAdmin,EditCategory)
router.route("/Delete-category/:categoryId").delete(IsAdmin,DeleteCategory)
router.route("/getAll-Category").get(getAllcategory)


export default router