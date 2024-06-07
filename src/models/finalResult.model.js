import mongoose from "mongoose";

const finalResultSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
    
}, {timestamps: true})

export const FinalResult = mongoose.model("FinalResult", finalResultSchema)