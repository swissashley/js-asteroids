const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving_object.js');
const Util = require('./util.js');
const Game = require('./game.js');

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(this.game.step.bind(this.game), 20);
  setInterval(this.game.draw.bind(this.game,this.ctx), 20);
};

const NUM_ASTEROIDS = 10;

module.exports = GameView;
