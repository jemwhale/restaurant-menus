const {db} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Restaurant model

const Restaurant = db.define('Restaurant', {
    name: {  
        type: DataTypes.STRING
    },
    location: {  
        type: DataTypes.STRING
    },
    cuisine: {  
        type: DataTypes.STRING
    },
    rating: {  
        type: DataTypes.NUMBER,
        validate: {
            checkLength(val){
                if (val < 0 || val > 10) throw new Error('Rating needs to be out of 10!')
            }
        }
    }
})

module.exports = {Restaurant};