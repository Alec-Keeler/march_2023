const express = require('express');
const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    // console.log('our first end point!')
    // console.log(req)
    res.send('This is our first API!')
})

app.post('/thing', (req, res) => {
    console.log('request body: ', req.body)
    res.send('Thank you for the new thing')
})

app.put([/\/stuff/, '/somestuff'], (req, res) => {
    console.log(req.url)
    res.send('You editted some stuff')
})

// /thing/9/stuff/cars
app.get('/thing/:thingId/stuff/:stuffId', (req, res) => {
    console.log(req.query)
    if (!req.query.anothermessage) {
        return res.send('anothermessage is required')
    } 
    res.send(`Here is the thing with an id of ${req.params.thingId}`)
})

app.listen(8000, () => console.log('Listening on port 8000...'))