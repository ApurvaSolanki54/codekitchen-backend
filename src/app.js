import express from "express"
import cors from 'cors'
import languageRouter from "./routes/language.route.js";
import submitRouter from "./routes/submit.router.js"
import resultRouter from "./routes/result.route.js"
import userRouter from "./routes/user.router.js"
import cookieParser from "cookie-parser";
import finalCodeSubmissionRouter from "./routes/finalSubmisson.route.js"
import finalResultRouter from "./routes/finalResult.router.js"
import questionRouter from "./routes/question.router.js"
import testcaseRouter from "./routes/testcase.router.js"
import displayRouter from "./routes/display.router.js"
import runRouter from "./routes/run.router.js";
import getAllQuestion from "./routes/getAllQuestion.router.js";
import userCodes from "./routes/userCodes.router.js"

const app=express();


app.use(cors({
    origin:"http://localhost:3000",
    //react port=3000
    credentials:true
}));

app.use(cookieParser())

app.use(express.json({limit:"16kb"}))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/languages', languageRouter)
app.use('/api/v1/submit', submitRouter)
app.use('/api/v1/result', resultRouter)
app.use('/api/v1/final-submission', finalCodeSubmissionRouter)
app.use('/api/v1/final-result', finalResultRouter)
app.use('/api/v1/question', questionRouter)
app.use('/api/v1/testcase', testcaseRouter)
app.use('/api/v1/display', displayRouter)
app.use('/api/v1/run', runRouter)
app.use('/api/v1/getAllQuestion', getAllQuestion)
app.use('/api/v1/getQuestion', questionRouter)
app.use('/api/v1/getTestcase', testcaseRouter)

app.use('/api/v1/userCodes',userCodes)
app.use('/api/v1/isLogin',userRouter)

export {app}