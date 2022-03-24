import { Point } from '/class/Point';
import { Vector } from '/class/Vector';
import { Attribute, Disease } from '/class/Attribute';

/**
 * model: Particle model
 **/
const Particle = function(position, vector, attribute) {
  // set private
  const _private = {};
  // private value validate getter & setter
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
  // inject object
  _private.position       = Object.assign(position, Point.prototype);
  _private.vector         = Object.assign(vector, Vector.prototype);
  _private.attribute      = Object.assign(attribute);
  //
  if (status == undefined) status = null;
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

  var getDistance = function(pos1, pos2) {
    return Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2));
  }
  var toRadians = function(degree) {
    return degree * (Math.PI / 180);
  }
  // getCanvasPointAngle
  var getCanvasPointAngle1 = function(from, to) {
    var angle = Math.atan((from.y - to.y) / (to.x - from.x)) / (Math.PI / 180);
    if (angle > 0) {
      if (to.y < from.y) return angle;
      else return 180 + angle;
    } else {
      if (to.x < from.x) return 180 + angle;
      else return 360 + angle;
    }
  }
  const getCanvasPointAngle = function(from, to) {
    let carriage;
    let angle = Math.atan((from.y - to.y) / (to.x - from.x)) / (Math.PI / 180);
    if (angle > 0) {
      if (to.y < from.y) carriage = angle;
      else carriage = 180 + angle;
    } else {
      if (to.x < from.x) carriage = 180 + angle;
      else carriage = 360 + angle;
    }
    if(isNaN(carriage)) console.log(`getCanvasPointAngle::${angle}`);
    return carriage;
  }
  // getCanvasVecterAngle
  var getCanvasVecterAngle = function(point) {
    //console.log("Point/getCanvasVecterAngle:", point.x, point.y);
    return getCanvasPointAngle(new Point(0,0), new Point(0 + point.x, 0 + point.y));
  }
  // purgeDegree
  var purgeDegree = function(d){
    var s = d % 360;
    return s < 0 ? 360 + s : s;
  }
  // getReactCollisionDegree
  var getReactCollisionDegree = function(posDegree, vecDegree) {
    // into action
    var carriage;
    posDegree = purgeDegree(posDegree);
    vecDegree = purgeDegree(vecDegree);
    //console.log("getReactCollisionDegree:",posDegree.toFixed(3), vecDegree.toFixed(3));
    if(vecDegree==0) vecDegree = 360;
    var poDeg = purgeDegree(posDegree + 90);
    var gapDeg = poDeg - vecDegree;
    carriage = purgeDegree(poDeg + gapDeg);
    //console.log("getReactCollisionDegree:gapDeg",gapDeg , poDeg, poDeg + gapDeg);
    // out action
    if( -180 < gapDeg && gapDeg < 0 ) {
      //console.log("getReactCollisionDegree:1");
      carriage = vecDegree;
    } else if ((posDegree + 90) > 360 && 0 < vecDegree && vecDegree < poDeg ) {
      // exception
      // console.log("getReactCollisionDegree:2");
    } else if ((posDegree - 90) > vecDegree) {
      //console.log("getReactCollisionDegree:3");
      carriage = vecDegree;
    }
    return carriage;
  }

  // transitVector **
  var transitVector = function(vector, degree) {
    let l = getDistance(new Point(0, 0), vector);
    let r = toRadians(degree);
    let x = Math.cos(r) * l;
    let y = - Math.sin(r) * l;
    let carriage;
    switch(Math.sin(r)){
      case Math.sin(Math.PI/2):
        carriage = new Vector(0, -l);
        if(isNaN(carriage.x)) console.log(`transitVector:1:${carriage.x},${carriage.y}`)
        break;
      case Math.sin(3*(Math.PI/2)):
        carriage =  new Vector(0, l);
        if(isNaN(carriage.x)) console.log(`transitVector:2:${carriage.x},${carriage.y}`)
        break;
      case Math.sin(Math.PI):
        carriage =  new Vector(-l, 0);
        if(isNaN(carriage.x)) console.log(`transitVector:3:${carriage.x},${carriage.y}`)
        break;
      case Math.sin(0):
        carriage =  new Vector(l, 0);
        if(isNaN(carriage.x)) console.log(`transitVector:4:${carriage.x},${carriage.y}`)
        break;
      default:
        carriage =  new Vector(x, y);
        if(isNaN(carriage.x)) {
          console.log(`transitVector:5:  x:${x},y:${y}  r:${r}, l:${l}, degree:${degree}`);

        }
    }
    return carriage;
  }

  // public access
  this.adjustMove = function(p, v, width, height, n) {
    //if infected: slowing
    var carriage = new Point();
    carriage.x = p.x + v.x * attribute.speed * n;
    carriage.y = p.y + v.y * attribute.speed * n;
    carriage.x = (0 > carriage.x)? 0: carriage.x;
    carriage.x = (width < carriage.x)? width: carriage.x;
    if(isNaN(carriage.x)){
      console.log(`${p.x} + ${v.x} * ${attribute.speed} * ${n}`);
    }
    carriage.x = isNaN(carriage.x)? 0:carriage.x;
    carriage.y = (0 > carriage.y)? 0: carriage.y;
    carriage.y = (height < carriage.y)? height: carriage.y;
    carriage.y = isNaN(carriage.y)? 0:carriage.y;
    return carriage;
  }
  this.candidateFilter = function(square, px, py, e, speed, canvasWidth, canvasHeight){
    let carriage = [];
    const vectorCeil   =  Math.ceil((e.vector.strength * speed * 2) + (2 * e.attribute.radius));
    let xMin = px - vectorCeil;
    xMin = (0 > xMin)? 0:xMin;
    let xMax = px + vectorCeil;
    xMax = (canvasWidth < xMax)? canvasWidth:xMax;
    let yMin = py - vectorCeil;
    yMin = (0 > yMin)? 0:yMin;
    let yMax = py + vectorCeil;
    yMax = (canvasHeight < yMax)? canvasHeight:yMax;
    for (let y = yMin; y < yMax; y++) {
      for (let x = xMin; x < xMax; x++){
        if('undefined' !== typeof square[x][y]) square[x][y].forEach(e=>{carriage.push(e)});
      }
    }
    if(1 >= carriage.length) return [];
    return carriage;
  }

  this.detectCollision = function(que) {
    que.filter(e => {
      return getDistance(_private.position, e.position) < 2 * _private.attribute.radius;
    });
    que = que.filter(e => {
      return e.attribute.id != this.attribute.id;
    });
    if (que.length > 0) {
      return que;
    }
    return null;
  }

  this.reactCollision = function(e) {
    var carriage    = new Point(0,0);
    var vec         = getDistance(this.vector, new Point(0, 0));
    if( vec == 0 )  return carriage;
    //console.log("reactCollision-collision! cos value", getCanvasPointAngle(this.position, e[0].position));
    var pointA      = this.position;
    var pointB      = e[0].position;
    //var pointB      = e.position;
    var corsDeg     = getCanvasPointAngle(pointA, pointB);
    var corsVecDeg  = getCanvasVecterAngle(this.vector);
    var collDegree  = getReactCollisionDegree(corsDeg,corsVecDeg);
    carriage        = transitVector(this.vector, collDegree);
    if(isNaN(carriage.x)){
      console.log(`reactCollision:${carriage.x} this:${this.vector.x},${this.vector.y}`);
      console.log(`corsDeg:${corsDeg}  corsVecDeg:${corsVecDeg}   collDegree:${collDegree}`);
    }
    return carriage;
  }
  Object.seal(this);
}
export { Particle, Point, Attribute, Disease, Vector };
