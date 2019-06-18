var http = require('http');
var Accessory, Service, Characteristic, UUIDGen;

testObj = {
  on: false,
  hc: 0,
  temp: 24.5
}

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

    this.fan = new Service.Fan(this.name, 'fan')
    this.fan.getCharacteristic(Characteristic.On)
      .on('set', (value, callback) => {
        console.log('Fan set to:', value)
        testObj.on = value
        callback();
      })
      .on('get', (callback) => {
        console.log('Fan is', testObj.value)
        callback(null, testObj.value)
      })


    this.thermo = new Service.Thermostat(this.name, 'thermostat')
    this.thermo.getCharacteristic(Characteristic.CurrentHeatingCoolingState)
      .on('set', (value, callback) => {
        console.log('Current hc state set to:', value)
        testObj.hc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('current hc state is', testObj.hc)
        callback(null, testObj.hc)
      })
      // .setProps({
      //   maxValue: 2,
      //   validValues: [0, 2]
      // })

    this.thermo.getCharacteristic(Characteristic.TargetHeatingCoolingState)
      .on('set', (value, callback) => {
        console.log('Target hc state set to:', value)
        testObj.hc = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Target hc state is', testObj.hc)
        callback(null, testObj.hc)
      })
      // .setProps({
      //   maxValue: 2,
      //   validValues: [0, 2]
      // })

    this.thermo.getCharacteristic(Characteristic.CurrentTemperature)
      .on('set', (value, callback) => {
        console.log('Current temperature set to:', value)
        testObj.temp = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Current temperature is', testObj.temp)
        callback(null, testObj.temp - 1)
      })

    this.thermo.getCharacteristic(Characteristic.TargetTemperature)
      .on('set', (value, callback) => {
        console.log('Target temperature set to:', value)
        testObj.temp = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Target temperature is', testObj.temp)
        callback(null, testObj.temp)
      })

    this.thermo.getCharacteristic(Characteristic.TemperatureDisplayUnits)
      .on('set', (value, callback) => {
        console.log('Disp units set to:', value)
        callback()
      })
      .on('get', (callback) => {
        console.log('Disp units is 0')
        callback(null, 0)
      })

    this.fan.addCharacteristic(Characteristic.TargetTemperature)
      .on('set', (value, callback) => {
        console.log('Target temperature set to:', value)
        testObj.temp = value
        callback()
      })
      .on('get', (callback) => {
        console.log('Target temperature is', testObj.temp)
        callback(null, testObj.temp)
      })
  }

  getServices() {
    return [
      //this.fan,
      this.thermo
    ]
  }

  getTargetHeatingCoolingState(callback) {
    console.log('THC is:', testObj.hc)
    callback(null, value)
  }

  setTargetHeatingCoolingState(value, callback) {
    console.log('THC set to:', testObj.hc)
    callback(null, value)
  }
}
