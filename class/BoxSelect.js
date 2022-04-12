import { LivePoint } from '/class/LivePoint';
/***
 * class: CanvasModelActions
 ***/
// Describe Point Class below
const BoxSelect = function() {

  
  // set private & Inheritance /////////////////////////////////////////////////
  const _private  = {};
  _private.start  = Object.assign({}, LivePoint.prototype);
  _private.finish = Object.assign({}, LivePoint.prototype);
  _private.name   = 'BoxSelect';


  // privilige static functions ////////////////////////////////////////////////
  

  // Access List: getter & setter //////////////////////////////////////////////
  Object.defineProperties(this, {
    start: {
      set: function(obj) {
        if ( !(obj instanceof LivePoint) ) throw new Error('Instance type error: not a StatPoint type');
        _private.start = obj;
      },
      get: function() {
        return _private.start;
      },
      enumerable:true
    },
    finish: {
      set: function(obj) {
        if ( !(obj instanceof LivePoint) ) throw new Error('Instance type error: not a StatPoint type');
        _private.finish = obj;
      },
      get: function() {
        return _private.finish;
      },
      enumerable:true
    },
    name: {
      get: () => _private.name,
      enumerable:true
    }
  });


  // access controls: public functions /////////////////////////////////////////
  Object.assign(this, {
    isLive () {
      if (!(_private.start instanceof LivePoint) || !(_private.finish instanceof LivePoint)) return false;
      return ( _private.start.isLive() && _private.finish.isLive() );
    },
    off(){
      _private.start = null;
      _private.finish = null;
    }
  });


  // Lazy Initialization ///////////////////////////////////////////////////////
  

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
// Declare Point Class  *** Do not change line sequence ***
export { BoxSelect };
