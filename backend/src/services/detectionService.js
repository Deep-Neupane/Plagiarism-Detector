const axios = require('axios')

const PYTHON_API_URL = 'http://localhost:5001/api/detect';

const detectPlagiarism = async (files)=>{
    try{
        const filesData=files.map(file=>({
            filename:file.filename,
            content:file.content
        }));
        const response = await axios.post(PYTHON_API_URL,{
            files:filesData
        });
        return response.data;
    }catch(err){
        console.log('Plagiarism Detection Error:',err.message);
        throw err;
    }
}

module.exports={detectPlagiarism};