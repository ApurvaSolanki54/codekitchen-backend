import { AllCheckRequest } from "../models/allCheckRequest.model.js";
import { Question } from "../models/question.model.js";
import { ApiResponse } from "../utiles/apiResponse.js";
import { asyncHandler } from "../utiles/asyncHandler.js";

const findIfSolvedORNot=(title, userCodes)=>{
    let arr="";
    for(let i=0;i<userCodes.length;i++){
        if(userCodes[i].statusOfSubmission === "Accepted"){
            arr="Accepted"
            break;    
        }
        else if(userCodes[i].statusOfSubmission === "Attempted"){
            arr="Attempted"        
        }
        
    }
    return arr
}

const getAllQuestion = asyncHandler( async(req, res) => {
    let getAll = await Question.find()
    const userId=req.user._id
    console.log("questions:", getAll)
    const finalArr=[]
    
    for(let i=0;i<getAll.length;i++){
        const questionId = getAll[i]._id
        const userCodes = await AllCheckRequest.find({
            $and: [{userId}, {questionId}]
        })
        const title=getAll[i].title
        let arr=findIfSolvedORNot(title, userCodes)
        console.log("arr: ",arr)
        let obj=getAll[i].toObject()
        obj.statusOfSubmission = arr === "" ? "Not Solved" : arr;
        console.log("obj:", obj);
        getAll[i]=obj
    }

    console.log(getAll)
    
    return res.status(200).json(
        new ApiResponse(
            200,
            getAll,
            "all question are fateched successfully"
        )
    )
} )

export {getAllQuestion}