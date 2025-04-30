const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./config/database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

const EXPRESS_PORT = process.env.EXPRESS_PORT;

// IIFE to setup express server and PostgreSQL database
(async () => {
    try {
        app.listen(EXPRESS_PORT, () => {
            console.log(`SUCCESS > src/index.js > IIFE > EXPRESS SERVER RUNNING AT PORT ${EXPRESS_PORT}`);
        });
        dbConnection();
    } catch(err) {
        console.error(`ERROR > src/index.js > IIFE > EXPRESS SERVER CREATION FAILED WITH ERROR MESSAGE = ${err.message}`)
    }
})();


app.use(express.json());        // For parsing json response
app.use(cors());                // For enabling CORS


app.use('/',userRoutes);        // User API Routes
app.use('/',productRoutes);     // Product API Routes
