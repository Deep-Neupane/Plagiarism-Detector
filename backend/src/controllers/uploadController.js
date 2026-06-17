const {PrismaClient}=require('@prisma/client');
const path = require('path');

const prisma = new PrismaClient();

const uploadFiles = async (req,res)=>{
    try{
        if(!req.files || req.files.length === 0){
            return res.status(400).json({ error: 'No files uploaded' });
        }
        const fileUpload=await prisma.fileUpload.create({
            data:{}
        });

        const uploadedFiles = await prisma.uploadedFile.createMany({
            data:req.files.map(file=>({
                fileUploadId:fileUpload.id,
                filename: file.originalname,
            filepath: file.path,
            fileSize: file.size
            }))
        });

        res.json({
            success: true,
            fileUploadId: fileUpload.id,
            filesCount: req.files.length,
            files: req.files.map(f => ({
            filename: f.originalname,
            size: f.size
            }))
        });
        
    }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }

}

module.exports={uploadFiles}