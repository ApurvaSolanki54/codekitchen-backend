import mongoose from "mongoose";

const userSuccessFullySubmittedCode = mongoose.Schema({
    allCheckRequestId:{
        type: mongoose.Schema.ObjectId,
        ref: "AllCheckRequest"
    },
    questionId: {
        type:mongoose.Schema.ObjectId,
        ref: "Question"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
    code: {
        type: String,
    },
    status: {
        type: String
    },
    language:{
        type:String
    }
})

export const UserCode = mongoose.model("UserCode", userSuccessFullySubmittedCode)