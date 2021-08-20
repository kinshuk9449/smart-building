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
const port = 5000;

const mongoose = require('mongoose');

const Device = require('./models/devices'); 
mongoose.connect('mongodb+srv://kinshuk:Kinshu123@cluster0.bmsjk.mongodb.net/devices?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
  });

  app.post('/api/devices', (req, res) => {
    const { id, deviceid, device, devicebuilding, deviceroom } = req.body;
    const newDevice = new Device({
        id,
        deviceid,
        device,
        devicebuilding,
        deviceroom
    });
    newDevice.save(err => {
      return err
        ? res.send(err)
        : res.send('successfully added device and data');
    });
  });

 

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

