import { Router } from "express";
import { createTestcase } from "../controller/testcase.controller.js";
import { getTestcase } from "../controller/getTestcase.controller.js";


const router=Router()

router.route("/").post(getTestcase)
router.route("/submitTestcase").post(createTestcase)

export default router