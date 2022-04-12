/***
 * class: SocialGroup
 ***/

// Describe SocialGroup Class below
const SocialGroup = function(name, speed, health, recovery, img) {
  const _private    = {};
  _private.name;
  _private.img;
  _private.speed;
  _private.recovery;
  _private.health;
  // access List ///////////////////////////////////////////////////////////////
  Object.defineProperties(this, {
    name: {
      set: function(obj) {
        if (typeof obj === 'string') { _private.name = obj; }
      },
      get: function() {
        return _private.name;
      },
      enumerable:true
    },
    img: {
      set: function(obj) {
        if (typeof obj === 'string') _private.img = obj;
      },
      get: function() {
        return _private.img;
      },
      enumerable:true
    },
    speed: {
      set: function(obj) {
        if (typeof obj === 'number') _private.speed = obj;
      },
      get: function() {
        return _private.speed;
      },
      enumerable:true
    },
    recovery: {
      set: function(obj) {
        if (typeof obj === 'number') _private.recovery = obj;
      },
      get: function() {
        return _private.recovery;
      },
      enumerable:true
    },
    health: {
      set: function(obj) {
        if (typeof obj === 'number') _private.health = obj;
      },
      get: function() {
        return _private.health;
      },
      enumerable:true
    },
  });
  this.name     = name;
  this.img      = img;
  this.speed    = speed;
  this.recovery = recovery;
  this.health   = health;
  Object.assign(this, {
    toJSONObject () {
      return {
        name    :_private.name,
        img     :_private.img,
        speed   :_private.speed,
        recovery:_private.recovery,
        health  :_private.health
      }
    }
  });
  Object.seal(this);
}
// Declare Point Class  *** Do not change line sequence ***
export { SocialGroup };
