const express = require('express')
const path = require('path') 

const {Movie, Cast, Crew} = require('./index') 

//configure express app
const app = express()
const port = 8000

//points toward folder of static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Movie model
//create new movie
app.post('/movies', async(req, res) => {
    //create a movie using the json object passed in the request body
    let newMovie = await Movie.create(req.body)
    
    //send a response string
    res.send(`Movie id: ${req.body.id} has successfully created!`)
})

//GET method on /movie route 
//returns all movie
app.get('/movies', async (req,res) => {
    //find all instances of the Model Movie
    const allMovies = await Movie.findAll()

    //respond with allMovies as a json object
    res.json(allMovies)
})

//returns specific instance of movie by id
app.get('/movies/:id', async(req, res) => {
    const thisMovie = await Movie.findByPk(req.params.id)
    res.send(thisMovie)
})

//returns specific movie by name
app.get('/movies-name/:title', async(req, res) => {
    //find one specific instances of the movie model
    const thisMovie = await Movie.findOne({
        where: {
            title: req.params.title
        }
    })

    //respond with specific json object
    res.json(thisMovie)
})

//update one movie by id
app.put('/movies/:id', async(req, res) => {
    let updateMovie = await Movie.update(req.body, {
        where: { id: req.params.id}
    })
    res.send(`Movie id: ${req.params.id} has successfully updated!`)
})

//delete specific restaurant
app.delete('/movies/:id', async(req, res) => {
    await Movie.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Movie id: ${req.params.id} has successfully deleted!`)
})
//END

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})