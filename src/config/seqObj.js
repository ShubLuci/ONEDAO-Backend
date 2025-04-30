const {Sequelize} = require('sequelize');

// Export the Sequlize postgres logged obj for creating models or authenticating Postgre SQL database
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);


module.exports = sequelize;