/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { SocialGroup } from '/class/SocialGroup';
import { Disease, Immunity } from '/class/Disease';
import { BodyModel } from '/class/BodyModel';
import { Logger } from '/class/Logger';
import { DAY, WEEK, ILLNESS_STAGE, STAGE_HEALTH_MAX, STAGE_HEALTH, DEFALUT_RADIUS, FRAME_SETTING } from '/class/static/DefineConst';
const logger = new Logger();
logger.status = false;

/***
 * class: Attribute
 ***/
// Describe Attribute Class below
const Attribute = function(section, group, disease, radius, age, isolated ) {
  'use strict';

  // set private & Inheritance /////////////////////////////////////////////////
  let stageHealth       = STAGE_HEALTH;
  const _private        = {};
  _private.age;
  _private.id           = $SR.uuidv4();
  _private.section      = section;
  _private.group        = [];
  _private.tics         = 0;
  _private.isolated     = false;
  _private.isSelected   = false;
  _private.onFocus      = false;
  // _private.color;
  _private.speed;
  _private.radius       = DEFALUT_RADIUS;
  _private.disease      = [];
  let toHospital        = -1;
  let putOnMask         = -1;
  let lockdown          = -1;
  let keepDistance      = -1;
  let immunityPool      = [];
  let bodyModel         = new BodyModel(age);

  // privilige static functions ////////////////////////////////////////////////
  const repeat = function(howMany, fx){
    for (let i = 0; i < howMany; i++) {
      fx();
    }
  }
  const fixNumber = function(x) {
    return Number(Number.parseFloat(x).toFixed(3));
  }

  // public value getter & setter //////////////////////////////////////////////
  Object.defineProperties(this, {
    age: {
      set: function(obj) {
        _private.age = obj;
      },
      get: function() {
        return _private.age;
      },
      enumerable:true
    },
    id: {
      get: function() {
        return _private.id;
      },
      enumerable:true
    },
    isSelected: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? false:obj;
        if (typeof obj !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        _private.isSelected = obj;
      },
      get: function() {
        return _private.isSelected;
      },
      enumerable:true
    },
    isolated:{
      set: function(obj) {
        obj = (typeof obj === 'undefined')? false:obj;
        if (typeof obj !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        _private.isolated = obj;
      },
      get: function() {
        return _private.isolated;
      },
      enumerable:true
    },
    immunityPool:{
      set: function(array) {
        immunityPool = array;
      },
      get: function() {
        return immunityPool;
      },
      enumerable:true
    },
    onFocus: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? false:obj;
        if (typeof obj !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        _private.onFocus = obj;
      },
      get: function() {
        return _private.onFocus;
      },
      enumerable:true
    },
    healthStatus: {
      get: function() {
        return bodyModel.status;
      },
      enumerable:true
    },
    healthGage: {
      get: function() {
        return bodyModel.healthGage;
      },
      enumerable:true
    },
    section: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? 0:obj;
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.section = obj;
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
        if (!Array.isArray(obj)) throw new Error('Instance type error: not a Array type');
        _private.group.forEach((item, i) => {
          logger.stepLog(0, 'remove effect', item.name, item.health, item.speed, item.recovery);
          stageHealth     = stageHealth / item.health;
          _private.speed  = _private.speed / item.speed;
        });
        _private.group = [];
        obj.forEach((item, i) => {
          if(!(item instanceof SocialGroup)) throw new Error('Instance type error: not a SocialGroup type');
          logger.stepLog(0, 'add effect', item.name, item.health, item.speed, item.recovery);
          stageHealth     = stageHealth * item.health;
          _private.speed  = _private.speed * item.speed;
          _private.group.push(_.cloneDeep(item));
        });
      },
      get: function() {
        return _private.group;
      },
      enumerable:true
    },
    disease: {
      set: function(obj) {
        _private.disease = obj;
      },
      get: function() {
        return _private.disease;
      },
      enumerable:true
    },
    color: {
      get: function() {
        return bodyModel.color;
      },
      enumerable:true
    },
    speed: {
      get: function() {
        let c = 0;
        if(!this.isolated) c = _private.speed * bodyModel.speed;
        return c;
      },
      enumerable:true
    },
    radius: {
      set: function(obj) {
        obj = (typeof obj === 'undefined')? 0:obj;
        if (typeof obj !== 'number') throw new Error('Instance type error: not a Number type');
        _private.radius = obj;
      },
      get: function() {
        return _private.radius;
      },
      enumerable:true
    },
    toHospital    : { get: () => toHospital   , enumerable:true },
    putOnMask     : { get: () => putOnMask    , enumerable:true },
    keepDistance  : { get: () => keepDistance , enumerable:true },
    lockdown      : { get: () => lockdown     , enumerable:true },
  });

  // public functions //////////////////////////////////////////////////////////
  Object.assign(this, {
    appendDisease(disease){
      if(!(immun instanceof Disease)) throw new Error('Instance type error: not a Disease type');
      let match = _private.disease.findIndex((e)=> e.name === disease.name);
      if(0 > match) _private.disease.push(_.cloneDeep(disease));
    },
    appendImmunity(immun){
      if(!(immun instanceof Immunity)) throw new Error('Instance type error: not a Immunity type');
      const match = immunityPool.findIndex((e)=>(e.id === immun.id));
      if(0 > match) immunityPool.push(_.cloneDeep(immun));
    },
    addGroup(strGroup) {
      _private.group.push(strGroup);
    },
    aging(speed) {
      _private.tics = _private.tics + (1 * speed);
      if(0 !== (_private.tics % FRAME_SETTING.DAY) || 0 === bodyModel.phase) return;
      // treat effect
      _private.isolated = (0 < lockdown)? true: false;
      _private.isolated = (0 < toHospital)? true: false;
      // effect aging
      toHospital    -= 1;
      toHospital    = (toHospital > 0) ? toHospital:-1;
      putOnMask     -= 1;
      putOnMask     = (putOnMask > 0) ? putOnMask:-1;
      keepDistance  -= 1;
      keepDistance  = (keepDistance > 0) ? keepDistance:-1;
      lockdown      -= 1;
      lockdown      = (lockdown > 0) ? lockdown:-1;
      // aging Disease
      this.disease.forEach((d) => {
        const hasFirstImmunity = d.aging(this.liveDays, putOnMask, keepDistance, toHospital, lockdown);
        // gain nature immunity
        if(hasFirstImmunity){
          const c = immunityPool.findIndex((e)=> (e.disease === d.name));
          if(0 > c) immunityPool.push(d.immunity);
        }
        const sign = d.progress(bodyModel.phase, bodyModel.antibody);
        if(!sign) bodyModel.progress(d.damage);
      });
      bodyModel.recover();
      // fully recover, then erease disease from a body
      if(bodyModel.totalHealth === bodyModel.healthGage && _private.disease.length > 0 && immunityPool.length> 0) {
        immunityPool.forEach((immun) => {
          if(0 >= _private.disease.lengh) return;
          const match = _private.disease.findIndex(e=> e.name === immun.disease);
          if(0 <= match)_private.disease.splice(match,1);
        });
      }
      //console.log( 'Attribute:', this.healthStatus, this.color);
    },
    attachHealthGage(o){
      logger.stepLog(0,'attachHealthGage', o);
    },
    contact (disease) {
      let carriage = [];
      if('DEATH' == bodyModel.status) return carriage;
      this.disease.forEach((item) => {
        carriage.push(_.cloneDeep(item));
      });
      for (let i = 0; i < disease.length; i++) {
        const d     = disease[i];
        let   match = -1;
        // immunity check
        if(0 <= immunityPool.findIndex((e) => (d.name === e.disease))) continue;
        // disease check
        if(0 <= this.disease.findIndex((e) => (d.name === e.name))) continue;
        logger.stepLog(0,'this.disease:infected:1:',this.id, d.name, d.ro, immunityPool);
        carriage.push(_.cloneDeep(d));
      }
      logger.stepLog(0,'contact.return:',carriage);
      return carriage;
    },
    treatToHospital(){
      if(-1 >= toHospital) toHospital = 0
      toHospital += 7;
    },
    treatPutOnMask(){
      if(-1 >= putOnMask) putOnMask = 0
      putOnMask += 7;
    },
    treatKeepDistance(){
      if(-1 >= keepDistance) keepDistance = 0
      keepDistance += 7;
    },
    treatLockdown(){
      if(-1 >= lockdown) lockdown = 0
      lockdown += 7;
    },
    toTableString(){
      let   txtGroup    = [];
      const arrayGroup  = this.group;
      arrayGroup.forEach((o, i) => {
        txtGroup.push(o.name);
      });
      let   txtDisease    = [];
      const arrayDisease  = this.disease;
      arrayDisease.forEach((disease, i) => {
        txtDisease.push(disease.name + ': ' + disease.rNumber);
      });
      //immunityPool
      let   txtImunity    = [];
      immunityPool.forEach((immun, i) => {
        txtImunity.push(immun.disease + ': ' + immun.type);
      });
      return {
        isSelected: this.isSelected, id:this.id, age: this.age, socialGroup: _.join(txtGroup, ', '), immunities: _.join(txtImunity,', '), infections: _.join(txtDisease, ', '),
        health: this.healthGage, onMask: this.putOnMask, keepDistance: this.keepDistance, hospital: this.toHospital, lockdown: this.lockdown
      }
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  _private.speed    = 1;
  this.isolated     = isolated;
  this.group        = group;
  this.disease      = disease;
  this.radius       = radius;
  this.age          = age;

  // End of Structure //////////////////////////////////////////////////////////
  Object.seal(this);
  return this;
}

// Declare Attribute Class  *** Do not change line sequence ***
export { Attribute, Disease };
