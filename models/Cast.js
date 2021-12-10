const {sequelize} = require('../db')
const {DataTypes, Model} = require('sequelize')

class Cast extends Model{}

Cast.init({
    name: DataTypes.STRING,
    role: DataTypes.STRING
}, {
    sequelize,
    timestamps: false
})

module.exports = {Cast}