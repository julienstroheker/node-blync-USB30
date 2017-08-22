var hid = require('node-hid');

var Blync = {
  getDevices: function ()
  {
    var devices = hid.devices();

    devices = devices.filter(function (dev) {
      // Looking for Blynclight BLYNCUSB30 DEVICE
      //return dev.vendorId === 3667 && dev.productId === 9494 && dev.interface === -1;
      return dev.path.indexOf("vid_0e53&pid_2516") !== -1 || dev.path.indexOf("vid_2c0d&pid_0001") !== -1
    });

    devices = devices.map(function (dev) {
      return new Blync.Device(new hid.HID(dev.path));
    });

    return devices;
  },

  getDevice: function (index)
  {
    index = +index || 0;

    var devices = this.getDevices();
    if (index < 0) {
      throw new Error("Invalid device index");
    }
    if (index >= devices.length) {
      throw new Error("Device index #"+index+" not found");
    }

    return devices[index];
  }
};

Blync.Device = require('./device').Device;

module.exports = Blync;
