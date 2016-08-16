const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship(options) {
  if (options["color"] === undefined) {
    options["color"] = "blue";
  }
  if (options["radius"] === undefined) {
    options["radius"] = 10;
  }
  options.vel = [0,0];
  MovingObject.call(this, options);
  this.bullets = [];
}



Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function (pos) {
  this.pos = pos;
  this.vel = [0,0];
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet({"pos": this.pos,
                           "vel": [this.vel[0], this.vel[1]],
                           "color": "orange",
                           "radius": 3
                          });
  this.bullets.push(bullet);
};

module.exports = Ship;
