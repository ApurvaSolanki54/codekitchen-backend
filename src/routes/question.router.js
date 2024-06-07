import { Router } from "express";
import { createQuestion } from "../controller/question.controller.js";
import { getQuestion } from "../controller/getQuestion.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router=Router()

router.route("/").post(verifyJWT,getQuestion)
router.route("/submitQuestion").post(createQuestion)

export default router