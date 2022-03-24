/***
 * class: Attribute
 ***/
import { Disease, Immunity } from './Disease';
import { Logger } from './Logger';
import { DAY, WEEK, ILLNESS_STAGE, STAGE_HEALTH_MAX, STAGE_HEALTH, DEFALUT_RADIUS, FRAME_SETTING } from '/class/static/DefineConst';
const logger = new Logger();

// Describe Attribute Class below
const Attribute = function(section, group, disease, isolated ) {
  //private register
  const _private = {};
  _private.id           = $SR.uuidv4();
  _private.section      = section;
  //_private.group      = new Set(group);
  _private.group        = [];
  _private.tics         = 0;
  _private.healthGage  = STAGE_HEALTH;
  _private.isolated     = false;
  _private.isSelected   = false;
  _private.onFocus      = false;
  _private.color;
  _private.speed;
  _private.radius       = DEFALUT_RADIUS;
  //_private.disease      = disease;
  _private.disease;
  _private.immunityPool = [];
  // public register
  Object.defineProperties(this, {
    id: {
      get: function() {
        return _private.id;
      },
      enumerable:true
    },
    isSelected: {
      set: function(obj) {
        if (typeof obj === 'boolean') _private.isSelected = obj;
        else throw new Error('Instance type error: not a Boolean type');
      },
      get: function() {
        return _private.isSelected;
      },
      enumerable:true
    },
    isolated:{
      set: function(obj) {
        if (typeof obj === 'boolean') _private.isolated = obj;
        else throw new Error('Instance type error: not a Boolean type');
      },
      get: function() {
        return _private.isolated;
      },
      enumerable:true
    },
    onFocus: {
      set: function(obj) {
        if (typeof obj === 'boolean') _private.onFocus = obj;
        else throw new Error('Instance type error: not a Boolean type');
      },
      get: function() {
        return _private.onFocus;
      },
      enumerable:true
    },
    healthGage: {
      get: function() {
        return _private.healthGage;
      },
      set: function(obj) {
        if (typeof obj === 'number') _private.healthGage = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      enumerable:true
    },
    section: {
      set: function(obj) {
        if (typeof obj === 'number') _private.section = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.section;
      },
      enumerable:true
    },
    liveTics: {
      get: function() {
        return parseInt(_private.tics % FRAME_SETTING.DAY);
      },
      enumerable:true
    },
    liveDays: {
      get: function() {
        return parseInt(_private.tics / FRAME_SETTING.DAY);
      },
      enumerable:true
    },
    group: {
      set: function(obj) {
        if (obj instanceof Array) _private.group = obj;
        else throw new Error('Instance type error: not a Array type');
      },
      get: function() {
        return _private.group;
      },
      enumerable:true
    },
    disease: {
      set: function(obj) {
        if (obj instanceof Disease) _private.disease = obj;
        else {
          _private.disease = ILLNESS_STAGE;
          //throw new Error('Instance type error: not a IllenessStage type');
          console.warn('*** WARNING: not proper type of Disease Stages, replaced by default structure.');
        }
      },
      get: function() {
        return _private.disease;
      },
      enumerable:true
    },
    color: {
      get: function() {
        return _private.disease.stages[_private.disease.phase].color;
      },
      enumerable:true
    },
    speed: {
      get: function() {
        return _private.disease.stages[_private.disease.phase].speed;
      },
      enumerable:true
    },
    radius: {
      set: function(obj) {
        if (typeof obj === 'number') _private.radius = obj;
        else throw new Error('Instance type error: not a Number type');
      },
      get: function() {
        return _private.radius;
      },
      enumerable:true
    }
  });
  // constructor
  this.group        = group;
  this.disease      = disease;
  // public access
  this.addGroup = function(strGroup) {
    _private.group.push(strGroup);
  }
  this.aging = function(speed) {
    //console.log("againg speed:",speed);
    //_private.tics += 1;
    _private.tics = _private.tics + (1 * speed);
    if(0 == _private.tics % ( FRAME_SETTING.DAY )){
      // day pass
    }
    this.disease.aging();
    if (_private.disease.phase > 0 && _private.disease.phase < 5) {
      let term  = _private.disease.stages[_private.disease.phase].term;
      let tic   = parseInt(STAGE_HEALTH_MAX / term);
      let day   = _private.tics % ( FRAME_SETTING.DAY );
      if (this.healthGage < tic) {
        this.disease.exacerbate();
        this.healthGage = STAGE_HEALTH;
        return;
      } else if (this.healthGage > STAGE_HEALTH_MAX) {
        this.disease.cure();
        this.disease.gainImmune();
        this.healthGage = STAGE_HEALTH;
        return;
      }
      if (0 == day) {
        let recovery    = _private.disease.stages[_private.disease.phase].recovery;
        let dice        = $SR.getRandomIntInclusive(1,1000)/1000;
        let sgn         = (_private.disease.stages[_private.disease.phase].recovery < dice) ? -1 : 1;
        this.healthGage = this.healthGage  + sgn * parseInt(STAGE_HEALTH / term);
        logger.stepLog(1,"day:", this.liveDays, "Stage-health:", this.healthGage, "val:", sgn,"recovery:",recovery,"dice:",dice,"disease.phase", _private.disease.phase);
      }
    }
  }
  /*
  this.isolated = function() {
    logger.logging("isolated!");

  }*/
  this.contact = function() {
    logger.logging("contect");
    _private.disease.phase++;
  }
  Object.seal(this);
}

// Declare Attribute Class  *** Do not change line sequence ***
export { Attribute, Disease };
