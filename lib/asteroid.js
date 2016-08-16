const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Asteroid(options) {
  if (options["color"] === undefined) {
    options["color"] = "black";
  }
  if (options["radius"] === undefined) {
    options["radius"] = 20;
  }
  options.vel = Util.randomVec(Math.floor(Math.random() * 20));
  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);


module.exports = Asteroid;
