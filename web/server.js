/**
 * It allows the redirection easy and helps to deploy the app on internet
 * It makes the link available and returns the html file in return.
 */
const express = require('express');
const helmet = require("helmet");

const fs = require('fs')
const https = require('https')
var sslOptions = {
key: fs.readFileSync('key.pem'),
cert: fs.readFileSync('cert.pem'),
passphrase: 'kjhotel'
};

var app = express();

app.use(helmet());

const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${base}/welcome.html`);
});

app.get('/signup', (req, res) => {
    res.sendFile(`${base}/signup.html`);
});

app.get('/signin', (req, res) => {
    res.sendFile(`${base}/signin.html`);
});

app.get('/user', (req, res) => {
    res.sendFile(`${base}/user.html`);
});

app.get('/landing-page', (req, res) => {
    res.sendFile(`${base}/landing-page.html`);
});

app.get('/light', (req, res) => {
    res.sendFile(`${base}/light.html`);
});

app.get('/conditioner', (req, res) => {
    res.sendFile(`${base}/conditioner.html`);
});

app.get('/security', (req, res) => {
    res.sendFile(`${base}/security.html`);
});

app.get('/other-devices', (req, res) => {
    res.sendFile(`${base}/other-devices.html`);
});

app.get('/send-command', (req, res) => {
    res.sendFile(`${base}/send-command.html`);
    });
    
app.get('/device-register', (req, res) => {
    res.sendFile(`${base}/device-register.html`);
});

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
});

var server = https.createServer(sslOptions, app).listen(port, function(){
    console.log("Express server listening on port " + port);
    });