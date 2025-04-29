const express = require('express');

const productRoutes = express.Router();

// Create a new product
productRoutes.post('/products', async (req,res) => {
    res.send("OK");
});

// 	Get a list of all products
productRoutes.get('/products', async (req,res) => {
    res.send(req.body);
});

// Get a single product by ID
productRoutes.get('/products/:product_id', async (req,res) => {
    res.send(req.params.product_id);
});

// Update a product completely by ID
productRoutes.put('/products/:product_id', async (req,res) => {
    res.send(req.params.product_id);
});

// Update part of a product
productRoutes.patch('/products/:product_id', async (req,res) => {
    res.send(req.params.product_id);
});

// 	Delete a product by ID
productRoutes.delete('/products/:product_id', async (req,res) => {
    res.send(req.params.product_id);
});

module.exports = productRoutes;