var http = require('http');
var Accessory, Service, Characteristic, UUIDGen;

module.exports = function (homebridge) {
  console.log("homebridge API version: " + homebridge.version);

  // Service and Characteristic are from hap-nodejs
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  UUIDGen = homebridge.hap.uuid;

  // For platform plugin to be considered as dynamic platform plugin,
  // registerPlatform(pluginName, platformName, constructor, dynamic), dynamic must be true
  homebridge.registerAccessory("homebridge-ac", "AC Unit", ACUnit);
}

class ACUnit {
  constructor(log, config) {
    this.log = log;
    this.config = config
    this.name = config.name

    this.on = 0
    this.hc = 0
    this.temp = 24

    this.service = new Service.HeaterCooler(this.name, 'Air conditioner')
    this.service.getCharacteristic(Characteristic.Active)
      .on('set', (value, callback) => {
        this.on = value
        if (this.on) {
          console.log('AC activated')
        } else {
          console.log('AC turned off')
        }
        callback()
      })
      .on('get', (callback) => {
        callback(null, this.on)
      })

    this.service.getCharacteristic(Characteristic.CurrentHeaterCoolerState)
      .on('set', (value, callback) => {
        console.log('Current hc state set to:', value)
        this.hc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Current hc state is', this.hc)
        callback(null, this.hc)
      })

    this.service.getCharacteristic(Characteristic.TargetHeaterCoolerState)
      .on('set', (value, callback) => {
        console.log('Target hc state set to:', value)
        this.hc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Target hc state is', this.hc)
        callback(null, this.hc)
      })

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
      })
      .on('get', (callback) => {
        callback(null, 20)
      })

    this.service.addCharacteristic(Characteristic.HeatingThresholdTemperature)
      .on('set', (value, callback) => {
        console.log('heating thasds is', value)
      })
      .on('get', (callback) => {
        callback(null, 20)
      })
  }

  getServices() {
    return [
      this.service
    ]
  }
}
