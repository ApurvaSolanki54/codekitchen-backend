import {app} from "./app.js"
import dotenv from 'dotenv'
import connectDB from "./db/index.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(8000, ()=>{
        console.log("server is running on port 8000")
    })
})
.catch((err)=>{console.log("MONGODB CONNECTION FAILED index!!! ", err)})

