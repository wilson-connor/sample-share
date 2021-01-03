const express = require('express');

const multer = require('multer');

const upload = multer();

const audioRoute = express.Router();

const path = require('path');

const fs = require('fs');

audioRoute.get('/', (req, res) => {
  const location = path.join(__dirname, '/../dist/assets');
  fs.readdir(location, (err, files) => {
    res.status(200).send(files);
  });
});

audioRoute.post('/', upload.single('audio'), (req, res) => {
  const location = path.join(__dirname, '/../dist/assets/', req.file.originalname);
  fs.writeFile(location, Buffer.from(req.file.buffer), (err) => {
    if (err) {
      console.log(err);
      res.status(400).send('didnt work');
    } else {
      res.status(200).end();
    }
  });
});

module.exports = audioRoute;
