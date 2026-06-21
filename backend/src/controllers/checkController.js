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
            content:fs.readFileSync(file.filepath,'utf-8'),
            fileId:file.id
        }))

        const detectionResults = await detectPlagiarism(
            filesWithContent.map(f=>({filename:f.filename,content:f.content}))
        );

        const savedMatches=[];
        for(const result of detectionResults.results){
            const file1=filesWithContent.find(f=>f.filename===result.file1);
            const file2=filesWithContent.find(f=>f.filename===result.file2);

            if(!file1 || !file2) continue;

            const match = await prisma.plagiarismMatch.create({
                data:{
                    fileUploadId:fileUploadId,
                    file1Id: file1.fileId,
                    file2Id: file2.fileId,
                    similarityScore: result.plagiarism_percentage / 100, 
                    exactMatchPercentage: result.rabin_karp_percentage,
                    paraphrasePercentage: result.tfidf_percentage
                }
            });
            savedMatches.push(match);

        }



        res.json({
            success: true,
            fileUploadId,
            results: detectionResults,
            matchesFound: savedMatches.length,
            results: detectionResults.results
        })

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Plagiarism check failed' });
    }
}

module.exports={checkPlagiarism}