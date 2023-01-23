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

app.get("/items/:id", async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    return res.status(200).json(item);
});
  
app.post("/items", async (req, res) => {
    try{
        const newItem = new Item({ ...req.body });
        const insertedItem = await newItem.save();
        return res.status(201).json(insertedItem);
    } catch (err) {
        if (err.name ==='ValidationError') {
            return res.status(400).send(err.message);
        }
        res.status(500).send("Something went wrong");
    }
});

app.put("/items/:id", async (req, res) => {
    const { id } = req.params;
    await Item.updateOne({ id }, req.body);
    const updatedItem = await Item.findById(id);
    return res.status(200).json(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    return res.status(200).json(deletedItem);
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
