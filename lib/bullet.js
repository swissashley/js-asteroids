const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Bullet(options) {
  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);


module.exports = Bullet;
