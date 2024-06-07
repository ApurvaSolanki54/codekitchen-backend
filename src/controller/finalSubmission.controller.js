import { CheckRequest } from "../models/checkRequest.model.js";
import { CheckResponse } from "../models/checkResponse.model.js";
import { FinalResult } from "../models/finalResult.model.js";
import { Question } from "../models/question.model.js";
import { Testcase } from "../models/testcase.model.js";
import { User } from "../models/user.model.js"
import { Buffer } from 'buffer'
import { asyncHandler } from "../utiles/asyncHandler.js";
import axios from "axios";
import { ApiResponse } from "../utiles/apiResponse.js";
import { unsubscribe } from "diagnostics_channel";
import { AllCheckRequest } from "../models/allCheckRequest.model.js";
import { UserCode } from "../models/userSuccessFullySubmittedCode.model.js";
import { ObjectId } from "mongodb"
//submit vada ma mare testcases na bases par input aapish.


const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
}

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
}


const testcases = [
    {
        input:"MQ==",//1
        output:"MQoxCjEK"
    },
    {
        input:"Mg==",//2
        output:"MgoyCjIK"
    },
    {
        input:"Mw==",//3
        output:"MwozCjMK"
    }
]
const finalSubmission = asyncHandler( async(req, res) => {

    // const questionId = req.param;
    // const question = await Question.findById(questionId)

    // const len=question.testcase.length;
    const language = req.body.language
    const languageId = req.body.languageId
    const questionId = req.body.questionId
    console.log("question --- ", questionId)
    const currCode= req.body.code
    const code =  encode(req.body.code)
    //const code =  req.body.code
    const userId = req.user._id//"65ccfc71be1e5a2e6a23ed60"
    console.log("userId:", userId)

    const question = await Question.findById(questionId)
    console.log("question: ", question)
    const user = await User.findById(userId)

    let checkRequestArray = []

    for(let i=0; i<question.testcase.length; i++){
        console.log("-----------------", i, "------------")
        const testcase = await Testcase.findById(question.testcase[i])
        console.log("testcase: ", testcase)
        const options = {
            method: 'POST',
            url: 'http://localhost:2358/submissions',
            params: {
                base64_encoded: 'true',
                // fields: '*'
            },
            data: {
                language_id: languageId,
                source_code: code,
                callback_url: "http://192.168.43.13:8000/api/v1/final-result/",   
                
                stdin: Buffer.from(testcase.input, "binary").toString("base64"),//question.testcase[i].input, 
                expected_output: Buffer.from(testcase.output, "binary").toString("base64"),//question.testcase[i].output,
               
                //hello world
                //expected_output:"aGVsbG8gd29ybGQ="

                cpu_time_limit: parseFloat(15).toFixed(3),
                cpu_extra_time: parseFloat(2).toFixed(3),
            }
            
        };
        console.log("options: ", options.data.source_code)
        console.log("option gaurav mate: ",options)
        try {
            const response = await axios.request(options);
            console.log("token-------", response.data.token)

            //ane loop ma nakh.
            
            const checkRequest=await CheckRequest.create({
                _id: response.data.token,
                token:response.data.token,
                userId:user,
                questionId:questionId,
                testcaseId:testcase,
                status:"Pending",
                cases: i
                // questionId: question,
                // testcaseId: question.testcase[i]
            })

            checkRequestArray.push(checkRequest._id)
            console.log("checkRequestArray: ", checkRequestArray)
            console.log("check request: ", checkRequest);
            console.log("response data from submitted code: ", response.data);
            
            //checkResponse(response.data.token)
        } catch (error) {
            //console.log("message: ", message)
    
            console.error("message-error:",error);
        }
    }

    // const allCheckReq = await AllCheckRequest.find({
    //     $and: [{userId}, {questionId}]
    // })

    // console.log("----allcheckreq: ", allCheckReq)

    const allCheckRequest = await AllCheckRequest.create({
        userId: userId,
        questionId:questionId,
        languageId: languageId,
        languageName: language,
        code: currCode,
        checkRequest: checkRequestArray
    })
    // const userCode = await UserCode.create({
    //     allCheckRequestId: allCheckRequest._id,
    //     questionId:question,
    //     userId: userId,
    //     code:currCode,
    //     language:language
    // })
    
    console.log("allCheckRequest", allCheckRequest)
    const allCheckRequest1 = await AllCheckRequest.findById(allCheckRequest._id)
    console.log("display-----------: ", allCheckRequest1)
    return res.status(200).json(
        new ApiResponse(200, allCheckRequest, "code submitted successfully")
    )
    

})


export {finalSubmission}