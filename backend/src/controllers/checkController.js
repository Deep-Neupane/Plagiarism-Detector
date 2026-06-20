const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const { detectPlagiarism } = require('../services/detectionService');

const prisma = new PrismaClient();

const checkPlagiarism =async (req,res) => {
    try{
        const {fileUploadId} = req.params;
        const uploadedFiles = await prisma.UploadedFile.findMany({
            where:{fileUploadId}
        })

        if(uploadedFiles.length<2){
            return res.status(400).json({ error: 'Need at least 2 files to check' });
        }

        const filesWithContent=uploadedFiles.map(file=>({
            filename:file.filename,
            content:fs.readFileSync(file.filepath,'utf-8')
        }))

        const detectionResult = await detectPlagiarism(filesWithContent);

        res.json({
            success: true,
            fileUploadId,
            results: detectionResult
        })

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Plagiarism check failed' });
    }
}

module.exports={checkPlagiarism}