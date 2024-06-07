import { Question } from "../models/question.model.js";
import { UserCode } from "../models/userSuccessFullySubmittedCode.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";



const getQuestion = asyncHandler( async(req, res) => {
    const questionId = req.body.questionId;
    console.log("questionId", questionId)

    const question = await Question.findById(questionId)
    console.log("question: ",question)

    if(!question){
        return res.status(404).json(
            new ApiResponse(404,"Not Found Question")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, question, "Success")
    )
})



export {getQuestion}