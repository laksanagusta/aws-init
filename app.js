const express = require('express');
var path = require('path');

const app = express();


app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.get('/', (req, res) => {
    res.render('coba.ejs', {
        title: "Jinx",
    });   
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('itsworking')
});