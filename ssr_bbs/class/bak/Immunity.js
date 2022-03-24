/***
 * class: Point
 ***/
 import { Logger } from './Logger';
 import { FRAME_SETTING } from '/class/static/DefineConst';
 const logger = new Logger();

// Describe Point Class below
const Immunity = function(name, type, factor, efflives, sideEf) {
  const _private = {
    name      : name,
    type      : type,
    date      : '',
    liveTics  : 0,
    efflives  : efflives,
    status    : true,
    factor    : factor,
    sideEf    : sideEf,
    prefer    : 0
  };
  Object.defineProperties(this, {
    name: {
      get: function() {
        return _private.name;
      },
      enumerable:true
    },
    type: {
      get: function() {
        return _private.type;
      },
      enumerable:true
    },
    liveTics: {
      set: function(obj) {
        if (typeof obj === 'number') {
          _private.liveTics = obj;
        } else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.liveTics;
      },
      enumerable:true
    },
    liveDays: {
      get: function() {
        return parseInt(_private.liveTics / FRAME_SETTING.DAY);
      },
      enumerable:true
    },
    efflives: {
      set: function(obj) {
        if (typeof obj === 'number') _private.efflives = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.efflives;
      },
      enumerable:true
    },
    status: {
      set: function(obj) {
        if (typeof obj === 'boolean') _private.status = obj;
        else throw new Error('Instance type error: not a Boolean type');
      },
      get: function() {
        return _private.status;
      },
      enumerable:true
    },
    factor: {
      set: function(obj) {
        if (typeof obj === 'number') _private.factor = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.factor;
      },
      enumerable:true
    },
    sideEf: {
      set: function(obj) {
        if (typeof obj === 'number') _private.sideEf = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.sideEf;
      },
      enumerable:true
    },
    prefer: {
      set: function(obj) {
        if (typeof obj === 'number') _private.prefer = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.prefer;
      },
      enumerable:true
    }
  });
  this.aging = function() {
    if(!_private.status) return;
    _private.liveTics += 1;
    if(0!=(_private.liveTics % FRAME_SETTING.DAY)) return;
    logger.stepLog(1,"Disease/immunity/aging:", "this.liveDays:",this.liveDays, "immunity.efflives:",this.efflives);
    if(this.liveDays > this.efflives){
      _private.liveTics = 0;
      _private.status = false;
      logger.stepLog(1,"immunity lost");
    }
  }
}
// Declare Point Class  *** Do not change line sequence ***
export { Immunity };
