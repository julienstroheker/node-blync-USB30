var Device = function (hidDevice) {
  this.hidDevice = hidDevice;
  this.currentColor = 'off';
};

Device.colors = {
  white: [255,255,255],
  blue: [0,0,255],
  green: [0,255,0],
  red: [255,0,0]
};

Device.controls = {
  blinkveryfast: 4,
  blinkfast: 36,
  blinknormal: 20,
  on: 0,
  off: 1,
  dim: 2
};

Device.prototype.setColor = function (color, control) {
  if ("undefined" === typeof Device.colors[color] || "undefined" === typeof Device.controls[control]) {
    throw new Error("Unknown color : " + color + " or control : " + control);
  }

  this.sendCommand(Device.colors[color][0],Device.colors[color][1],Device.colors[color][2],Device.controls[control]);
};

Device.prototype.sendCommand = function (red, green, blue, control) {
  // About the BLYNCUSB30
  // this.abyBlyncOutputReportBuffer[0] = 0;
  // this.abyBlyncOutputReportBuffer[1] = RedValue;
  // this.abyBlyncOutputReportBuffer[2] = BlueValue;
  // this.abyBlyncOutputReportBuffer[3] = GreenValue;
  // this.abyBlyncOutputReportBuffer[4] = LightControl; //0=On 1=Off 2=Dim 4=blink very fast // 20= Blink normal // 36 = blink faster
  // this.abyBlyncOutputReportBuffer[5] = 0
  // this.abyBlyncOutputReportBuffer[6] = 0
  // this.abyBlyncOutputReportBuffer[7] = 255;
  // this.abyBlyncOutputReportBuffer[8] = 255;
  var commandBuffer = [];
  commandBuffer[0] = 0;
  commandBuffer[1] = red;
  commandBuffer[2] = blue;
  commandBuffer[3] = green;
  commandBuffer[4] = control;
  commandBuffer[5] = 0;
  commandBuffer[6] = 0;
  commandBuffer[7] = 255;
  commandBuffer[8] = 255;

  this.hidDevice.write(commandBuffer);
};

Device.prototype.turnOff = function () {
  this.sendCommand(0,0,0,1);
};

Device.prototype.turnOn = function () {
  this.sendCommand(0,0,0,0);
};

exports.Device = Device;
