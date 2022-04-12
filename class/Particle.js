import { Point } from '/class/Point';
import { Vector } from '/class/Vector';
import { Attribute, Disease } from '/class/Attribute';
import { Logger } from '/class/Logger';
const logger = new Logger();
logger.status = true;

/**
 * model: Particle model
 **/
const Particle = function(position, vector, attribute) {
  // set private & Inheritance /////////////////////////////////////////////////
  const _private = {};
  // Access List: getter & setter //////////////////////////////////////////////
  Object.defineProperties(_private, {
    position: {
      set: function(obj) {
        if (position instanceof Point) _private._position = obj;
        else throw new Error('Instance type error: not a Point type');
      },
      get: function() {
        return _private._position;
      }
    },
    vector: {
      set: function(obj) {
        if (vector instanceof Vector) _private._vector = obj;
        else console.error('Instance type error: not a Vector type');
      },
      get: function() {
        return _private._vector;
      }
    },
    attribute: {
      set: function(obj) {
        if (obj instanceof Attribute) _private._attribute = obj;
        else throw new Error('Instance type error: not a Attribute type');
      },
      get: function() {
        return _private._attribute;
      }
    },
  });
  // public value getter & setter //////////////////////////////////////////////
  Object.defineProperties(this, {
    attribute: {
      set: function(obj) {
        _private.attribute = obj;
      },
      get: function() {
        return _private.attribute;
      },
      enumerable:true
    },
    position: {
      set: function(obj) {
        _private.position = obj;
      },
      get: function() {
        return _private.position;
      },
      enumerable:true
    },
    vector: {
      set: function(obj) {
        _private.vector = obj;
      },
      get: function() {
        return _private.vector;
      },
      enumerable:true
    }
  });
  // privilige static functions ////////////////////////////////////////////////
  const fixNumber = function(x) {
    return Number(Number.parseFloat(x).toFixed(8));
  }
  const getDistance = function(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2));
  }
  const toRadians = function(degree) {
    return degree * (Math.PI / 180);
  }
  const getVecterAngle = function (point) {
    return fixNumber(360 + Math.atan2(-point.y , point.x) / (Math.PI / 180)) % 360;
  }
  const cleanDegree = function(d){
    const s = d % 360;
    return s < 0 ? 360 + s : s;
  }
  // getCanvasPointAngle
  const getCanvasPointAngle = function(from, to) {
    let carriage = Math.atan2((to.y - from.y) , (to.x - from.x)) / (Math.PI / 180);
    if(0 > (to.y - from.y)){
      carriage = Math.abs(carriage);
    } else {
      carriage = 360 - carriage;
    }
    return fixNumber(carriage);
  }
  // getReactCollisionDegree
  const getReactCollisionDegree = function(posDegree, vecDegree){
    posDegree = cleanDegree(posDegree);
    vecDegree = cleanDegree(vecDegree);
    let   carriage;
    const gap       = posDegree - vecDegree;
    if(90 > Math.abs(gap) || 270 < Math.abs(gap) ){
      carriage = (360 + posDegree + 180 + gap) % 360;
    } else {
      carriage = vecDegree;
    }
    return fixNumber(carriage);
  }
  // transitVector **
  const transitVector = function(vector, degree) {
    const diagonal = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const p = degree * (Math.PI/180);
    const x = fixNumber(Math.cos(p) * diagonal);
    const y = fixNumber(-Math.sin(p) * diagonal);
    return new Vector(x, y);
  }
  // public functions //////////////////////////////////////////////////////////
  Object.assign(this, {
    adjustMove(p, v, width, height, n) {
      let carriage = new Point();
      carriage.x = p.x + v.x * this.attribute.speed * n;
      carriage.y = p.y + v.y * this.attribute.speed * n;
      carriage.x = (0 > carriage.x)? 0: carriage.x;
      carriage.x = isNaN(carriage.x)? 0:carriage.x;
      carriage.x = (width < carriage.x)? width: carriage.x;
      carriage.y = (0 > carriage.y)? 0: carriage.y;
      carriage.y = isNaN(carriage.y)? 0:carriage.y;
      carriage.y = (height < carriage.y)? height: carriage.y;
      carriage.x = fixNumber(carriage.x);
      carriage.y = fixNumber(carriage.y);
      return carriage;
    },
    candidateFilter(square, px, py, e, speed, canvasWidth, canvasHeight) {
      let   carriage    = [];
      const vectorCeil  = Math.ceil((e.vector.strength * speed * 2) + (2 * e.attribute.radius));
      let   xMin        = px - vectorCeil;
            xMin        = (0 > xMin)? 0:xMin;
      let   xMax        = px + vectorCeil;
            xMax        = (canvasWidth < xMax)? canvasWidth:xMax;
      let   yMin        = py - vectorCeil;
            yMin        = (0 > yMin)? 0:yMin;
      let   yMax        = py + vectorCeil;
            yMax        = (canvasHeight < yMax)? canvasHeight:yMax;
      for (let y = yMin; y < yMax; y++) {
        for (let x = xMin; x < xMax; x++){
          if('undefined' !== typeof square[x][y]) square[x][y].forEach(e=>{carriage.push(e)});
        }
      }
      if(1 >= carriage.length) return [];
      return carriage;
    },
    detectCollision (que) {
      let carriage = que.filter(e => {
        return ( e.attribute.id !== this.attribute.id ) && ( getDistance(_private.position, e.position) < (e.attribute.radius + _private.attribute.radius) );
      });
      return carriage;
    },
    reactCollision (e) {
      const from        = this.position;
      const to          = e[0].position;
      const corsDeg     = getCanvasPointAngle(from, to);
      const corsVecDeg  = getVecterAngle(this.vector);
      const collDegree  = getReactCollisionDegree(corsDeg,corsVecDeg);
      return transitVector(this.vector, collDegree);
    }
  });
  // Lazy Initialization ///////////////////////////////////////////////////////
  _private.position       = Object.assign(position, Point.prototype);
  _private.vector         = Object.assign(vector, Vector.prototype);
  _private.attribute      = Object.assign(attribute);
  // End of Structure //////////////////////////////////////////////////////////
  Object.seal(this);
  return this;
}
export { Particle, Point, Attribute, Disease, Vector };
