import { Router } from "express";
import {getFinalResult} from '../controller/getFinalResult.controller.js'
const router=Router()

router.route("/").put(getFinalResult)

export default router