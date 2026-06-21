const {PrismaClient}=require('@prisma/client');

const prisma = new PrismaClient();

const getResults =async (req,res) => {
    try{
        const { fileUploadId } = req.params;
        const matches = await prisma.plagiarismMatch.findMany({
            where:{fileUploadId:fileUploadId},
            include:{
                file1:true,
                file2:true
            }
        });
        if (matches.length === 0) {
            return res.status(404).json({ error: 'No plagiarism results found' });
        }

        const formattedResults = matches.map(match => ({
            id: match.id,
            file1: match.file1.filename,
            file2: match.file2.filename,
            plagiarismPercentage: Math.round(match.similarityScore * 100),
            exactMatchPercentage: match.exactMatchPercentage,
            paraphrasePercentage: match.paraphrasePercentage,
            createdAt: match.createdAt
        }));

    res.json({
      success: true,
      fileUploadId,
      totalMatches: matches.length,
      results: formattedResults
    });

    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
}

module.exports={getResults};