const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require('./routes/userRouter')
const employeeRouter = require('./routes/employeeRouter');
require('dotenv').config();
const path = require('path');
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);



app.use(express.static(path.join(__dirname, 'public')));

const db = process.env.mongodb;

mongoose
  .connect(
    `${db}`
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  app.use('/',userRouter);
app.use('/employee', employeeRouter);
const port = process.env.PORT || 10000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));