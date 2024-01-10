require('dotenv').config;
const express = require('express');
const app = express();
const router = require('./routes');
app.use(express.json());

app.use('/api',router);

const port = process.env.port || 5500;

app.listen(port,(error)=>{
    if (error) throw error;
    console.log(`Server is running on ${port}`);
    })




