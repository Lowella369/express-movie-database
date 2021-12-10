const {sequelize} = require('../db')
const {DataTypes, Model} = require('sequelize')

class Crew extends Model{}

Crew.init({
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    department: DataTypes.STRING
}, {
    sequelize,
    timestamps: false
})

module.exports = {Crew}