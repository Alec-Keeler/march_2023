const express = require('express')
const app = express()
require('dotenv').config()

const { Trainer, Pokemon, PokeOrigin, PokeTrainer } = require('./db/models')
const { Op } = require("sequelize");

const pokeRouter = require('./routes/pokemon')

app.use(express.json())

app.use('/pokemon', pokeRouter)

app.get('/search', async(req, res) => {
    // determine pagination values (limit, offset) from size/page query strings
    let { page, size, name, minPop, region } = req.query
    if (!size) size = 5
    if (!page) page = 1

    let pagination = {}

    if (page >= 1 && size >= 1) {
        pagination.limit = size
        pagination.offset = (page - 1) * size
    }

    console.log(pagination)

    // add dynamic search filters for 
        // pokemon name, minimum pokemon popularity, and pokemon from a specified origin

    let queryObj = {
        where: {},
        include: [],
        ...pagination
    }

    if (name) {
        queryObj.where.name = name
    }

    if (minPop) {
        queryObj.where.popularity = {
            [Op.gte]: minPop
        }
    }

    if (region) {
        queryObj.include.push({
            model: PokeOrigin,
            where: {
                region
            }
        })
    }

    console.log(queryObj)
        
    let result = await Pokemon.findAll(queryObj)

    res.json(result)
})

app.use((req, res, next) => {
    const err = new Error('The requested resource could not be found :(')
    err.statusCode = 404
    next(err)
})

app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    res.status(status)
    res.json({
        message: err.message || 'Something went wrong',
        stack: err.stack,
        statusCode: status
    })
})


const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))
