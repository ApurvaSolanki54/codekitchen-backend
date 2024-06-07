import mongoose from "mongoose";

const checkRequestSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    token:{
        type:String
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    questionId:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    },
    testcaseId:{
        type:mongoose.Schema.ObjectId,
        ref:"Testcase"
    },
    // testcaseInput:{
    //     type:String
    // },
    // testcaseOutput:{
    //     type:String
    // },
    status:{
        type: String
    },
    cases:{
        type: Number
    },
    message:{
        type:String
    },
    description:{
        type:String
    },compilationOutput:{
        type:String
    },
    yourCodeOutput:{
        type:String
    },
}, {timestamps:true})

export const CheckRequest = mongoose.model("CheckRequest", checkRequestSchema)