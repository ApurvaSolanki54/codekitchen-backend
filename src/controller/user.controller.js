import { asyncHandler } from "../utiles/asyncHandler.js";
import {ApiResponse} from "../utiles/apiResponse.js"
import {ApiError} from "../utiles/apiError.js"
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefereshToken = async(userId) =>{
    try {
        const user=await User.findById(userId)
        const accessToken = user.generateAccessToken()
        console.log("access: ",accessToken)
        const refreshToken = user.generateRefreshToken()
        console.log("ref: ",refreshToken);

        user.refreshToken=refreshToken

        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}


    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and referesh token.")
    }
}


const registerUser = asyncHandler(async(req, res)=>{
    const {fullName, email, username, password, aboutYou, phoneNo, gendar}=req.body
    console.log("fullName: ", fullName);
    console.log("email: ", email);
    console.log("username: ", username);
    console.log("password: ", password);
    console.log("aboutYou: ", aboutYou);
    console.log("phoneNo: ", phoneNo);
    console.log("gendar: ", gendar);


    if( [fullName, email, username, password, phoneNo, gendar].some((field)=>field?.trim()==='') ){
        throw new ApiError(400, 'All fields are required')
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    


    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        aboutYou, 
        contactNo:phoneNo, 
        description:aboutYou,
        gendar
    })

    const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async(req, res) => {

    const {email, username, password} = req.body

    if(!username && !email){
        throw new ApiError(400, 'username or email is required')
    }

    const user = await User.findOne({
        $and: [{username}, {email}]
    })


    if(!user){
        throw new ApiError(404, "user does not exist")
    }


    const isPasswordValid = await user.isPasswordCorrect(password)


    if(!isPasswordValid){
        throw new ApiError(401, 'Invalid user credentials')
    }

    console.log("user:id: ",user._id)
    const {accessToken, refreshToken} = await generateAccessAndRefereshToken(user._id)

    const decodeToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    const XSRFTOKEN=decodeToken.XSRFTOKEN

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,//
        secure:true,
        maxAge: 86400000,
        sameSite:"none"
    }

    const XSRFoption={
        httpOnly:false,//
        secure:true,
        maxAge: 86400000,
        sameSite:"none"
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("XSRF-TOKEN", XSRFTOKEN, XSRFoption)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken, XSRFTOKEN
            },
            "user looged In successfully"
        )
    )

})

const logoutUser = asyncHandler( async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
            new:true
        }
    )


    const options={
        httpOnly:true,
    }
    const XSRFoption={
        httpOnly:false,
        sameSite:'lax'
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("XSRF-TOKEN", XSRFoption)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "user logged out")
    )

} )


const getUser = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    console.log(userId)
    const user = await User.findById(userId)
    console.log(user)
    if(!user){
        return res.status(400).json("User not found")
    }

    return res.status(200).
    json(
        new ApiResponse(

            200,
            user,
            "User Found successfully"
        )
    )
})

export {registerUser,loginUser, logoutUser, getUser}