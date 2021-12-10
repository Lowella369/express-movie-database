const {sequelize, DataTypes, Model} = require('./db')

//import models
const {Movie} = require('./models/Movie')
const {Cast} = require('./models/Cast')
const {Crew} = require('./models/Crew')



//association models
Movie.hasMany(Cast)
Cast.belongsTo(Movie)
Movie.hasMany(Crew)
Crew.belongsTo(Movie)

//export models with added associations
module.exports = {Movie, Cast, Crew, sequelize}