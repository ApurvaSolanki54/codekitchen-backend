import { asyncHandler } from "../utiles/asyncHandler.js"
import {ApiError} from "../utiles/apiError.js"

import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyJWT = asyncHandler( async(req, res, next) =>{
    console.log("req.cookie: ", req.cookies)
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearar ","")
        console.log("cookie---: ", req.cookies)
        const headers = req.headers;
        console.log("headers: ", headers)
        const coo = headers.cookie.split('; ');
        console.log("coo:", coo)

        let xsrfToken=""

        for (const cookie of coo) {
            const [key, value] = cookie.split('=');
            
            const trimmedKey = key.trim();
            console.log("trimmedKey: ", trimmedKey)
            const trimmedValue = value.trim();
            console.log("trimmedValue: ", value)
            
            if (trimmedKey === 'XSRF-TOKEN') {
                xsrfToken = value
                break; 
            }
        }
    
        const decodeToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        console.log("decodeToken: ", decodeToken.XSRFTOKEN)
        if(decodeToken.XSRFTOKEN !== xsrfToken){
            throw new ApiError(401, "Unauthorized request")
        }
        
        const user=await User.findById(decodeToken?._id).
        select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, 'Invalid Access Token')
        }
    
        req.user=user;
        console.log("hello ")
        next()
    } catch (error) {
        console.log("error===", error)
        throw new ApiError(401, error?.message || 'Invalid access token')
    }


} )