const express = require('express');
const {checkSignUpRequestBody, checkLoginRequestBody} = require('../middleware/validator');
const { hashPassword,checkPassword,generateJwtToken } = require('../utils/common');
const Users = require('../models/users');

const userRoutes = express.Router();

// User Sign Up
userRoutes.post('/users', checkSignUpRequestBody, async (req,res,next) => {
    try {
        const data = await Users.findByPk(req.body.email);
        if(data)
            res.status(400).send({
                statusCode: 400,
                message: `User Email ${req.body.email} Already Exists `
            });
        else {
            // Hash User Password using bcrypt
            const hashedPassword = await hashPassword(req.body.password);
            if(hashedPassword.statusCode == 400)
                res.status(400).send(hashedPassword);
            req.insertObj = {
                email: req.body.email,
                password: hashedPassword,
                user_status: 'inactive'
            }
            
            // Now insert user
            const response = await Users.create(req.insertObj)
            res.send(response);
        }
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `/users API Failed with message = ${err.message}`
        });
    }

});

// Activate User
userRoutes.patch('/users/verify-email', async (req,res) => {
    try {
        const emailExists = await Users.findByPk(req.query.email);
        if(emailExists) {
            let data = await Users.update(
                { user_status: 'active' },              
                { where: { email: req.query.email } } 
            );
            res.status(204).send(data);
        } else {
            res.status(400).send({
                statusCode: 400,
                message: `User Email ${req.query.email} Does Not Exists`
            });
        }  
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `Email Verification failed with error message = ${err.message}`
        })
    }
    
});

// User Authentication and generate JWT token.
userRoutes.post('/users/auth/login', checkLoginRequestBody, async (req,res,next) => {
    try {
        const {email,password} = req.body
        const data = await Users.findOne({ where: { email: email, user_status: 'active' } });
        if(!data) {
            res.status(400).send({
                statusCode: 400,
                message: `User ${email} Either Does Not Exist or is not a active user`
            });
        } else if(!await checkPassword(password,data.password)) {
            res.status(400).send({
                statusCode: 400,
                message: `Invalid Password`
            });
        } else {
                req.userData = await Users.findOne({ 
                    where: { email: email, user_status: 'active' }, 
                    attributes: ['email', 'user_status'] 
                });
                next();
        }
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `ERROR in /users/auth/login API with message = ${err.message}`
        });
    }
}, generateJwtToken );


module.exports = userRoutes;