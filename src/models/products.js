const { DataTypes } = require('sequelize');

const sequelize = require('../config/seqObj');

// Define the Schema for table 'Lot' with all variables and their types
const Products = sequelize.define('Products', {
    product_id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    product_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    createdBy: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        references: { model: 'users', key: 'email' } 
    },
    updatedBy: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        references: { model: 'users', key: 'email' } 
    },
    product_status: { 
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'active'
    }
  }, { tableName: 'products', timestamps: true }
);

module.exports = Products;