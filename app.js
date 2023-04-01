const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`mongodb connected ${process.env.MONGODB_URL}`)
  });
}).catch(err => {
  console.log(err);
  process.exit(1);
});