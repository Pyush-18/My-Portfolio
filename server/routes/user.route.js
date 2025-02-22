import {Router} from "express"
import { contactMe, getAuthUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get( verifyJWT ,logoutUser)
router.route('/authUser').get( verifyJWT ,getAuthUser)
router.route('/contact').post(contactMe)


export default router