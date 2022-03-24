/* eslint-disable no-unused-vars */
// import { Immunity } from '/class/Immunity';

// logger set
import { Logger } from '/class/Logger';
const logger = new Logger();
logger.status = false;

/***
 * class: Disease
 ***/
// Describe Disease Class below ////////////////////////////////////////////////
const BodyModel = function( age ) {

  // Set Private & Inheritance /////////////////////////////////////////////////
  //let age         = age;
  let antibody    = 0;
  let color       = '';
  let phase       = 10;
  let status      = '';
  let speed       = 1;
  let recovery    = 10;
  let healthGage  = 0;
  let scaleGage   = 100;
  let totalHealth = 1000;
  // model
  let levelModel  = [];

  // Privilige Static Functions ////////////////////////////////////////////////
  const repeat = function(howMany, fx){
    for (let i = 0; i < howMany; i++) {
      fx();
    }
  }
  const fixNumber = function(x) {
    return Number(Number.parseFloat(x).toFixed(3));
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    age: {
      get: function() {
        return age;
      },
      enumerable:true
    },
    antibody: {
      get: function() {
        return antibody;
      },
      enumerable:true
    },
    color: {
      get: function() {
        return color;
      },
      enumerable:true
    },
    speed: {
      get: function() {
        return speed;
      },
      enumerable:true
    },
    recovery: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? 10:obj;
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        recovery = obj;
      },
      get: function() {
        return recovery;
      },
      enumerable:true
    },
    healthGage: {
      get: function() {
        return healthGage;
      },
      enumerable:true
    },
    totalHealth: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? 1000:obj;
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        totalHealth = obj;
        scaleGage   = totalHealth/10;
      },
      get: function() {
        return totalHealth;
      },
      enumerable:true
    },
    phase: {
      get: function() {
        return phase;
      },
      enumerable:true
    },
    status: {
      get: function() {
        return status;
      },
      enumerable:true
    }
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    exacerbate() {
      logger.stepLog(1,"#exacerbate");
      phase --;
      phase       = (0 > phase)? 0:phase;
      antibody    = levelModel[phase].antibody;
      color       = levelModel[phase].color;
      status      = levelModel[phase].status;
      speed       = levelModel[phase].speed;
    },
    cure() {
      logger.stepLog(1,"#cure");
      phase ++;
      phase       = (10 < phase)? 10:phase;
      antibody    = levelModel[phase].antibody;
      color       = levelModel[phase].color;
      status      = levelModel[phase].status;
      speed       = levelModel[phase].speed;
    },
    progress(damage){
      healthGage = healthGage - damage;
      const currentPhase =  Math.ceil(healthGage / scaleGage);
      logger.stepLog(1,`currentPhase = (healthGage:${healthGage} / scaleGage:${scaleGage})`);
      if(phase > currentPhase) {
        logger.stepLog(1,`(phase > currentPhase) (${phase} > ${currentPhase})`);
        this.exacerbate();
      }
      return healthGage;
    },
    recover(){
       healthGage = healthGage + recovery;
       healthGage = (totalHealth < healthGage)? totalHealth:healthGage;
       const currentPhase =  Math.ceil(healthGage / scaleGage);
       if(phase < currentPhase) {
         logger.stepLog(1,`(phase < currentPhase) (${phase} < ${currentPhase})`);
         this.cure();
       }
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  if (typeof age !== 'number') throw new Error('Instance type error: not a Number type');
  let ageBody = {
      critical: 0, servre: 0, light: 0, asymp: 0, healthy:0
  };
  if(age < 10){
    this.totalHealth = 1000;
    ageBody   = { critical: 1, servre: 2, light: 3, asymp: 2, healthy:2 };
  } else if(10 < age && age < 20){
    this.totalHealth = 1000;
    ageBody   = { critical: 1, servre: 2, light: 3, asymp: 3, healthy:1 };
  } else if(20 < age && age < 40){
    this.totalHealth = 1000;
    ageBody   = { critical: 1, servre: 3, light: 3, asymp: 2, healthy:1 };
  } else if(40 < age && age < 50){
    this.totalHealth = 900;
    ageBody   = { critical: 1, servre: 3, light: 3, asymp: 2, healthy:1 };
  } else {
    this.totalHealth = 650;
    ageBody   = { critical: 1, servre: 3, light: 3, asymp: 2, healthy:1 };
  }
  // set health Gage
  healthGage  = totalHealth;
  recovery    = scaleGage/10;
  levelModel.push({
    status        : 'DEATH',
    color         : '#000000',               //Black
    antibody      : 0,
    speed         : 0
  });
  repeat(ageBody.critical,()=>{
    levelModel.push({
      status      : 'CRITICAL',
      color       : '#8B0000',        //darkred
      antibody    : 0.1,
      speed       : 0.2
    });
  });
  repeat(ageBody.servre,()=>{
    levelModel.push({
      status      : 'SERVRE',
      color       : '#FF7F50',        // Coral
      antibody    : 0.2,
      speed       : 0.4
    });
  });
  repeat(ageBody.light,()=>{
    levelModel.push({
      status      : 'LIGHT',
      color       : '#FF7F50',        // DarkOrange
      antibody    : 0.3,
      speed       : 0.6
    });
  });
  repeat(ageBody.asymp,()=>{
    levelModel.push({
      status      : 'ASYMPTOMATIC',
      color       : '#f2dc12',         // Coral
      antibody    : 0.45,
      speed       : 0.8
    });
  });
  repeat(ageBody.healthy,()=>{
    levelModel.push({
      status      : 'HEALTHY',
      color       : '#6495ED',         // CornflowerBlue
      antibody    : 0.55,
      speed       : 1
    });
  });
  antibody    = levelModel[phase].antibody;
  color       = levelModel[phase].color;
  status      = levelModel[phase].status;
  speed       = levelModel[phase].speed;

  // End of Structure //////////////////////////////////////////////////////////
  Object.seal(this);
  return this;
}
// Declare Disease Class  *** Do not change line sequence ***
export { BodyModel };
