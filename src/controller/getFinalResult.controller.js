import { asyncHandler } from "../utiles/asyncHandler.js";
import {ApiResponse} from '../utiles/apiResponse.js'
import { CheckResponse } from "../models/checkResponse.model.js";
import { CheckRequest } from "../models/checkRequest.model.js";


const getFinalResult = async(req, res) =>{
    const data=req.body
    var output=""
    if(data.status.id===3){
        output = Buffer.from(req.body.stdout, 'base64').toString()
        console.log(Buffer.from(req.body.stdout, 'base64').toString())
    }
    var compileOutput=""
    if(data.compile_output!==null){
        compileOutput=Buffer.from(data.compile_output, 'base64').toString()
    }
    // if(data.status.id !== 3){
    //     return res
    //     .json(
    //         new ApiResponse(
    //             200,
    //             {
    //                 data
    //             },
    //             "error"
    //         )
    //     )
    // }

    const token=data.token
    const checkReq = await CheckRequest.findOne({token})
    if(checkReq.status !== "Success"){
        const checkRequestDoc = await CheckRequest.findByIdAndUpdate(
            token,
            {
                $set:{
                    message: data.message,
                    description:data.status.description,
                    status:"Success",
                    compilationOutput: compileOutput,
                    yourCodeOutput: output
                },
            },
            {
                new: true
            }
        )
        console.log("check Response: ", checkRequestDoc);
        console.log("data-message", data.message)
        console.log("status: ", data.status.description)
        console.log("data: ",data);
    }

    //console.log("res:", token)
    // const findToken = await CheckResponse.findOne({token})
    // //console.log("find token", findToken)
    // if(!findToken){
    //     const checkResponse=await CheckResponse.create({
    //         token:data.token,
    //         message:data.message,
    //         description:data.status.description,
    //         status:"Success",
    //         compilationOutput: data.compile_output,
    //         yourCodeOutput: output
    //     })
    //     console.log("check Response: ", checkResponse);
    //     console.log("data-message", data.message)
    //     console.log("status: ", data.status.description)
    //     console.log("data: ",data);
    // }
}


export {getFinalResult}