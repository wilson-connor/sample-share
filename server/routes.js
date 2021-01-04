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

audioRoute.get('/:id', (req, res) => {
  const { id } = req.params;
  const location = path.join(__dirname, '/../dist/assets/', id);

  fs.access(location, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      res.download(location, 'fun.wav', (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
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

audioRoute.delete('/:id', (req, res) => {
  const { id } = req.params;
  const location = path.join(__dirname, '/../dist/assets/', id);

  fs.access(location, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      fs.unlink(location, (err) => {
        if (err) {
          console.log(err);
          res.status(400).send('bad');
        } else {
          res.status(200).end();
        }
      });
    }
  });
});

module.exports = audioRoute;
