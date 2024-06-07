import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    difficultyLevel:{
        type:String
    },
    topics:[
        {
            type:String
        }
    ],
    constraint:{
        type:String,
    },
    testcase:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Testcase" 
        }
    ]
},{timestampes: true});

export const Question = mongoose.model("Question", questionSchema)