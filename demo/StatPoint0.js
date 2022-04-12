import { Point1 } from './StatPoint0';
/***
 * class: StatPoint
 ***/
// Describe StatPoint Class below
const StatPoint = function( x, y ) {
  // Inheritance ///////////////////////////////////////////////////////////////
  const _private = {};
  Point1.call(_private, x, y);
  //////////////////////////////////////////////////////////////////////////////
  // set private ///////////////////////////////////////////////////////////////
  _private.live = true;
  //////////////////////////////////////////////////////////////////////////////
  // functions access controls: public /////////////////////////////////////////
  Object.assign(this, {
    sum () {
      return _private.sum();
    },
    live () {
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
  }, Point1.prototype);
  //////////////////////////////////////////////////////////////////////////////
  Object.defineProperties(this, {
    x: {
      get: function() { return _private.x; }
    },
    y: {
      get: function() { return _private.y; }
    },
    k: {
      get: function() { return this.sum(); }
    }
  });
  //////////////////////////////////////////////////////////////////////////////
  // protected /////////////////////////////////////////////////////////////////
  Object.seal(this);
  //////////////////////////////////////////////////////////////////////////////
}

// Declare Point Class  *** Do not change line sequence *** ////////////////////
export { StatPoint };
