import { asyncHandler } from "../utiles/asyncHandler.js";
import {ApiResponse} from "../utiles/apiResponse.js"
import {ApiError} from "../utiles/apiError.js"
import { Question } from "../models/question.model.js";
import { Testcase } from "../models/testcase.model.js";


const createQuestion = asyncHandler(async(req, res) => {
    const {title, description, constraint, testcase, difficultyLevel, topics} = req.body
    
    if(!title || !description || !testcase){
        throw new ApiError(400, 'All fields are required')
    }
    
    const existedQuestion = await Question.findOne({title})

    if(existedQuestion){
        throw new ApiError(409, "question with title  already exists")
    }
    
    console.log("testcase.tId: ", testcase)
    
    var testcaseObj=[];
    for(let i=0; i<testcase.length; i++){

        const existedTestCase = await Testcase.findById(testcase[i].tId)
        if(!existedTestCase){
            throw new ApiError(409, "testcase not found")
        }
        
        testcaseObj.push(existedTestCase)
        console.log(testcaseObj)

    }
    const question = await Question.create({
        title, 
        description, 
        constraint, 
        testcase:testcaseObj,
        difficultyLevel,
        topics
    })

    const createdQuestion = await Question.findById(question._id)

    if(!createdQuestion){
        throw new ApiError(500, "something went wrong while creating question")
    }

    return res.status(201).json(
        new ApiResponse(200, createdQuestion, "question created successfully")
    )

})

export {createQuestion}