const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/mydatabase');


const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', itemSchema);

app.get('/',(req,res)=>{
    res.redirect(`/items`);
})

app.post('/items', async (req, res) => {
    try {
        console.log(req.body);
        const newItem = new Item(req.body);
        
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedItem == null) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (deletedItem == null) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});