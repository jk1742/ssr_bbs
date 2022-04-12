/* eslint-disable no-unused-vars */
import { Particle }   from '/class/Particle';
import { BoxSelect }  from '/class/BoxSelect';
import { Logger }     from '/class/Logger';
import { Point }      from '/class/Point';
import {DEFALUT_RADIUS} from '/class/static/DefineConst';
const logger = new Logger();

/***
 * class: CanvasModeling
 ***/
// Describe CanvasModeling Class below
const CanvasModel = function(cWidth, cHeight) {


  // set private & Inheritance /////////////////////////////////////////////////
  const _private        = {};
  _private.particles    = [];
  _private.actions      = {};
  _private.square;
  _private.width;
  _private.height;
  _private.timefactor   = 1;
  _private.squarePos    = {};
  Point.call(_private.squarePos, -1, -1);


  // privilige static functions ////////////////////////////////////////////////


  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    particles: {
      get: function() {
        return _private.particles;
      },
      set: function(array) {
        this.initSquare();
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
        if (!(obj instanceof BoxSelect)) {
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
    },
    width:{
      get: function() {
        return _private.width;
      },
      set: function(obj){
        _private.width = obj;
      },
      enumerable:true
    },
    height:{
      get: function() {
        return _private.height;
      },
      set: function(obj){
        _private.height = obj;
      },
      enumerable:true
    },
    timefactor:{
      get: function() {
        return _private.timefactor;
      },
      set: function(obj){
        _private.timefactor = obj;
      },
      enumerable:true
    },
    squarePos:{
      get: function() {
        return _private.squarePos;
      },
      set: function(obj){
        _private.squarePos = obj;
      },
      enumerable:true
    },
  });


  // access controls: public functions /////////////////////////////////////////
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
    initSquare(){
      this.square = null;
      this.square = this.create2DArray(_private.width/DEFALUT_RADIUS, _private.height/DEFALUT_RADIUS);
    },
    run (e) {
      const width       = this.width;
      const height      = this.height;
      const timefactor  = this.timefactor;
      let   candidates  = this.candidateFilter(e);
      if(0 < candidates.length) {
        let collisions  = e.detectCollision(candidates);
        if ((collisions !== null) && (0 < collisions.length)) {
          const target            = collisions[0];
          e.vector                = e.reactCollision(collisions);
          target.vector           = target.reactCollision([e]);
          e.attribute.disease     = e.attribute.contact(target.attribute.disease);
          target.attribute.disease= target.attribute.contact(e.attribute.disease);
        }
      }
      e.attribute.aging(timefactor);
      if (e.position.x + e.vector.x > width - e.attribute.radius || e.position.x + e.vector.x < e.attribute.radius) {
        e.vector.x = -e.vector.x;
      }
      if (e.position.y + e.vector.y > height - e.attribute.radius || e.position.y + e.vector.y < e.attribute.radius) {
        e.vector.y = -e.vector.y;
      }
      // adjust position Movement
      e.position = e.adjustMove(e.position, e.vector, width, height, timefactor);
      // update squre
      const sX          = this.squarePos.x;
      const sY          = this.squarePos.y;
      const adjustedSqX = Math.floor(e.position.x / DEFALUT_RADIUS);
      const adjustedSqY = Math.floor(e.position.y / DEFALUT_RADIUS);
      // remove history
      if('undefined' !== typeof this.square[sX][sY] && 0 < this.square[sX][sY].length){
        const po = this.square[sX][sY].findIndex(a => a.attribute.id == e.attribute.id);
        this.square[sX][sY].splice(po,1);
      }
      if('undefined' === typeof this.square[adjustedSqX][adjustedSqY] || null === this.square[adjustedSqX][adjustedSqY]){
        this.square[adjustedSqX][adjustedSqY] = [e];
      } else if(Array.isArray(this.square[adjustedSqX][adjustedSqY])) {
        this.square[adjustedSqX][adjustedSqY].push(e);
      } else {
        logger.stepLog(1,`${adjustedSqX} ${adjustedSqY}  typeof:${typeof this.square[adjustedSqX][adjustedSqY]}`);
        logger.stepLog(1,`is array?`, Array.isArray(this.square[adjustedSqX][adjustedSqY]),this.square[adjustedSqX][adjustedSqY]);
      }
    },
    // when relocation window
    fixPosition(){
      this.particles.forEach((e, i) => {
        if (this.width < e.position.x) e.position.x = this.width - DEFALUT_RADIUS;
        if (this.height < e.position.y) e.position.y = this.height - DEFALUT_RADIUS;
      });
    },
    candidateFilter(e) {
      this.squarePos.x    = Math.floor(e.position.x / DEFALUT_RADIUS);
      this.squarePos.y    = Math.floor(e.position.y / DEFALUT_RADIUS);
      let hexWidth        = (this.width / DEFALUT_RADIUS);
      let hexHeight       = (this.height / DEFALUT_RADIUS);
      let carriage        = [];
      const vectorCeil    = Math.ceil(((e.vector.strength * this.timefactor * 2) + (2 * e.attribute.radius)) / DEFALUT_RADIUS);
      let xMin            = (this.squarePos.x - vectorCeil);
          xMin            = (0 > xMin)? 0:xMin;
      let xMax            = (this.squarePos.x + vectorCeil);
          xMax            = (hexWidth < xMax)? (hexWidth - 1) :xMax;
      let yMin            = this.squarePos.y - vectorCeil;
          yMin            = (0 > yMin)? 0:yMin;
      let yMax            = this.squarePos.y + vectorCeil;
          yMax            = (hexHeight < yMax)? (hexHeight - 1):yMax;
      //console.log(`candidateFilter, x: ${xMin}<${this.squarePos.x}<${xMax} || y: ${yMin}<${this.squarePos.y}<${yMax} || ${e.position.x}__${e.position.x/8}`);
      for (let y = yMin; y < yMax; y++) {
        for (let x = xMin; x < xMax; x++){
          if('undefined' !== typeof this.square[x][y] ) {
            if(!Array.isArray(this.square[x][y])) logger.stepLog(1,typeof this.square[x][y], this.square[x][y] ,'  is array ?',Array.isArray(this.square[x][y]) );
            this.square[x][y].forEach(e=>{carriage.push(e)});
          }
        }
      }
      if(1 >= carriage.length) return [];
      return carriage;
    },
  });


  // Lazy Initialization ///////////////////////////////////////////////////////
  this.square       = this.create2DArray(cWidth/DEFALUT_RADIUS, cHeight/DEFALUT_RADIUS);
  _private.width    = cWidth;
  _private.height   = cHeight;


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
// Declare Point Class  *** Do not change line sequence ***
export { CanvasModel };
