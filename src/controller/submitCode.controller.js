import axios from 'axios'
import { Buffer } from 'buffer'

import { Question } from '../models/question.model.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utiles/apiResponse.js'
import { Run } from '../models/run.model.js'


const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
}

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
}


const submitCode = async(req, res)=>{

    // const code = `#include <iostream>
    // using namespace std;
    
    // int main() {
    //     cout << "Hello World!";
    //     return 0;
    // }`;

    //const questionId = req.body.questionId
    const code =  encode(req.body.code)
    // const code =  req.body.code
    //const userId = req.body.userId

    //const question = await Question.findById(questionId)
    //const user = await User.findById(userId)
    // const input = req.body.input
    const input = encode(req.body.input)

    const languageId = req.body.languageId
       

    const options = {
        method: 'POST',
        url: 'http://localhost:2358/submissions',
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        // headers: {
        //     'content-type': 'application/json',
        //     'Content-Type': 'application/json',
        //     'X-RapidAPI-Key': '18d84b7f92msh0c9a507d0a9df9ep137a1bjsnc59852b8e691',
        //     'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        // },
        data: {

            language_id: languageId,
            source_code: code,
            callback_url: "http:// 192.168.43.13:8000/api/v1/result/",
            stdin: input,
            cpu_time_limit: parseFloat(15).toFixed(3),
            cpu_extra_time: parseFloat(2).toFixed(3),
            // language_id: 71,
            // source_code: 'print("hello world")'


            // language_id: 54,
            // source_code: 
            // "#include <iostream>\n"
            // + "using namespace std;\n\n"
            // + "int main() {\n"
            // + '\tcout << "Hello World!";\n'
            // + "\treturn 0;\n"
            // + "}"//'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
            //stdin: 'SnVkZ2Uw' 
            //stdin cin>>input, this input is send in stdin.
            
        }
        
    };
    console.log("options: ", options.data.source_code)
    try {
        const response = await axios.request(options);
        console.log("response data from submitted code: ", response.data);
        const run = await Run.create({
            token:response.data.token,
            status:"Pending",
            description:""
            // message,
            // description,
            // statusId,
            //code:output
        })
        return res.status(200).json(
            new ApiResponse(
                200,
                response.data,
                "code submitted successfully"
            )
        )
        
    } catch (error) {
        //console.log("message: ", message)

        console.error("message-error:",error.message);
    }

}


export {submitCode}





// const axios = require('axios');

// const apiUrl = 'https://judge0-ce.p.rapidapi.com/';

// const headers = {
//   'Content-Type': 'application/json',
//   'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
//   'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
// };

// // Replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key.

// async function submitCode() {
//   const code = 'print("Hello, World!")'; // Replace with your code
//   const languageId = 71; // Replace with the language ID for the desired programming language

//   const data = {
//     source_code: code,
//     language_id: languageId,
//   };

//   try {
//     const response = await axios.post(apiUrl + 'submissions', data, { headers });
//     const submissionId = response.data.id;
//     console.log('Submission ID:', submissionId);

//     // You can now check the status or get the result using the submission ID
//     await checkSubmissionStatus(submissionId);
//   } catch (error) {
//     console.error('Error submitting code:', error.response ? error.response.data : error.message);
//   }
// }

// async function checkSubmissionStatus(submissionId) {
//   try {
//     const response = await axios.get(apiUrl + `submissions/${submissionId}`, { headers });
//     const status = response.data.status;

//     if (status === 'queue' || status === 'processing') {
//       console.log('Submission is still in queue or processing. Checking again...');
//       setTimeout(() => checkSubmissionStatus(submissionId), 1000);
//     } else if (status === 'accepted') {
//       console.log('Submission accepted!');
//       console.log('Output:', response.data.stdout);
//     } else {
//       console.log('Submission failed with status:', status);
//       console.log('Error message:', response.data.stderr || response.data.compile_output);
//     }
//   } catch (error) {
//     console.error('Error checking submission status:', error.response ? error.response.data : error.message);
//   }
// }

// // Call the function to submit code
// submitCode();
