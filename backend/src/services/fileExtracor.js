const fs = require('fs/promises');
const path = require('path');
const pdfParse = require('pdf-parse');

const extractText = async (filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  
  if (ext === '.pdf') {

    const buffer = await fs.readFile(filepath);
    const pdfData = await pdfParse(buffer);
    return pdfData.text;
  } else if (ext === '.txt') {

    return await fs.readFile(filepath, 'utf-8');
  } else {
    throw new Error('Unsupported file type: ' + ext);
  }
};

module.exports = { extractText };