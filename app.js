const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const firebase = require('./config/firebase-admin');
const multer = require('multer')

// Routes
const authRoutes = require("./routes/auth");
app.use(cors());
// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);

const upload = multer({
  storage: multer.memoryStorage()
})
app.post('/upload', upload.single('file'), (req, res) => {
  if(!req.file) {
      return res.status(400).send("Error: No files found")
  } 

  const blob = firebase.bucket.file(req.file.originalname)
  
  const blobWriter = blob.createWriteStream({
      metadata: {
          contentType: req.file.mimetype
      }
  })
  
  blobWriter.on('error', (err) => {
      console.log(err)
  })
  
  blobWriter.on('finish', () => {
      res.status(200).send("File uploaded.")
  })
  
  blobWriter.end(req.file.buffer)
})
// PORT
const port = 3000;

// Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});


