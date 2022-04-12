/***
 * class: Disease
 ***/
import { Immunity } from './Immunity';
import { DAY, WEEK, ILLNESS_STAGE, STAGE_HEALTH_MAX, STAGE_HEALTH, DEFALUT_RADIUS, FRAME_SETTING } from '/class/static/DefineConst';

// logger set
import { Logger } from './Logger';
const logger = new Logger();

// Describe Disease Class below
const Disease = function(name) {
  const _private = {
    'name': name,
    'phase': 1,
    'stages': [{
      'name': "HEALTHY",
      'color': "Blue",
      'speed': 1
    }],
    'immunity': {},
    'liveTics': 0
  };
  Object.defineProperties(this, {
    name: {
      set: function(obj) {
        if (typeof obj === 'string') _private.name = obj;
        else throw new Error('Instance type error: not a String type');
      },
      get: function() {
        return _private.name;
      },
      enumerable:true
    },
    phase: {
      set: function(obj) {
        if (typeof obj === 'number') _private.phase = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.phase;
      },
      enumerable:true
    },
    stages: {
      get: function() {
        return _private.stages;
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
    immunity: {
      set: function(obj) {
        // filter
        if (!obj instanceof Immunity) {
          console.warn('*** WARNING: not proper type of Immunity.');
          return;
        }
        // new
        if (typeof _private.immunity.prefer === 'undefined'){
          logger.stepLog(2,"new Immunity.");
          _private.immunity = obj;
          return;
        }
        // renew
        if (_private.immunity.status == false){
          logger.stepLog(2,"renew Immunity.");
          _private.immunity = obj;
          return;
        }
        // replace
        if((_private.immunity.status) & (obj.prefer > _private.immunity.prefer)) {
          logger.stepLog(2,"replace Immunity. new:", obj.prefer, " > pre:", _private.immunity.prefer);
          _private.immunity = obj;
        }
        // reject
        else {
          logger.stepLog(2,"deny replacing Immunity. new:", obj.prefer, " > pre:", _private.immunity.prefer);
          return;
        }
      },
      get: function() {
        return _private.immunity;
      },
      enumerable:true
    },
  });
  // public access
  this.addStage = function(obj) {
    _private.stages.push(obj);
  }
  this.gainImmune = function() {
    logger.logging('Disease/gainImmune');
    this.immunity = new Immunity('nature-Adaptive', this.name, 0.5, 15 );
  }
  this.aging = function() {
    _private.liveTics += 1;
    // check immunity
    if(typeof _private.immunity.status === 'undefined') return;
    this.immunity.aging();
  }
  this.exacerbate = function() {
    logger.stepLog(1,"# disease/exacerbate");
    this.phase ++;
  }
  this.cure = function() {
    logger.stepLog(1,"# cure");
    let immune ;
    let currentRecovery;
    if(this.immunity.status){
      immune = this.immunity.factor;
    }
    this.phase --;
    currentRecovery = _private.stages[_private.phase].recovery;
    //get immune
    _private.stages[_private.phase].recovery = (currentRecovery + immune) > 1 ? 1: (currentRecovery + immune) ;
  }
}
// Declare Disease Class  *** Do not change line sequence ***
export { Disease, Immunity };
