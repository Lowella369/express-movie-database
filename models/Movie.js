const {sequelize} = require('../db')
const {DataTypes, Model} = require('sequelize')

class Movie extends Model {}

Movie.init({
    title: DataTypes.STRING

}, {
    sequelize,
    timestamps: false
})

module.exports = {Movie}