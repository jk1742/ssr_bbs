/***
 * class: CanvasModelActions
 ***/
// Describe Point Class below
const CanvasModelActions = function(x, y) {
  const _private = {};
  _private.x = x;
  _private.y = y;
  //_private.position       = Object.assign(position, Point.prototype);
  Object.defineProperties(this, {
    x: {
      set: function(obj) {
        if (typeof obj === 'number') _private.x = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.x;
      }
    },
    y: {
      set: function(obj) {
        if (typeof obj === 'number') _private.y = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.y;
      }
    }
  });
}
// Declare Point Class  *** Do not change line sequence ***
export { CanvasModelActions };
