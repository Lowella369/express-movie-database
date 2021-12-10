//const {MenuItems, Menu, Restaurant, sequelize} = require('./index')
const {Movie} = require('./models/Movie')
const {sequelize} = require('./db')
const {Cast} = require('./models/Cast')
const { Crew } = require('./models/Crew')

describe('Express Movie Database', () => {
    beforeAll(async() => {
        await sequelize.sync({force:true})

        //create array of movies that will be added to the Movie model
        const arrayOfMovies = [
            {title: 'Pearl Harbor'},
            {title: 'Home Alone 1'},
            {title: 'Hunter Games'},
            {title: 'Black Hawk Down'}
        ]

        //create array of casts that will be added to the Cast model
        const arrayOfCasts = [
            {name: "Ben Affleck", role: "Captain Rafe McCawley"},
            {name: "Josh Hartnet", role: "Captain Danny Walker"},
            {name: "Kate Beckinsale", role: "Evelyn Johnson"}
        ]

        //create array of crews that will be added to the Crew model
        const arrayOfCrews = [
            {name: "John Schwartzman", position: "Director of Photography", department: "Cinematography"},
            {name: "Hans Zimmer", position: "Music", department: "Music"},
            {name: "Nigel Phelps", position: "Production Design", department: "Production Design"},
            {name: "Martin Laing", position: "Supervising Art Director", department: "Art Direction"}
        ]

        //added arrays to the db
        await Movie.bulkCreate(arrayOfMovies)
        await Cast.bulkCreate(arrayOfCasts)
        await Crew.bulkCreate(arrayOfCrews)
        
    })

    //test cases for Movie model
    test('can create movie', async() => {
        //read movie instance from db
        const movieList = await Movie.findAll()

        //assert that lenght of movieList is 4
        expect(movieList.length).toBe(4)
    })

    test('movie has title', async() => {
        //read movie instance from db
        const movieName = await Movie.findAll()

        //assert that movie title is Pearl Harbor
        expect(movieName[0].title).toBe('Pearl Harbor')
    })

    //test cases for Cast model
    test('can create cast', async() => {
        //read cast instance from db
        const castList = await Cast.findAll()

        //assert that length of castList is 3
        expect(castList.length).toBe(3)
    })

    test('cast has name', async() => {
        //read cast instance from db
        const castName = await Cast.findAll()

        //assert that name of cast index 1 is Josh Hartnet
        expect(castName[1].name).toBe('Josh Hartnet')
    })

    test('cast has role', async() => {
        //read cast instance from db
        const castRole = await Cast.findAll()

        //assert that role of cast index 1 is Captain Danny Walker
        expect(castRole[1].role).toBe('Captain Danny Walker')
    })

    //test cases for Crew model
    test('crew has name', async() => {
        //read crew instance from db 
        const crewName = await Crew.findAll()

        //assert that name of crew index 1 is 
        expect(crewName[1].name).toBe('Hans Zimmer')
    })

    test('can create crew', async() => {
        //read crew instance from db
        const crewList = await Crew.findAll()

        //assert that crewList lenght is 4
        expect(crewList.length).toBe(4)
    })

    test('crew has position', async() => {
        //read crew instance from db 
        const crewPosition = await Crew.findAll()

        //assert that position of crewPosition index 2
        expect(crewPosition[2].position).toBe('Production Design')
    })

    test('crew has department', async() => {
        //read crew instance from db
        const crewDepartment = await Crew.findAll()

        //assert that department of crewDepartment index 0
        expect(crewDepartment[0].department).toBe('Cinematography')
    })

    afterAll(async()=> {
        sequelize.close()
    })

})