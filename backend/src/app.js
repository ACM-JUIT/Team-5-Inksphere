const express = require('express');
const connectDB = require('./DB/db');

connectDB();

const app = express();

app.use(express.json());



module.exports =app;