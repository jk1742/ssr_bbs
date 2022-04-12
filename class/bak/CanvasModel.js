import { Particle }  from './Particle';
import { BoxSelect } from './BoxSelect';
import { CanvasModelActions }  from '../class/CanvasModelActions';
import { Logger } from './Logger';
const logger = new Logger();
/***
 * class: CanvasModeling
 ***/
// Describe CanvasModeling Class below
const CanvasModel = function(cWidth, cHeight) {
  // set private & Inheritance /////////////////////////////////////////////////
  const _private = {};
  _private.particles    = [];
  _private.actions      = {};
  _private.square;
  // functions access controls: public /////////////////////////////////////////
  Object.assign(this, {
    isAliveBoxSelect (){
      if( (_private.actions.boxSelect == null) || !_private.actions.boxSelect.isLive()) return false;
      if(_private.actions.boxSelect.name != _private.actions.current) return false;
      return true;
    },
    create2DArray(rows,columns) {
       let x = new Array(rows);
       for (let i = 0; i < rows; i++) {
           x[i] = new Array(columns);
       }
       return x;
    },
    createArray(x, y) {
        return Array.apply(null, Array(x)).map(e => Array(y));
    }
  });
  // getter setter /////////////////////////////////////////////////////////////
  Object.defineProperties(this, {
    particles: {
      get: function() {
        return _private.particles;
      },
      set: function(array) {
        if ( !Array.isArray(array) ) throw new Error('Instance type error: not a array type');
        if (array.filter(e => ( !(e instanceof Particle) )).length > 0) throw new Error('One member of array is not a particle');
        _private.particles = array;
      },
      enumerable:true
    },
    boxSelect: {
      get: function() {
        return _private.actions.boxSelect;
      },
      set: function(obj){
        if (!obj instanceof BoxSelect) {
          console.warn('*** WARNING: not proper type of CanvasModelActions.');
          return;
        }
        _private.actions.boxSelect = obj;
      },
      enumerable:true
    },
    currentAction:{
      get: function() {
        return _private.actions.current;
      },
      set: function(obj){
        if ('string' != typeof obj ) throw new Error('Instance type error: not a String type');
        _private.actions.current = obj;
      },
      enumerable:true
    },
    square:{
      get: function() {
        return _private.square;
      },
      set: function(obj){
        _private.square = obj;
      },
      enumerable:true
    }
  });
  // lazy declare //////////////////////////////////////////////////////////////
  this.square = this.create2DArray(cWidth+1, cHeight+1);
}
// Declare Point Class  *** Do not change line sequence ***
export { CanvasModel };
