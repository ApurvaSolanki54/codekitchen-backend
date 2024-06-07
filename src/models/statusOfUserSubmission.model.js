import mongoose from "mongoose";

const statusOfSubmission = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    questionTitle: {
        type: String
    },
    status: {
        type: String
    }
},{timestamps: true})

export const StatusOfSubmission = mongoose.model("StatusOfSubmission", statusOfSubmission)