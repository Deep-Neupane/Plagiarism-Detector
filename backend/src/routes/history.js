///history route
const express = require('express');
const {getAllMatches}=require('../controllers/historyController');

const router = express.Router();

router.get('/',getAllMatches);

module.exports = router;
