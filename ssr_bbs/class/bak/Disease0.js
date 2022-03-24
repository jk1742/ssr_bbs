import { Immunity } from '/class/Immunity';
import { DAY, WEEK, ILLNESS_STAGE, STAGE_HEALTH_MAX, STAGE_HEALTH, DEFALUT_RADIUS, FRAME_SETTING, NATURE_GAGE, IMMUN_GERATE_CNT } from '/class/static/DefineConst';

// logger set
import { Logger } from '/class/Logger';
const logger = new Logger();
logger.status = false;

/***
 * class: Disease
 ***/
// Describe Disease Class below ////////////////////////////////////////////////
const Disease = function(name, damage, antiBodyAdapt, resistRating) {
  // Set Private & Inheritance /////////////////////////////////////////////////
  const _private = {
    'name': name,
    'immunity': {},
    'liveTics': 0,
    'damage': damage,
    'antiBodyAdapt': antiBodyAdapt
  };
  let   resistCnt = 0;

  // Privilige Static Functions ////////////////////////////////////////////////
  const fixNumber = function(x) {
    return Number(Number.parseFloat(x).toFixed(3));
  }
  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    antiBodyAdapt: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.antiBodyAdapt = obj;
      },
      get: function() {
        return _private.antiBodyAdapt;
      },
      enumerable:true
    },
    damage: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.damage = obj;
      },
      get: function() {
        return _private.damage;
      },
      enumerable:true
    },
    name: {
      set: function(obj) {
        if (typeof obj !== 'string') throw new Error('Instance type error: not a String type');
        _private.name = obj;
      },
      get: function() {
        return _private.name;
      },
      enumerable:true
    },
    liveTics: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.liveTics = obj;
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
          logger.stepLog(1,"new Immunity.");
          _private.immunity = obj;
          return;
        }
        // renew
        if (_private.immunity.status == false){
          logger.stepLog(1,"renew Immunity.");
          _private.immunity = obj;
          return;
        }
        // replace
        if((_private.immunity.status) & (obj.prefer > _private.immunity.prefer)) {
          logger.stepLog(1,"replace Immunity. new:", obj.prefer, " > pre:", _private.immunity.prefer);
          _private.immunity = obj;
        }
        // reject
        else {
          logger.stepLog(1,"deny replacing Immunity. new:", obj.prefer, " > pre:", _private.immunity.prefer);
          return;
        }
      },
      get: function() {
        return _private.immunity;
      },
      enumerable:true
    },
  });
  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    gainImmune () {
      logger.stepLog(1,"#gainImmune");
      this.immunity = new Immunity('nature-Adaptive', this.name, 0.5, 15 );
    },
    aging () {
      _private.liveTics += 1;
      if(IMMUN_GERATE_CNT < resistCnt && (typeof this.immunity.status !== 'undefined' || !this.immunity.status)){
        console.log("#aging", _private.liveTics, resistCnt);
        this.gainImmune();
        // resist count reset
        resistCnt = 0;
      }
      // check immunity
      if(typeof _private.immunity.status === 'undefined') return;
      this.immunity.aging();
    },
    getEffect(phase, antibody){
      let recoveryDice    = $SR.getRandomIntInclusive(1,resistRating)/1000;
      let immunityFactor  = 0;
      let antiBodyAdapt   = this.antiBodyAdapt;
      if ('undefined' !== typeof this.immunity.status) {
        immunityFactor    = this.immunity.factor;
        // if immunity take root on body then antibody work nomaly
        antiBodyAdapt     = 1;
      }
      let sign = (1 < (antibody * antiBodyAdapt + recoveryDice + immunityFactor))? 1: -1;
      if(0 < sign) resistCnt++;
      logger.stepLog(1,`(resist + dice + immune) (${antibody} * ${antiBodyAdapt} + ${recoveryDice} + ${immunityFactor}) = result:${antibody*antiBodyAdapt + recoveryDice + immunityFactor}`);
      return sign;
    }
  });
  // Lazy Initialization ///////////////////////////////////////////////////////
  //
  // End of Structure //////////////////////////////////////////////////////////
  Object.seal(this);
  return this;
}
// Declare Disease Class  *** Do not change line sequence ***
export { Disease, Immunity };
