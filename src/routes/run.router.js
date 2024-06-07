import { Router } from "express";
import { displayRun } from "../controller/displayRun.controller.js";
const router=Router()

router.route("/runCode").post(displayRun)

export default router