const Game = require('./lib/game.js');
const GameView = require('./lib/game_view.js');

document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("game-canvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  let c = canvas.getContext("2d");
  let game = new Game(canvas.width, canvas.height, 10);
  let gameView = new GameView(game, c);
  gameView.start();
});
