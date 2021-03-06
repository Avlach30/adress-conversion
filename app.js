const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRouter = require('./router/auth.js');
const addressRouter = require('./router/address.js');

const app = express();
dotenv.config();

app.use(express.json());

//* Set headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

//* Config for routers
app.use('/api/auth', authRouter);
app.use('/api', addressRouter);

//* Config for error response
app.use((error, req, res, next) => {
  // console.log(error.message);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(statusCode).json({message: message, data: data, statusCode: statusCode});
});

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.g6m6p.mongodb.net/${process.env.MONGO_DEFAULT_DB}?retryWrites=true&w=majority`;

//* Connect to mongodb cloud database and listen to local server
mongoose.connect(MONGODB_URI)
  .then(result => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected at mongodb database`);
      console.log(`Server connected at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(error => { console.log(error) })