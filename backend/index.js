const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  const { file, body: { newFilename } } = req;
  
  if (!file) {
    return res.status(400).json({ message: 'No file provided.' });
  }
  
  const extension = path.extname(file.originalname);
  const newFileName = `${newFilename}${extension}`;
  const newPath = path.join(__dirname, 'uploads', newFileName);

  // Rename the file
  fs.rename(file.path, newPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error occurred while renaming the file.' });
    }

    return res.status(200).json({ message: 'File uploaded and renamed successfully.' });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
