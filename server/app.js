require('dotenv').config();

const path = require('path');

const express = require('express');

const app = express();

const audioRoute = require('./routes.js');

app.use(express.static(path.join(__dirname, '/../dist')));

app.use('/audio', audioRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
