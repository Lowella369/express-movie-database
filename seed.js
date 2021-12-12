const {sequelize} = require('./db')
const {Movie, Cast, Crew} = require('./index')

const seedMovies = [
    {title: 'Pearl Harbor'},
    {title: 'Home Alone 1'},
    {title: 'Hunter Games'},
    {title: 'Black Hawk Down'}
]

const seedCasts = [
    {name: "Ben Affleck", role: "Captain Rafe McCawley", MovieId: 1},
    {name: "Josh Hartnet", role: "Captain Danny Walker", MovieId: 1},
    {name: "Kate Beckinsale", role: "Evelyn Johnson", MovieId: 1}
]

const seedCrews = [
    {name: "John Schwartzman", position: "Director of Photography", department: "Cinematography", MovieId: 1},
    {name: "Hans Zimmer", position: "Music", department: "Music", MovieId: 1},
    {name: "Nigel Phelps", position: "Production Design", department: "Production Design", MovieId: 1},
    {name: "Martin Laing", position: "Supervising Art Director", department: "Art Direction", MovieId: 1}
]

//creates or inserts data to the models
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Movie.bulkCreate(seedMovies, {validate: true})
    await Cast.bulkCreate(seedCasts, {validate: true})
    await Crew.bulkCreate(seedCrews, {validate: true})
    console.log('Data has successfully inserted!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//calls seed function
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Error Seeding data!')
      console.error(err)
    })