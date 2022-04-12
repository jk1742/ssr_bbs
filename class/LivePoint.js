import { Point } from '/class/Point';
/***
 * class: LivePoint
 ***/
// Describe StatPoint Class below
const LivePoint = function( x, y ) {
  // set private & Inheritance /////////////////////////////////////////////////
  const _private = {};
  Point.call(_private, x, y);
  _private.live = true;
  // functions access controls: public /////////////////////////////////////////
  Object.assign(this, {
    isLive () {
      return _private.live;
    },
    on(x, y) {
      _private.x = x;
      _private.y = y;
      _private.live = true;
    },
    off(){
      _private.x = -1;
      _private.y = -1;
      _private.live = false;
    }
  }, Point.prototype);
  //////////////////////////////////////////////////////////////////////////////
  Object.defineProperties(this, {
    x: {
      get: function() { return _private.x; },
      enumerable:true
    },
    y: {
      get: function() { return _private.y; },
      enumerable:true
    }
  });
  //////////////////////////////////////////////////////////////////////////////
  // protected /////////////////////////////////////////////////////////////////
  Object.seal(this);
  //////////////////////////////////////////////////////////////////////////////
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { LivePoint };
