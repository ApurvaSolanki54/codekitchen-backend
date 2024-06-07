import { Router } from "express";
import { getAllQuestion } from "../controller/getAllQuestion.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()

router.route("/").get(verifyJWT, getAllQuestion)

export default router