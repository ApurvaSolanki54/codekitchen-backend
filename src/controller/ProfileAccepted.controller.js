import { AllCheckRequest } from "../models/allCheckRequest.model.js"
import { Question } from "../models/question.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

const userAccepted = asyncHandler( async(req, res) => {
    const userId=req.user._id
    const arr=[]
    const doc=await AllCheckRequest.find({userId})
    
    for(let i=0;i<doc.length;i++){
        console.log("doc---", doc[i]);
        const question = await Question.findById(doc[i].questionId)
        const alreadyExist = arr.some(obj=>obj.questionTitle === question.title)
        if(!alreadyExist){
            if(doc[i].statusOfSubmission === "Accepted"){
                console.log("title:",doc[i].questionId.title)
                const obj={
                    questionId : doc[i].questionId,
                    questionTitle : question.title
                }
                arr.push(obj)
            }
        }
    }
    console.log("submiited:", arr)
    return res.status(200).json(
        new ApiResponse(200, arr, "Success")
    )
})

export {userAccepted}