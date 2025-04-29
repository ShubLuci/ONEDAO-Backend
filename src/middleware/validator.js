function checkRequestBody(req,res,next) {
    const {email,password,affiliate} = req.body;

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
    } else if(!affiliate) {
        res.status(400).send({
            statusCode: 400,
            message: "'affiliate' parameter required in request body."
        });
    } else {
        req.insertObj = {
            email,password,affiliate
        }
        next();
    }
};

module.exports = {
    checkRequestBody
}