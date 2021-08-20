const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
const port = 5001;

const mongoose = require('mongoose');

const User = require('./models/users');

mongoose.connect("Your coonect code from mongodb");

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
        return err
            ? res.send(err)
            : res.send(users);
    });
});

app.post('/api/users', (req, res) => {
    const { id, email, mobile, access, pass } = req.body;
    const newUser = new User({
        id,
        email,
        mobile,
        access,
        pass
    });
    newUser.save(err => {
        return err
            ? res.send(err)
            : res.send('successfully added device and data');
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

