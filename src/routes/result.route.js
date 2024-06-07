import { Router } from "express";
import { result } from "../controller/getResult.controller.js";
const router=Router()

router.route("/").put(result)

export default router