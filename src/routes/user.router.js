import { Router } from "express";
import { getUser, loginUser, registerUser, logoutUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userSubmittedCode } from "../controller/userSubmittedCode.controller.js";

const router=Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/getUser").get(verifyJWT, getUser)

export default router