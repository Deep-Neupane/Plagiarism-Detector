const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const checkRoutes = require('./routes/check')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/upload',uploadRoutes);
app.use('/api/check',checkRoutes)

module.exports = app;