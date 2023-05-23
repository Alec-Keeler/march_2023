const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    // security (only allow /thing requests)
    console.log('router file', req.path)
    next()
})

router.post('/', (req, res) => {
    console.log('request body: ', req.body)
    res.send('Thank you for the new thing')
})

router.get('/:thingId/stuff/:stuffId', (req, res) => {

    res.send(`Here is the thing with an id of ${req.params.thingId}`)
})


module.exports = router