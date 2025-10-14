import {Router} from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import {AddReview,EditReview,DeleteReview,getReviewOnAProduct} from "../controllers/review.controllers.js"
 

const router = Router()
router.use(verifyJWT)

router.route("/addreview/:productId").post(AddReview)
router.route("/editreview/:productId").patch(EditReview)
router.route("/deletereview/:productId").delete(DeleteReview)
router.route("/getreview/:productId").get(getReviewOnAProduct)


export default router