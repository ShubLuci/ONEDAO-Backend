const { DataTypes } = require('sequelize');

const sequelize = require('../config/seqObj');

// Define the Schema for table 'Lot' with all variables and their types
const Users = sequelize.define('Users', {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    user_status: { 
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'inactive'
    }
  }, { tableName: 'users', timestamps: true }
);

module.exports = Users;