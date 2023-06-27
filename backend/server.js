const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/my-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model for storing files in MongoDB
const fileSchema = new mongoose.Schema({
  filename: String,
});
const File = mongoose.model('File', fileSchema);

// Handle file uploads
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { filename } = req.file;

  // Rename the file (optional)
  const newFilename = `${Date.now()}_${filename}`;
  const newPath = path.join(__dirname, 'uploads', newFilename);
  fs.renameSync(req.file.path, newPath);

  // Store the file in MongoDB
  try {
    const file = new File({ filename: newFilename });
    await file.save();
    res.status(200).send('File uploaded successfully!');
  } catch (error) {
    console.error('Error storing file:', error);
    res.status(500).send('Error storing file!');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
