const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Its Workingg!!!")
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('itsworking')
});