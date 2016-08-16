const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Ship = require('./ship.js');

function Game(DIM_X, DIM_Y, NUM_ASTEROIDS) {
  this.DIM_X = DIM_X;
  this.DIM_Y = DIM_Y;
  this.NUM_ASTEROIDS = NUM_ASTEROIDS;
  this.asteroids = [];
  let shipPos = this.randomPosition();
  this.ship = new Ship({"pos": shipPos});
  this.addAsteroids();
}

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    this.asteroids.push(new Asteroid({pos}));
  }
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
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
  let result = false;
  let collidedAsteroids = [];
  let collidedShip = [];
  let tempObjects = this.allObjects();

  for (let i = 0; i < tempObjects.length - 1; i++) {
    for (let j = i + 1; j < tempObjects.length; j++) {
      let object1 = tempObjects[i];
      let object2 = tempObjects[j];
      
      if (object1 !== object2 && object1.isCollidedWith(object2)) {
        [object1, object2].forEach( object => {
          if (object instanceof Asteroid) {
            collidedAsteroids.push(object);
          } else if (object instanceof Ship) {
            collidedShip.push(object);
          }
        });
      }
    }
  }
  if (collidedShip.length > 0) {
    alert("Ship hit");
    this.ship.pos = this.randomPosition();
  }

  let newAsteroids = this.asteroids.filter(function(i) {
    return collidedAsteroids.indexOf(i) < 0;
  });
  this.asteroids = newAsteroids;
};

Game.prototype.step = function () {
  this.checkCollisions();
  this.moveObjects();
};

module.exports = Game;
