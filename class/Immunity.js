/***
 * class: Point
 ***/
 import { Logger } from './Logger';
 import { FRAME_SETTING } from '/class/static/DefineConst';
 const logger = new Logger();
 logger.status = false;

// Describe Point Class below
const Immunity = function(name, disease, type, factor, startdate, efflives, sideEf) {

  // set private & Inheritance /////////////////////////////////////////////////
  const _private = {
    name      : name,
    type      : type,
    disease   : disease,
    startdate : startdate,
    efflives  : efflives,
    status    : true,
    factor    : factor,
    sideEf    : sideEf,
    prefer    : 0
  };
  let effectiveDays = _private.efflives;
  let liveDays = 0;

  // Access List: getter & setter //////////////////////////////////////////////
  Object.defineProperties(this, {
    id: {
      get: function() {
        return _.join([_private.disease, _private.type, _private.name], '-');
      },
      enumerable:true
    },
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
    disease: {
      get: function() {
        return _private.disease;
      },
      enumerable:true
    },
    liveDays: {
      get: function() {
        return liveDays;
      },
      enumerable:true
    },
    startdate: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.startdate = obj;
      },
      get: function() {
        return _private.startdate;
      },
      enumerable:true
    },
    efflives: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.efflives = obj;
      },
      get: function() {
        return _private.efflives;
      },
      enumerable:true
    },
    status: {
      set: function(obj) {
        if (typeof obj !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        _private.status = obj;
      },
      get: function() {
        return _private.status;
      },
      enumerable:true
    },
    factor: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.factor = obj;
      },
      get: function() {
        return _private.factor;
      },
      enumerable:true
    },
    sideEf: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.sideEf = obj;
      },
      get: function() {
        return _private.sideEf;
      },
      enumerable:true
    },
    prefer: {
      set: function(obj) {
        if (typeof obj === 'number') throw new Error('Instance type error: not a Number type');
        _private.prefer = obj;
      },
      get: function() {
        return _private.prefer;
      },
      enumerable:true
    }
  });

  // public functions //////////////////////////////////////////////////////////
  Object.assign(this, {
    aging() {
      if(!_private.status) return;
      liveDays += 1;
      effectiveDays -= 1;
      logger.stepLog(1,"Disease/immunity/aging/liveDays:",liveDays, "immunity.efflives:",this.efflives);
    },
    initialize(){
      liveDays = 0;
      return this;
    },
    renew(){
      effectiveDays = _private.efflives;
    }

  });

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}

// Declare Point Class  *** Do not change line sequence ***
export { Immunity };
