const express = require('express');
const app = express();
require('dotenv').config();
const sqlite3 = require('sqlite3');
const source = process.env.DATA_SOURCE;

const db = new sqlite3.Database(source, sqlite3.OPEN_READWRITE);

app.get('/pokemon', (req, res) => {
    // all, get, run
    // sql, parameters, callback
    const sql = 'SELECT * FROM pokemon;'
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            res.json(rows)
        }
    })
})

app.get('/pokemon/:id', (req, res) => {
    const sql = 'SELECT * FROM pokemon WHERE id = ?;'
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            console.log(err)
        } else {
            res.json(row)
        }
    })
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))