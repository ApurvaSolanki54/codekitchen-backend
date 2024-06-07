import mongoose from "mongoose";

const checkRunResponseSchema = new mongoose.Schema({
    token:{
        type:String,
    },
    message:{
        type:String
    },
    description:{
        type:String
    }
}, {timestamps:true})

const CheckRunResponse = mongoose.model("CheckRunResponse", CheckRunResponse)