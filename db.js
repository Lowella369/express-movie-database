const {Sequelize, DataTypes, Model} = require('sequelize')

const sequelize = new Sequelize('database', 'username', 'password',{
    dialect: 'sqlite', //type of SQL
    storage: './expressmoviedatabase.sqlite', //file location for db
    logging: false 
})

module.exports = {sequelize, DataTypes, Model} 