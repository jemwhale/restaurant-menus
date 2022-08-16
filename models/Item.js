const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

const Item = db.define('Item', {
    name: {  
        type: DataTypes.STRING
    },
    image: {  
        type: DataTypes.STRING
    },
    price: {  
        type: DataTypes.NUMBER
    },
    vegetarian: {  
        type: DataTypes.BOOLEAN
    }
})

module.exports = {Item};