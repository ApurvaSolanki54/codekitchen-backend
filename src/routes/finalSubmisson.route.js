import { Router } from "express";
import { finalSubmission } from "../controller/finalSubmission.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/submit-code").post(verifyJWT, finalSubmission)

export default router