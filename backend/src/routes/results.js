const express = require('express');
const {getResults}=require('../controllers/resultsController');

const router = express.Router();

router.get('/:fileUploadId',getResults);

module.exports = router;