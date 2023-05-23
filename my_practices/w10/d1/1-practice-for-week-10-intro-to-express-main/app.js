const express = require('express')
const app = express()

app.get('/status', (req, res) => {
    res.send('The server is aliiiiiiive!!')
})

const port = 8001
app.listen(port, () => console.log(`Listening on port ${port}...`))