import { Router } from "express";
import { displayFinalSubmission } from "../controller/displayFinalSubmission.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/display-submission").post(verifyJWT, displayFinalSubmission)

export default router