const {PrismaClient} = require('@prisma/client');
const fs = require('fs/promises');
const {getMatches}=require('../services/comparisonService')


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

        const text1=await fs.readFile(match.file1.filepath,"utf-8");
        const text2=await fs.readFile(match.file2.filepath,"utf-8");

        const matchedPositions = await getMatches(text1,text2);

        res.json({
            success:true,
            positions:matchedPositions
        })

    }catch(err){
        console.log(err.message);
        res.status(400).json({ error: err.message })
    }
}

module.exports={getMatchedSections}