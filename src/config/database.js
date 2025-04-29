const sequelize = require('./seqObj');

async function dbConnection() {
    try {
        await sequelize.authenticate();
        console.log(`SUCCESS > src/config/database.js > dbConnection > DB Connection Successful`);
    } catch(err) {
        console.error(`SUCCESS > src/config/database.js > dbConnection > DB Connection Failed with message = ${err.message}`);
    }
}

module.exports = {
    dbConnection
}