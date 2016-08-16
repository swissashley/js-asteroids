const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Game = require('./game.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  setInterval(this.game.step.bind(this.game), 20);
  setInterval(this.game.draw.bind(this.game,this.ctx), 20);
};

GameView.prototype.bindKeyHandlers = function () {
  key("up", () => this.game.ship.power([0, -1]));
  key("down", () => this.game.ship.power([0, 1]));
  key("left", () => this.game.ship.power([-1, 0]));
  key("right", () => this.game.ship.power([1, 0]));
  key("a", () => this.game.ship.fireBullet());

};

const NUM_ASTEROIDS = 10;

module.exports = GameView;
