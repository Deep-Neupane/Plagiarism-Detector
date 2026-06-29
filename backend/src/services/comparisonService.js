const axios = require('axios');
PYTHON_API_URL='http://localhost:5001/api/match';

async function getMatches(text1,text2){
    try{
        const response = await axios.post(PYTHON_API_URL,{
        text1,
        text2
        })
        return response.data;
    }catch(err){
        console.log(err.message);
        throw err;
    }
}
module.exports={getMatches}