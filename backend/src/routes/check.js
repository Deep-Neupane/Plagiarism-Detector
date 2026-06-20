const express = require('express');
const {checkPlagiarism}=require('../controllers/checkController');

const router = express.Router();

router.post('/:fileUploadId',checkPlagiarism);

module.exports=router;