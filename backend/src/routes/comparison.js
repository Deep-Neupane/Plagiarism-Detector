const express = require('express');
const { route } = require('./check');
const {getMatchedSections}=require('../controllers/comparisonController')

const router = express.Router();

router.get('/:matchID',getMatchedSections);

module.exports=router;