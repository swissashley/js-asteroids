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
