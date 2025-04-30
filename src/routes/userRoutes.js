const express = require('express');
const {checkRequestBody} = require('../middleware/validator');
const { hashPassword } = require('../utils/common');
const Users = require('../models/users');

const userRoutes = express.Router();

// User Sign Up
userRoutes.post('/users', checkRequestBody, async (req,res,next) => {
    try {
        // Hash User Password using bcrypt
        const hashedPassword = await hashPassword(req.body.password);
        if(hashedPassword.statusCode == 400)
            res.status(400).send(hashedPassword);
        req.insertObj = {
            email: req.body.email,
            password: hashedPassword,
            user_status: 'inactive'
        }
        console.log(req.insertObj);
        // Now insert user
        const response = await Users.create(req.insertObj)
        res.send(response);

    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `/users API Failed with message = ${err.message}`
        });
    }
    
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