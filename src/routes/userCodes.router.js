import { Router } from "express";
import { userAllAccepted, userSubmittedCode } from "../controller/userSubmittedCode.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userAccepted } from "../controller/ProfileAccepted.controller.js";
const router=Router()

router.route('/').post(verifyJWT, userSubmittedCode)
// router.route('/allAccepted').get(verifyJWT, userAllAccepted)

router.route('/allAccepted').get(verifyJWT, userAccepted)



export default router