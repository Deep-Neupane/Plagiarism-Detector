const {PrismaClient} = require('@prisma/client');
const fs = require('fs/promises');
const {getMatches}=require('../services/comparisonService')
const {extractText}=require('../services/fileExtracor')


const prisma = new PrismaClient();


async function getMatchedSections(req,res){
    try{
        const id = req.params.matchID;
        const match = await prisma.plagiarismMatch.findUnique({
            where:{
                id:id
            },
            include:{
                file1:true,
                file2:true
            }
        });

        if(!match){
            return res.status(404).json({
                error: "Match not found"
            });
        }

        const text1=await extractText(match.file1.filepath);
        const text2=await extractText(match.file2.filepath);
        const matchedPositions = await getMatches(text1,text2);

        res.json({
            success:true,
            positions:matchedPositions
        })

    }catch(err){
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}

module.exports={getMatchedSections}