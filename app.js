// setup environment
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// setup express app
const app = express();
app.use(express.json());
mongoose.set('strictQuery', true);
const port = process.env.PORT || 3000;

// routes
app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'});
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
