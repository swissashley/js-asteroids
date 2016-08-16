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
