/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);

	document.addEventListener("DOMContentLoaded", function () {
	  let canvas = document.getElementById("game-canvas");
	  canvas.height = window.innerHeight;
	  canvas.width = window.innerWidth;
	  let c = canvas.getContext("2d");
	  let game = new Game(canvas.width, canvas.height, 10);
	  let gameView = new GameView(game, c);
	  gameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(3);
	const Ship = __webpack_require__(6);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, ParentClass) {
	    function Surrogate () {}
	    Surrogate.prototype = ParentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },
	  randomVec (length) {
	    let x = length / Math.sqrt(2);
	    let y = x;
	    return [x,y];
	  }
	};

	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};

	MovingObject.prototype.isCollidedWith = function (otherObject) {
	  // Dist([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
	  let x_1 = this.pos[0];
	  let y_1 = this.pos[1];
	  let x_2 = otherObject.pos[0];
	  let y_2 = otherObject.pos[1];
	  if (Math.sqrt(Math.pow((x_1 - x_2),2) + Math.pow((y_1 - y_2), 2)) < (this.radius + otherObject.radius)) {
	    return true;
	  } else {
	    return false;
	  }
	};

	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(2);
	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(3);
	const Game = __webpack_require__(1);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);

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


/***/ }
/******/ ]);