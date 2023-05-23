const express = require('express');
const app = express()
require('dotenv').config()

const thingsRouter = require('./routes/things')

app.use(express.json())

app.use('/styles', express.static('assets/css')) //index.css // /styles/index.css

app.use('/thing', thingsRouter)

app.get('/env-var', (req, res) => {
    console.log(process.env.MESSAGE)
    res.send('stuff')
})

// app.use('/thing', (req, res, next) => {
//     console.log('1')
//     console.log(req.path)
//     const err = new Error('thing had an error!')
//     err.statusCode = 510
//     // const err = 'banana'
//     next(err)
// })

app.use((req, res, next) => {
    console.log('2')
    // console.log(req.path)
    next()
})

app.get('/', (req, res) => {
    // console.log('our first end point!')
    // console.log(req)
    res.send('This is our first API!')
})

// app.use((err, req, res, next) => {
//     console.log('the error: ', err)
//     next(err)
// })

// app.post('/thing', (req, res) => {
//     console.log('request body: ', req.body)
//     res.send('Thank you for the new thing')
// })

app.put([/\/stuff/, '/somestuff'], (req, res) => {
    console.log('end point', req.url)
    res.send('You editted some stuff')
})


const queryChecker = (req, res, next) => {
    console.log(req.query)
    if (!req.query.anothermessage) {
        return res.send('anothermessage is required')
    }
    next()
}

const print3 = (req, res, next) => {
    console.log('3')
    next()
}

const print4 = (req, res, next) => {
    console.log('4')
    next()
}

const middlewareArr = [queryChecker, print3]
const anotherArr = [print4]
const bundle = [anotherArr, middlewareArr]


// /thing/9/stuff/cars
// app.get('/thing/:thingId/stuff/:stuffId', bundle, (req, res) => {
    
//     res.send(`Here is the thing with an id of ${req.params.thingId}`)
// })

app.use((req, res, next) => {
    // res.status(404)
    // res.json({
    //     message: 'The requested resource could not be found :(',
    //     statusCode: 404
    // })
    const err = new Error('The requested resource could not be found :(')
    err.statusCode = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode)
    res.json({
        message: err.message || 'Something went wrong',
        stack: err.stack || 'no stack',
        statusCode: statusCode
    })
})

app.listen(8000, () => console.log('Listening on port 8000...'))