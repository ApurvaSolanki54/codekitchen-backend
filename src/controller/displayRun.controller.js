import { Run } from "../models/run.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";


const displayRun = asyncHandler( async(req, res) => {
    const token = req.body.token;
    console.log("token from req: ", token)
    const isExecute = await Run.findOne({token});
    
    console.log("isExecute: ", isExecute)
    let message=""
    if(isExecute.status === "Pending"){
        message="wait for processing"
    }
    else if(isExecute.statusId!==3){
        message="something wrong in the code"
    }
    else{
        message="congratulation"
    }

    return res.status(200).json(
        new ApiResponse(200, isExecute, message)
    )
})

export {displayRun}