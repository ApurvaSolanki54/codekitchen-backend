import { Testcase } from "../models/testcase.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";



const getTestcase = asyncHandler( async(req, res) =>{
    const testcaseId = req.body.testcaseId;
    console.log("testcaseId", testcaseId)

    const testcase = await Testcase.findById(testcaseId)
    console.log("testcase: ",testcase)

    if(!testcase){
        return res.status(404).json(
            new ApiResponse(404,"Not Found testcase")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, testcase, "Success")
    )
} )

export {getTestcase}