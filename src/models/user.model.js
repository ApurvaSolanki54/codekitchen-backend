import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    gendar:{
        type:String
    },
    contactNo:{
        type:String
    },
    dob:{
        type:Date
    },
    description:{
        type:String
    },
    password:{
        type:String,
        required:[true, 'Password is rqeuired']
    },
    refreshToken:{
        type:String
    },
    submittedQuestionTitle:[
        {
            type:String
        },
    ],
    submittedQuestionId:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Question"
        }
    ],
    


}, {timestamps:true})


userSchema.pre('save', async function(next){

    if(!this.isModified('password')){return next()}

    this.password=await bcrypt.hash(this.password, 10);
    next()
})


userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateXSRFTOKEN=function(){
    const randomBytes = crypto.randomBytes(length);
    const extraToken = randomBytes.toString('base64');
}

userSchema.methods.generateAccessToken=function(){

    const randomBytes = crypto.randomBytes(9);
    const extraToken = randomBytes.toString('base64');



    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.charAt(randomIndex);
    }
    console.log("-------------------",result)

    const accessToken = jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
        XSRFTOKEN: result
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }


    )
    console.log("userToken: ", accessToken)
    return accessToken;
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userSchema)