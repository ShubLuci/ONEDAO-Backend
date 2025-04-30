const express = require('express');
const {validateJWT} = require('../middleware/validator');
const productRoutes = express.Router();
const Product = require('../models/products');

// Create a new product. Requires valid JWT token in Authorization headers
productRoutes.post('/products',validateJWT, async (req,res) => {
    try {
        const {product_name} = req.body;
        const exisitingProduct = await Product.findOne({ where: { product_name: product_name } });
        if(exisitingProduct)
            res.status(400).send({
                statusCode: 400,
                message: `Product ${product_name} Already Exists `
            });
        else {
            let response = await Product.create({
                product_name: product_name,
                createdBy: req.jwtDecodedEmail,
                updatedBy: req.jwtDecodedEmail
            });
            res.send(response);
        }
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `POST /products API Failed with message = ${err.message}`
        });
    }
    
});

// 	Get a list of all products. Requires valid JWT token in Authorization headers
productRoutes.get('/products',validateJWT, async (req,res,next) => {
    try {
        const exisitingProduct = await Product.findAll();
        res.send(exisitingProduct)
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `GET ALL /products API Failed with message = ${err.message}`
        });
    }
});

// Get a single product by product name. Requires valid JWT token in Authorization headers
productRoutes.get('/products/:product_name',validateJWT, async (req,res) => {
    try {
        const {product_name} = req.params;
        const exisitingProduct = await Product.findOne({ where: { product_name: product_name } });
        if(exisitingProduct) {
            res.send(exisitingProduct)
        } else {
            res.status(400).send({
                statusCode: 400,
                message: `There are no products named ${product_name}`
            })
        }
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `GET /products based on product_name API Failed with message = ${err.message}`
        });
    }
});

// Update product_name to a new name. Requires valid JWT token in Authorization headers
productRoutes.patch('/products',validateJWT, async (req,res) => {
    try {
        const {old_product_name,new_product_name} = req.body;
        const [response] = await Product.update(
            { product_name: new_product_name },
            { where: { product_name: old_product_name } }
          );
        if (response === 0) {
            return res.status(404).send({
              statusCode: 404,
              message: `No product found with name "${old_product_name}"`
            });
          }
        res.status(200).send({
            statusCode: 200,
            message: `Updated product name from "${old_product_name}" to "${new_product_name}"`
        });
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `PATCH /products API Failed with message = ${err.message}`
        });
    }
});

// 	Delete a product by product_name. Requires valid JWT token in Authorization headers
productRoutes.delete('/products/:product_name',validateJWT, async (req,res) => {
    try {
        const {product_name} = req.params;
        const response = await Product.destroy({ where: { product_name: product_name } });
        if(response!=0) {
            res.status(200).send({
                message: `Product ${product_name} has been deleted`
            });
        } else {
            res.status(400).send({
                statusCode: 400,
                message: `DELETE not possible as there are no products named ${product_name}`
            });
        }
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `GET /products based on product_name API Failed with message = ${err.message}`
        });
    }
});

module.exports = productRoutes;