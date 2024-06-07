import mongoose from "mongoose";

const checkResponseSchema = new mongoose.Schema({
    token:{
        type:String,
    },
    message:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String
    },
    testcaseInput:{
        type:String
    },
    testcaseOutput:{
        type:String
    },
    compilationOutput:{
        type:String
    },
    yourCodeOutput:{
        type:String
    },
    cases:{
        type: Number
    }
    //message-desc etc...
}, {timestamps:true})

export const CheckResponse = mongoose.model("CheckResponse", checkResponseSchema)