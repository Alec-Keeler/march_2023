const express = require('express');
const router = express.Router();

const { Pokemon, PokeOrigin, Trainer } = require('../db/models')

router.get('/', async(req, res) => {
    const pokemon = await Pokemon.findAll({
        include: {
            model: PokeOrigin,
            attributes: ['region'],
        },
        order: [[PokeOrigin, 'region', 'ASC']]
    })

    res.json(pokemon)
})

router.get('/:id', async(req, res, next) => {
    const pokemon = await Pokemon.findByPk(req.params.id, {
        include: [
            PokeOrigin, {
                model: Trainer,
                // attributes: 
                through: {
                    attributes: []
                }
            }
        ]
    })

    if (!pokemon) {
        const err = new Error(`There is no pokemon in our database with an id of ${req.params.id}`)
        err.statusCode = 404
        return next(err)
    } else {
        return res.json(pokemon)
    }
})

const createPokeChecker = (req, res, next) => {
    const { name, type, pokedexNum, evolves, popularity, region } = req.body

    const errors = []

    if (!name) errors.push('Please provide a name')
    if (!type) errors.push('Please provide a type')
    if (!pokedexNum) errors.push('Please provide the pokedex number')
    if (!evolves) errors.push('Please let us know if this pokemon can evolve')
    if (!popularity) errors.push('Please provide the popularity of this pokemon')
    if (!region) errors.push('Please provide the name of the region this pokemon is from')
    if (pokedexNum > 1010 || pokedexNum < 1) errors.push('PokedexNum must be between 1 and 1010')
    if (popularity > 100 || popularity < 1) errors.push('Popularity must be between 1 and 100')
    let typeOptions = ['fire', 'water', 'normal', 'rock', 'psychic', 'steel', 'dragon', 'electric']
    if (!typeOptions.includes(type)) errors.push('Type must be a valid option')
    if (name.length < 3 || name.length > 255) errors.push('Name must be between 2 and 255 characters')

    if (errors.length > 0) {
        const err = new Error(errors)
        err.statusCode = 400
        return next(err)
    }

    next()
}

router.post('/', createPokeChecker, async(req, res, next) => {
    const { name, type, pokedexNum, evolves, popularity, region } = req.body

    const origin = await PokeOrigin.findOne({
        where: {
            region
        }
    })

    const newPokemon = await origin.createPokemon({
        name,
        type,
        pokedexNum,
        evolves,
        popularity
    })

    res.json(newPokemon)
})


const updatePokeChecker = (req, res, next) => {
    const { name, type, pokedexNum, evolves, popularity, region } = req.body

    const errors = []

    if (pokedexNum && (pokedexNum > 1010 || pokedexNum < 1)) errors.push('PokedexNum must be between 1 and 1010')
    if ((popularity || popularity === 0) && (popularity > 100 || popularity < 1)) errors.push('Popularity must be between 1 and 100')
    let typeOptions = ['fire', 'water', 'normal', 'rock', 'psychic', 'steel', 'dragon', 'electric']
    if (type && !typeOptions.includes(type)) errors.push('Type must be a valid option')
    if (name && (name.length < 3 || name.length > 255)) errors.push('Name must be between 2 and 255 characters')

    if (errors.length > 0) {
        const err = new Error(errors)
        err.statusCode = 400
        return next(err)
    }

    next()
}

router.put('/:id', updatePokeChecker, async(req, res, next) => {
    const pokemon = await Pokemon.findByPk(req.params.id)

    if (!pokemon) {
        const err = new Error(`There is no pokemon in our database with an id of ${req.params.id}`)
        err.statusCode = 404
        return next(err)
    } 

    const { name, type, pokedexNum, popularity, evolves, originId } = req.body

    let setObj = {}

    console.log(req.body)
    if (name) {
        setObj.name = name
    }
    if (type) {
        setObj.type = type
    }
    if (pokedexNum) {
        setObj.pokedexNum = pokedexNum
    }
    if (popularity) {
        setObj.popularity = popularity
    }
    if (evolves === 0 || evolves || evolves === false) {
        setObj.evolves = evolves
    }
    if (originId) {
        setObj.originId = originId
    }
    console.log(setObj)
    pokemon.set(setObj)
    await pokemon.save()

    res.json(pokemon)

})

router.delete('/:id', async(req, res, next) => {
    const pokemon = await Pokemon.findByPk(req.params.id)

    if (!pokemon) {
        const err = new Error(`There is no pokemon in our database with an id of ${req.params.id}`)
        err.statusCode = 404
        return next(err)
    }

    await pokemon.destroy()

    res.json({
        message: `The pokemon with an id of ${req.params.id} has been successfully deleted!`
    })
})

module.exports = router;