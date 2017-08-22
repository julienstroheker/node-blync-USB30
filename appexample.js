var blync = require('blync-usb30');

try {
    // How many Blyncs are hooked up?
    var deviceCount = blync.getDevices().length;

    var device = blync.getDevice(0);
} catch (error) {
    throw new Error("Error: " + error);
}

// Make Blync light up
device.setColor('white', 'on');
device.setColor('red', 'on');
device.setColor('blue', 'on');
device.setColor('green', 'on');

// Make Blync light up with controls
device.setColor('green', 'dim');
device.setColor('green', 'blinkveryfast');
device.setColor('green', 'blinkfast');
device.setColor('green', 'blinknormal');

// Switch off - Any color is correct
device.setColor('green', 'off');

// Turn Blync off when you exit
process.on( 'SIGINT', function() {
  device.turnOff();
  process.exit(0);
});