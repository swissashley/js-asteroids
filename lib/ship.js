const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Ship(options) {
  if (options["color"] === undefined) {
    options["color"] = "blue";
  }
  if (options["radius"] === undefined) {
    options["radius"] = 10;
  }
  options.vel = [0,0];
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

module.exports = Ship;
