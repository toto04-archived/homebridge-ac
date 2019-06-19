var mosca = require('mosca')
var mqtt = require('mqtt')
var Service, Characteristic;

module.exports = function (homebridge) {
  console.log("homebridge API version: " + homebridge.version);

  var broker = mosca.Server()
  broker.on('ready', () => {
    console.log('Mosca server up and running!')
  })
  broker.on('clientConnected', (client) => {
    console.log('client connected', client.id);
  });

  var mqttClient = mqtt.connect('mqtt://localhost')

  // Service and Characteristic are from hap-nodejs
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory("homebridge-ac", "AC Unit", ACUnit);
}

class ACUnit {
  constructor(log, config) {
    this.log = log;
    this.config = config
    this.name = config.name

    this.on = 0
    this.thc = 2
    this.chc = 0
    this.targetTemp = 23.0
    this.temp = 24.0
    this.swing = 0
    this.speed = 0

    this.service = new Service.HeaterCooler(this.name, 'Air conditioner')
    this.service.getCharacteristic(Characteristic.Active)
      .on('set', (value, callback) => {
        this.on = value
        if (this.on) {
          console.log('attivo')
        } else {
          console.log('disattivato')
        }
        callback()
      })
      .on('get', (callback) => {
        callback(null, this.on)
      })
    // .setProps({
    //   validValues: [0, 3]
    // })

    this.service.getCharacteristic(Characteristic.CurrentHeaterCoolerState)
      .on('set', (value, callback) => {
        console.log('Current hc state set to:', value)
        this.chc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Current hc state is', this.chc)
        callback(null, this.chc)
      })

    this.service.getCharacteristic(Characteristic.TargetHeaterCoolerState)
      .on('set', (value, callback) => {
        console.log('Target hc state set to:', value)
        this.thc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Target hc state is', this.thc)
        callback(null, this.thc)
      })
    // .setProps({
    //   validValues: [2]
    // })

    this.service.getCharacteristic(Characteristic.CurrentTemperature)
      .on('set', (value, callback) => {
        console.log('Current temperature set to:', value)
        this.temp = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Current temperature is', this.temp)
        callback(null, this.temp)
      })

    this.service.addCharacteristic(Characteristic.CoolingThresholdTemperature)
      .on('set', (value, callback) => {
        console.log('cooling thasds is', value)
        this.targetTemp = value
        callback()
      })
      .on('get', (callback) => {
        callback(null, this.targetTemp)
      })

    this.service.addCharacteristic(Characteristic.SwingMode)
      .on('set', (value, callback) => {
        this.swing = value
        callback()
      })
      .on('get', (callback) => {
        callback(null, this.swing)
      })
  }

  getServices() {
    return [
      this.service
    ]
  }
}
