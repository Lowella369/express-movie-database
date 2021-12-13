const express = require('express')
const path = require('path') 
const {check, validationResult} = require('express-validator');

const {Movie, Cast, Crew} = require('./index') 

//configure express app
const app = express()
const port = 8000

//points toward folder of static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

//Movie model
//create new movie
app.post('/movies', [check('title').not().isEmpty().trim().escape()],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            //display message if title is empty
            return res.status(400).json({errors: errors.array()})
        } else {
            let newMovie = await Movie.create(req.body)
            res.send(`Movie id: ${req.body.id} has successfully created!`)
        }
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

//delete specific movie
app.delete('/movies/:id', async(req, res) => {
    await Movie.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Movie id: ${req.params.id} has successfully deleted!`)
})
//END

//Cast model
//POST method on /casts route
//create or insert new cast into the Cast model
app.post('/casts', [check('name').not().isEmpty().trim().escape()],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            //display error message if name is empty
            return res.status(400).json({errors: errors.array()})
        } else {
            //create a cast using the json object passed in the request body
            let newCast = await Cast.create(req.body)
            res.send(`Cast id: ${req.body.id} has successfully created!`)
        }
})

//GET method on /casts route
//returns all casts
app.get('/casts', async(req, res) => {
    //find all instances of the model Cast
    const allCasts = await Cast.findAll()

    //respond with allCasts as a json object
    res.json(allCasts)
})

//returns specific instance of cast by id
app.get('/casts/:id', async(req, res) => {
    const thisCast = await Cast.findByPk(req.params.id)
    res.send(thisCast)
})

//returns specific cast by name
app.get('/casts-name/:name', async(req, res) => {
    //find one specific instances of the cast model
    const thisCast = await Cast.findOne({
        where: {
            name: req.params.name
        }
    })

    //respond with specific json object
    res.json(thisCast)
})

//update one Cast by id
app.put('/casts/:id', async(req, res) => {
    let updateCast = await Cast.update(req.body, {
        where: { id: req.params.id}
    })
    res.send(`Cast id: ${req.params.id} has successfully updated!`)
})

//delete specific cast by id
app.delete('/casts/:id', async(req, res) => {
    await Cast.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send(`Cast id: ${req.params.id} has successfully deleted!`)
})

//Crew model
//create new crew
app.post('/crews', [check('name').not().isEmpty().trim().escape()],
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            //display error message if name is empty
            return res.status(400).json({errors: errors.array()})
        } else {
            //create a cast using the json object passed in the request body
            let newCrew = await Crew.create(req.body)
            res.send(`Crew id: ${req.body.id} has successfully created!`)
        }
})

//GET method on /crew route 
//returns all crews
app.get('/crews', async(req, res) => {
    //find all instances of the model Crew
    const allCrews = await Crew.findAll()

    //respond with crew as a json object
    res.json(allCrews)
})

//returns specific crew by id
app.get('/crews/:id', async(req, res) => {
    //find one specific instances of the crew model
    const thisCrew = await Crew.findByPk(req.params.id)

    //respond with specific json object
    res.json(thisCrew)
})

//update one crew by id
app.put('/crews/:id', async(req, res) => {
    let updateCrew = await Crew.update(req.body, {
        where: {
            id: req.params.id
        }
    })

    res.send(`Crew id: ${req.body.id} has successfully updated!`)
})

//delete one crew by id
app.delete('/crews/:id', async(req, res) => {
    await Crew.destroy({
        where: {
            id: req.params.id
        }
    })

    res.send(`Crew id: ${req.params.id} has successfully deleted!`)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})