import axios from 'axios'
import { ApiResponse } from '../utiles/apiResponse.js';

const getLanguages=async(req,res)=>{
    
    const options = {
      method: 'GET',
      url: 'http://localhost:2358/languages',
      // headers: {
      //   'X-RapidAPI-Key': '18d84b7f92msh0c9a507d0a9df9ep137a1bjsnc59852b8e691',
      //   'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      // }
    };
    
    try {
        console.log("inside getlanguage:")
        const response = await axios.request(options);
        console.log(response.data);
        return res.status(200).
        json(
            new ApiResponse(200, response.data, "all language fateched successfully")
        )
    } catch (error) {
        console.error(error);
    }
}

export {getLanguages}