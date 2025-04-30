const jwt = require('jsonwebtoken');

// Middleware to check if the request body has all the required keys for /users API
function checkSignUpRequestBody(req,res,next) {
    const {email,password,affiliate_name} = req.body;
    const BLOCKED_COUNTRIES = process.env.BLOCKED_COUNTRIES.split(',');
    if(!email) {
        res.status(400).send({
            statusCode: 400,
            message: "'email' parameter required in request body."
        });
    } else if(!password) {
        res.status(400).send({
            statusCode: 400,
            message: "'password' parameter required in request body."
        });
    } else if(!affiliate_name) {
        res.status(400).send({
            statusCode: 400,
            message: "'affiliate_name' parameter required in request body."
        });
        // Check if affiliates added is blocked country
    } else if(BLOCKED_COUNTRIES.includes(affiliate_name.toLowerCase())) {
        res.status(400).send({
            statusCode: 400,
            message: `${affiliate_name} is an unauthorized country.`
        });
    } else {
        next();
    }
};

// Middleware to check if the request body has all the required keys for /auth/login API
function checkLoginRequestBody(req,res,next) {
    const {email,password} = req.body;
    if(!email) {
        res.status(400).send({
            statusCode: 400,
            message: "'email' parameter required in request body."
        });
    } else if(!password) {
        res.status(400).send({
            statusCode: 400,
            message: "'password' parameter required in request body."
        });
    } else {
        next();
    }
};


// Check if the JWT token passed is a valid token or not
async function validateJWT(req,res,next) {
    try {
        const {authorization} = req.headers;
        const {data} = await jwt.verify(authorization,process.env.JWT_AUTH);
        req.jwtDecodedEmail = data.email
        next();
    } catch(err) {
        res.status(400).send({
            statusCode: 400,
            message: `JWT Validation Failed with message = ${err.message}`
        });
    }
}

module.exports = {
    checkSignUpRequestBody,
    checkLoginRequestBody,
    validateJWT
}