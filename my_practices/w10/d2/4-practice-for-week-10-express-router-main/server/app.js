const express = require('express');
const app = express();
app.use(express.json())

const colorsRouter = require('./routes/colors');
const peopleRouter = require('./routes/people');
app.use('/people', peopleRouter);

app.use('/colors', colorsRouter);


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));