const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const checkRoutes = require('./routes/check')
const resultsRoutes = require('./routes/results')
const historyRoutes = require('./routes/history')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload',uploadRoutes);
app.use('/api/check',checkRoutes);
app.use('/api/results',resultsRoutes);
app.use('/api/history',historyRoutes);

module.exports = app;