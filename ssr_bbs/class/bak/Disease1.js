import { Immunity } from '/class/Immunity';
import { DAY, WEEK, ILLNESS_STAGE, STAGE_HEALTH_MAX, STAGE_HEALTH, DEFALUT_RADIUS, FRAME_SETTING, NATURE_GAGE, IMMUN_GERATE_CNT } from '/class/static/DefineConst';

// logger set
import { Logger } from '/class/Logger';
const logger = new Logger();
//logger.status = true;
logger.status = false;

/***
 * class: Disease
 ***/
// Describe Disease Class below ////////////////////////////////////////////////
const Disease = function(name, damage, antiBodyAdapt, resistRating, immunityEx, img, ro) {

  // Set Private & Inheritance /////////////////////////////////////////////////
  const _private = {
    'name': name,
    'liveDays': 0,
    'damage': damage,
    'antiBodyAdapt': antiBodyAdapt,
    'img': img,
    'basicRo': ro,
    'effectRo': ro
  };
  let   resistCnt = 0;
  let   immunity  = {};

  // Privilige Static Functions ////////////////////////////////////////////////
  const fixNumber = function(x) {
    return Number(Number.parseFloat(x).toFixed(3));
  }
  const gainNatureImmune = function(liveDays) {
    return new Immunity('natureAdaptive', name, 'NA', 0.5, liveDays, 45 );
  }
  const boolTest = function( obj ){
    let carriage = false;
    carriage = (typeof obj === 'undefined'|| obj === null) ? false:obj;
    return carriage
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
    ro: {
      set: function(obj) {
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.effectRo = obj;
      },
      get: function() {
        return _private.effectRo;
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
    liveDays: {
      get: function() {
        return _private.liveDays;
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
          immunity = obj;
          return;
        }
        // renew
        if (immunity.status == false){
          logger.stepLog(1,"renew Immunity.");
          immunity = obj;
          return;
        }
        // replace
        if((immunity.status) & (obj.prefer > immunity.prefer)) {
          logger.stepLog(1,"replace Immunity. new:", obj.prefer, " > pre:", _private.immunity.prefer);
          immunity = obj;
        }
        // reject
        else {
          logger.stepLog(1,"deny replacing Immunity. new:", obj.prefer, " > pre:", immunity.prefer);
          return;
        }
      },
      get: function() {
        return immunity;
      },
      enumerable:true
    },
    img: {
      get: function() {
        return _private.img;
      },
      enumerable:true
    },
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    injectImmunity (immunity) {
      logger.stepLog(1,"#injectImmunity",immunity);
      //this.immunity = new Immunity('nature-Adaptive', this.name, 0.5, 15 );
    },
    aging (liveDays) {
      _private.liveDays += 1;
      if(immunityEx < resistCnt && !boolTest(this.immunity.status)){
        this.immunity = gainNatureImmune(liveDays);
        // resist count reset
        resistCnt = 0;
      }
      // check immunity
      if('undefined' === typeof this.immunity.status) return false;
      // this.immunity.aging();
      // first time immunity
      // return this.immunity.status && this.immunity.liveDays <= 1 ;
      return this.immunity;
    },
    progress(phase, antibody){
      let recoveryDice    = $SR.getRandomIntInclusive(1,resistRating)/1000;
      let immunityFactor  = 0;
      let antiBodyAdapt   = this.antiBodyAdapt;
      if ('undefined' !== typeof this.immunity.status) {
        immunityFactor    = this.immunity.factor;
        // if immunity take root on body then antibody work nomaly
        antiBodyAdapt     = 1;
      }
      let sign = (1 < (antibody * antiBodyAdapt + recoveryDice + immunityFactor))? 1: -1;
      if(0 < sign && !boolTest(this.immunity.status)) resistCnt++;
      logger.stepLog(1,`antibody:${antibody} * Adapt:${antiBodyAdapt} + recoveryDice:${recoveryDice} + immunityFactor:${immunityFactor} = ${(antibody*antiBodyAdapt + recoveryDice + immunityFactor).toFixed(4)}`);
      logger.stepLog(1,`resistCnt:${resistCnt}`);
      return (0 < sign);
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
