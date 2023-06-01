const express = require('express')
const app = express()
require('dotenv').config()

const { Trainer, Pokemon, PokeOrigin, PokeTrainer } = require('./db/models')
const { Op } = require("sequelize");

app.use(express.json())

app.post('/related-create', async(req, res) => {
    // create a 1-M related record (associate a given new pokemon to an existing origin)
    const pokeOrigin = await PokeOrigin.findByPk(1)
    const newPoke = await pokeOrigin.createPokemon({
        name: 'Pikachu',
        type: 'Electric',
        pokedexNum: 25,
        evolves: true,
        popularity: 93
    })

    // create 1 or more M-M related records (associate an existing pokemon to existing trainers)
    await newPoke.addTrainers([1, 2, 3])

    const alecsPokemon = await Trainer.findByPk(1, {
        include: Pokemon
    })
    res.json(alecsPokemon)
})

app.get('/getpokemon', async(req, res) => {
    // const pokeOrigin = await PokeOrigin.findOne({
    //     where: {region: 'Kanto'}
    // })
    // const pokemon = await pokeOrigin.getPokemons()

    const pokemon = await Pokemon.findOne({
        where: {name: 'Charmander'}
    })
    const pokeOrigin = await pokemon.getPokeOrigin()
    res.json({
        PokeOrigin: pokeOrigin,
        Pokemon: pokemon
    })
})

app.get('/pokeorigins', async(req, res) => {
    try {
        const data = await PokeOrigin.findOne({
            where: {region: 'Kanto'},
            include: Pokemon
        })
        res.json(data)
    } catch(e) {
        console.log(e)
    }
})

app.get('/poketrainers', async(req, res) => {
    const data = await Trainer.findOne({
        where: {
            name: 'Alec'
        },
        attributes: ['name', 'age'],
        // include: Pokemon
        // include: [Pokemon]
        include: {
            model: Pokemon,
            attributes: ['name', 'type'],
            through: { //targets join table
                attributes: []
            }
            // include: {
            //     model: PokeOrigin,
            //     attributes: ['region']
            // }
        }
    })
    res.json(data)
})

app.get('/pokemon', async(req, res) => {
    const {name} = req.query
    const pokemon = await Pokemon.findAll({
        order: [['type'], ['name', 'DESC']],
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        },
        attributes: ['name', 'type']
    }) // SELECT name, type FROM Pokemons WHERE name LIKE %name% ORDER BY type, name DESC;
    res.json(pokemon)
})

app.get('/pokemon/:id', async(req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id, {})
    res.json(pokemon)
})

app.get('/trainers/:name', async(req, res) => {
    const trainer = await Trainer.findOne({
        where: {
            name: [req.params.name]
        }
    })
    // SELECT * FROM Trainers WHERE name = req.params.name
    res.json(trainer)
})

app.post('/trainers', async(req, res) => {
    console.log(req.body)
    const { name, age, gender, gymLeader, numBadges } = req.body
    const trainer = Trainer.build({
        name: name,
        age, //age: age
        gender,
        gymLeader,
        numBadges
    })
    // trainer.validate()
    await trainer.save()
    res.json({
        message: 'Successfully built a Trainer',
        trainer
    })
})

app.post('/pokemon', async(req, res) => {
    const {name, type, pokedexNum, evolves, popularity, originId} = req.body

    const pokemon = await Pokemon.create({
        name,
        type,
        pokedexNum,
        evolves,
        popularity,
        originId
    })

    res.json({
        message: "Successfully created a pokemon",
        pokemon
    })
})

app.put('/pokemon/:id', async(req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)
    const { name, type, pokedexNum, evolves, popularity, originId } = req.body

    if (name) {
        pokemon.name = name
        // pokemon.wassup = "hey there"
    }

    if (type) {
        pokemon.type = type
    }

    if (pokedexNum) {
        pokemon.pokedexNum = pokedexNum
    }

    await pokemon.save()

    const updatedPokemon = await Pokemon.findByPk(req.params.id)
    res.json(updatedPokemon)
})

app.delete('/pokemon/:id', async(req, res) => {
    const pokemon = await Pokemon.findByPk(req.params.id)

    await pokemon.destroy() 

    res.json({
        message: `The pokemon with an id of ${req.params.id} has been DESTROYED :)`
    })
})

app.delete('/origin/:id', async(req, res) => {
    const pokeOrigin = await PokeOrigin.findByPk(req.params.id)
    await pokeOrigin.destroy();
    res.json('Deleted the pokemon origin record')
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
