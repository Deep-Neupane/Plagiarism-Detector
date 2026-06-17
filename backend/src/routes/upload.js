const express = require('express');
const upload = require('../middleware/upload');
const { uploadFiles } = require('../controllers/uploadController');
const router = express.Router();

router.post('/',upload.array('files',60),uploadFiles);

module.exports = router;