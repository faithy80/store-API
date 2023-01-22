// setup environment
const port = process.env.port || 3000;
const express = require('express');

// setup express app
const app = express();
app.use(express.json());

// routes
app.get('/', (req, res) => {
    return res.json({message: 'Hello World!'});
});

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server started on port ${port}.`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
