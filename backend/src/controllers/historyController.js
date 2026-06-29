
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const getAllMatches = async (req,res) => {
    try{
        const matches = await prisma.plagiarismMatch.findMany({
            include:{
                file1:true,
                file2:true
            },
            orderBy:{
                createdAt:'desc'
            }
        });
        const formattedResults = matches.map(match=>({
            id:match.id,
            fileUploadId:match.sessionId,
            file1: match.file1.filename,
            file2:match.file2.filename,
            plagiarismPercentage: Math.round(match.similarityScore * 100),
            exactMatchPercentage: match.exactMatchPercentage,
            paraphrasePercentage: match.paraphrasePercentage,
            createdAt: match.createdAt
        }))
        res.json({
            success: true,
            totalMatches: formattedResults.length,
            results: formattedResults
        });
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
}

module.exports = {getAllMatches}
