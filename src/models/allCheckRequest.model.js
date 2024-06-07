import mongoose from "mongoose";

const allCheckRequestSchema = new mongoose.Schema({
    // questionTitle:{
    //     type:String
    // },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    questionId:{
        type: mongoose.Schema.ObjectId,
        ref: "Question"
    },
    statusOfSubmission:{
        type:String
    },
    languageId:{
        type:Number
    },
    languageName:{
        type: String
    },
    code:{
        type:String
    },
    checkRequest: [
        {
            type: String
        }
    ]
}, {timestamps: true})

export const AllCheckRequest = mongoose.model("AllCheckRequest", allCheckRequestSchema)