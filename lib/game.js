const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Ship = require('./ship.js');
const Key = require('../keymaster.js');

function Game(DIM_X, DIM_Y, NUM_ASTEROIDS) {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.NUM_ASTEROIDS = NUM_ASTEROIDS;
  this.asteroids = [];
  let shipPos = this.randomPosition();
  this.ship = new Ship({"pos": shipPos});
  this.bullets = this.ship.bullets;
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    this.asteroids.push(new Asteroid({pos}));
  }
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
};

Game.prototype.randomPosition = function () {
  let x = Math.floor(Math.random() * this.DIM_X);
  let y = Math.floor(Math.random() * this.DIM_Y);
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(function(object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach( object =>  {
    object.pos = this.wrap(object.pos);
    object.move();
  });
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] % this.DIM_X;
  pos[1] = pos[1] % this.DIM_Y;
  return pos;
};

Game.prototype.checkCollisions = function () {
  let tempObjects = this.allObjects();
  let bulletsToDestroy = [];
  let asteroidsToDestroy = [];

  for (let j = 0; j < this.asteroids.length; j++) {
    let asteroid = this.asteroids[j];

    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];

      if (bullet.isCollidedWith(asteroid)) {
        bulletsToDestroy.push(bullet);
        asteroidsToDestroy.push(asteroid);
      }
    }
    if (this.ship.isCollidedWith(asteroid)) {
      this.ship.relocate(this.randomPosition());
    }
  }
};

Game.prototype.step = function () {
  this.checkCollisions();
  this.moveObjects();
};

module.exports = Game;
