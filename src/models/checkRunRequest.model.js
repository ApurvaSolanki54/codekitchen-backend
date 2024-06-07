import mongoose from "mongoose";

const checkRunRequestSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    questionId:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    },
    token:{
        type:String
    }
}, {timestamps: true})

export const CheckRunRequest = mongoose.model("CheckRunRequest", checkRunRequestSchema) 