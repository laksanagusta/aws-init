const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Its Workingg!!!")
})

app.listen(3000, () => {
    console.log('itsworking')
});