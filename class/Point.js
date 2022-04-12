/***
 * class: Point
 ***/
// Describe Point Class below
const Point = function(x, y) {
  const _private = {};
  _private.x = x;
  _private.y = y;
  Object.defineProperties(this, {
    x: {
      set: function(obj) {
        if (typeof obj === 'number') _private.x = obj;
        else throw new Error('Point Instance type error: not a Number type');
      },
      get: function() {
        return _private.x;
      },
      enumerable:true
    },
    y: {
      set: function(obj) {
        if (typeof obj === 'number') _private.y = obj;
        else throw new Error('Point Instance type error: not a Number type');
      },
      get: function() {
        return _private.y;
      },
      enumerable:true
    }
  });
  //Object.seal(this);
}
// Declare Point Class  *** Do not change line sequence ***
export { Point };
