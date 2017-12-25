const express = require('express');
const hbs = require('hbs');

const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

var app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    console.log();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to append to server.log');
        }
    })
    next();
});

// stops everything from being accessed. Helps during site maintenance. 
app.use((req, res, next) => {
    res.render('maintenance.hbs');

});


app.use(express.static(__dirname + '/public'));


app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
});
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});