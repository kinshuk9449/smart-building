const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const MQTT_URL = `http://localhost:5002`
const randomCoordinates = require('random-coordinates');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kjain:kin@cluster0.bmsjk.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

const Device = require('./models/device');

const port = 5002;

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const ports = new SerialPort('COM8', { baudRate: 9600 });
const parser = ports.pipe(new Readline({ delimiter: '\n' }));
var previousTemp = 0, previousHum = 0;
// Read the port data
ports.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data => {
  var temp = data[0] + data[1] + data[2] + data[3] + data[4];
  var hum = data[7] + data[8] + data[9] + data[10] + data[11];
  if (temp != previousTemp || hum != previousHum) {
    previousHum = hum;
    previousTemp = temp;
    var message = {
      deviceid : "2190",
      temp : temp,
      hum : hum
    }
    axios
      .post(`${MQTT_URL}/send-command`, JSON.stringify(message))
      .then(res => {
        // console.log(`statusCode: ${res.status}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
  client.subscribe('/sensorData');
  console.log('mqtt connected');
});

client.on('message', (topic, message) => {
  if (topic == '/sensorData') {
    const data = JSON.parse(message);
    console.log(data);
    Device.findOne({ "name": data.deviceid }, (err, device) => {
      if (err) {
        console.log(err)
      }

      const { sensorData } = device;
      const { temp,hum } = data;

      sensorData.push({ temp,hum});
      device.sensorData = sensorData;

      device.save(err => {
        if (err) {
          console.log(err)
        }
      });
    });
  }
});

app.put('/sensor-data', (req, res) => {
  const { deviceid,temp,hum} = req.body;



  const topic = `/sensorData`;
  const message = JSON.stringify({ deviceId, temp,hum });

  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

app.post('/send-command', (req, res) => {
  const { deviceId, temp,hum } = req.body;
  const topic = `/kin/command/${deviceId}`;
  var data = req.body;
  console.log(temp);
  client.publish(topic, temp, () => {
    res.send('published new message');
  });
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});