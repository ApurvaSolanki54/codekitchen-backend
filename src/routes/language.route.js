import { Router } from "express";
import { getLanguages } from "../controller/getLanguages.controller.js";

const router=Router()

router.route("/getlanguage").get(getLanguages)

export default router