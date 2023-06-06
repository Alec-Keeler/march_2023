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

module.exports = router;