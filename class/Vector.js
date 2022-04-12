import { Point } from '/class/Point';
const DEC_POINT = 4;
/***
 * class: Vector
 ***/
// Describe Vector Class below
const Vector = function(x, y) {
  const _private = {};
  Point.call(_private, x, y);
  _private.strength = Number(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(DEC_POINT));
  // functions access controls: public /////////////////////////////////////////
  // Object.assign(_private, {
  //   // add functions
  // }, Point.prototype);
  // getter & setter ///////////////////////////////////////////////////////////
  Object.defineProperties(this, {
    x: {
      get: function() { return _private.x; },
      set: (o) => {_private.x = o},
      enumerable:true
    },
    y: {
      get: function() { return _private.y; },
      set: (o) => {_private.y = o},
      enumerable:true
    },
    strength: {
      get: function() { return _private.strength; },
      enumerable:true
    }
  });
  //Object.seal(this);
  return this;
}

// Declare Point Class  *** Do not change line sequence ***
export { Vector };
