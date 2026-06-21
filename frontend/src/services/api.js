const API_BASE_URL = "http://localhost:3000/api";

export const uploadFiles = async (files) => {
    const formData = new FormData();
    files.forEach(file=>{
        formData.append('files',file)
    });
    const response = await fetch(`${API_BASE_URL}/upload`,{
        method:'POST',
        body:formData
    });
    if (!response.ok){
        throw new Error("upload Failed");
    }
    return response.json();
}

export const checkPlagiarism = async (fileUploadId) => {
    const response = await fetch(`${API_BASE_URL}/check/${fileUploadId}`,{method:'POST'});
    if(!response.ok){
        throw new Error("plagiarism check failed");
    }
    return response.json();
}

export const getResults = async (fileUploadId) => {
    const response = await fetch(`${API_BASE_URL}/results/${fileUploadId}`);
    if(!response.ok){
        throw new Error("Failed to fetch results");
    }
    return response.json();
}