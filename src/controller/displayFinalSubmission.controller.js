import { AllCheckRequest } from "../models/allCheckRequest.model.js";
import { CheckRequest } from "../models/checkRequest.model.js";
import { CheckResponse } from "../models/checkResponse.model.js";
import { Question } from "../models/question.model.js";
import { StatusOfSubmission } from "../models/statusOfUserSubmission.model.js";
import { User } from "../models/user.model.js";
import { UserCode } from "../models/userSuccessFullySubmittedCode.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";


const displayFinalSubmission = asyncHandler( async(req, res) => {
    const userId = req.user._id//"65bb4778a658a36ca7ae3c9f"
    let flag=0;
    //const {allCheckRequestId, userId, } = req.body
    const allCheckRequestId = req.body.allCheckRequestId
    console.log("allCheckRequestId: ", allCheckRequestId)

    //console.log(allCheckRequestId)
    //const question = await Question.findById(questionId);
    const allCheckRequest = await AllCheckRequest.findOne({ _id: allCheckRequestId })
    console.log("display: ", allCheckRequest)

    let resultObj=[]

    
    //console.log(":",allCheckRequest)
    for(let i=0; i<allCheckRequest.checkRequest.length; i++){
        const testcaseId = allCheckRequest.checkRequest[i].testcaseId

        // const checkReqestDoc=await CheckRequest.findOne({
        //     $and: [{questionId}, {testcaseId}, {userId}]
        // })

        //console.log("display1: ",i, checkReqestDoc)

        //const checkRequestToken=allCheckRequest.checkRequest[i].token
        //console.log("checkRequest[i]: ", allCheckRequest.checkRequest[i])

        const checkRequestDoc = await CheckRequest.findById(allCheckRequest.checkRequest[i]).populate('testcaseId')        
        const checkRequestToken = checkRequestDoc.token

        // const checkResponse = await CheckResponse.findOne({token:checkRequestToken})

        if(checkRequestDoc.status === "Success"){
            console.log("display1: ",i, checkRequestDoc)
            // const checkRequestDoc1 = await CheckRequest.findByIdAndUpdate(
            //     allCheckRequest.checkRequest[i],
            //     {
            //         $set:{
            //             status:"Success"
            //         }
            //     },
            //     {
            //         new: true
            //     }
            // )
            // const checkResponseDoc1 = await CheckResponse.findByIdAndUpdate(
            //     checkResponse._id,
            //     {
            //         $set:{
            //             testcaseInput: checkRequestDoc1.testcaseInput,
            //             testcaseOutput: checkRequestDoc1.testcaseOutput,
            //             cases: checkRequestDoc1.cases
            //         }
            //     },
            //     {new :true}
            // )
            if(checkRequestDoc.description === "Accepted"){
                flag=flag+1;
                resultObj.push(checkRequestDoc)
                // resultObj.push(checkResponse)
                //console.log(allCheckRequest[i])
            }
            else{
                resultObj.push(checkRequestDoc)
                // resultObj.push(checkResponse)
                //console.log(allCheckRequest[i])
            }
             

        }
        else{
            
            resultObj.push(checkRequestDoc)
        }

    }
    

    if(flag === allCheckRequest.checkRequest.length){
        console.log("successfull")
        const ans=await AllCheckRequest.findByIdAndUpdate(
            allCheckRequestId,
            {
                $set:{
                    statusOfSubmission:"Accepted"
                }
            },
            {
                new: true
            }
        )
        
        // const statusOfSubmission = await StatusOfSubmission.create({
        //     userId: userId,
        //     questionTitle: allCheckRequest.questionTitle,
        //     status: "Accepted"
        // })

        // const user = await User.findByIdAndUpdate(
        //     userId,
        //     {
        //         $set:{
        //             submittedQuestionTitle: allCheckRequest.questionTitle,
        //             submittedQuestionId: allCheckRequest.questionId
        //         }
        //     },{
        //         new: true
        //     }
        // )


        // const userCode = await UserCode.findOne({allCheckRequestId:allCheckRequestId})
        // console.log("code --- ", userCode._id)
        // const code = await UserCode.findByIdAndUpdate(
        //     userCode._id,
        //     {
        //         $set:{
        //             status:"Accepted"
        //         }
        //     },
        //     {
        //         new: true
        //     }
        // )
        
        return res.status(201).json(
            new ApiResponse(200, resultObj,"all testcase passed Successfully")
        ) 
    }
    else{
        await AllCheckRequest.findByIdAndUpdate(
            allCheckRequestId,
            {
                $set:{
                    statusOfSubmission:"Attempted"
                }
            },
            {
                new: true
            }
        )
        // const statusOfSubmission = await StatusOfSubmission.create({
        //     userId: userId,
        //     questionTitle: allCheckRequest.questionTitle,
        //     status: "Attempted"
        // })

        // const userCode = await UserCode.findOne({allCheckRequestId:allCheckRequestId})
        // console.log("code === ", userCode)
        // const code = await UserCode.findByIdAndUpdate(
        //     userCode._id,
        //     {
        //         $set:{
        //             status:"not Accepted"
        //         }
        //     },
        //     {
        //         new: true
        //     }
        // )
    }
    return res.status(201).json(

        new ApiResponse(200, resultObj , "not all question submitted successfully")
    )

})


export {displayFinalSubmission}