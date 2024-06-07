import { Testcase } from "../models/testcase.model.js";
import { ApiError } from "../utiles/apiError.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

const createTestcase = asyncHandler( async(req, res) => {
    
    const {input, output} = req.body

    if(!input || !output ){
        throw new ApiError(400, 'All fields are required')
    }


    const testcase = await Testcase.create({
        input,
        output
    })

    const createdTestCase = await Testcase.findById(testcase._id)

    if(!createdTestCase){
        throw new ApiError(500, "something went wrong while registering the user")
    }
    console.log(createdTestCase._id)
    return res.status(201).json(
        new ApiResponse(200, createdTestCase, "testcase created successfully")
    )

} )

export {createTestcase}