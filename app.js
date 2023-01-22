// setup environment
const port = process.env.port || 3000;
const express = require('express');
const mongoose = require('mongoose');

// setup express app
const app = express();
app.use(express.json());

// routes
app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'});
});

// setup the start of the server
const start = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/storeDB'
        );
        app.listen(port, () => {
            console.log(`Server started on port ${port}.`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// start the server
start();
