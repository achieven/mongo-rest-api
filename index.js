const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoClient = require('mongodb');
const mongoPort = '27017';
const mongoUrl = 'mongodb://localhost:' + mongoPort + '/myproject';
mongoClient.connect(mongoUrl, (err, db) => {
    if (err === null) {
        console.log('mongo is connected on port ' + mongoPort);
        db.createCollection('Accounts', (err, collection) => {
            if (null === err) {
                console.log('created collection Accounts')
            }
        })
    }
});
const appPort = 3000;
app.listen(appPort, () => {
    console.log('listening on port ' + appPort);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use(bodyParser.urlencoded({extended: true}));

app.post('/signup', (req, res) => {
    function hash(body) {
        for (var field in body) {
            console.log('HASHING ', field, ': ', body[field])
        }
    };
    hash(req.body);
    res.send('signed up!');
});

app.post('/login', (req, res) => {
    function findMe(body) {
        console.log('FINDING: ');
        for (var field in body) {
            console.log(field, ': ', body[field])
        }
    };
    findMe(req.body);
    res.send('logged in!');
});



