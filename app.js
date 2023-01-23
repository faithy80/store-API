// setup environment
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


// setup express app
const app = express();
app.use(express.json());

mongoose.set('strictQuery', true);

const { Item } = require("./models");

const port = process.env.PORT || 3000;


// routes
app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'});
});


// API routes
app.get("/items", async (req, res) => {
    const allItems = await Item.find();
    return res.status(200).json(allItems);
});


// connect to DB and start the server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to DB.');
    })
    .catch((err) => {
        console.log(err.message);
    });

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
