const express = require('express');
const {checkRequestBody} = require('../middleware/validator');


const userRoutes = express.Router();

// User Sign Up
userRoutes.post('/users', checkRequestBody,async (req,res,next) => {
    res.send(req.insertObj);
});

// Email Verification
userRoutes.patch('/users/verify-email', async (req,res) => {
    res.send("OK");
});

// Email Verification
userRoutes.post('/users/auth/login', async (req,res) => {
    res.send("OK");
});


module.exports = userRoutes;