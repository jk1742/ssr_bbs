/***
 * class: Logger
 ***/
import { LOG_SWITCH } from '/class/static/DefineConst';
// Describe Logger Class below
const Logger = function() {
  const _private = {};
  _private.status = LOG_SWITCH;
  _private.space  = '  ';
  // accesscontrol getter setter
  Object.defineProperties(this, {
    status: {
      set: function(obj) {
        if (typeof obj === 'boolean') _private.status = obj;
        else throw new Error('Instance type error: not a Boolean type');
      },
      get: function() {
        return _private.status;
      }
    },
    space: {
      set: function(obj) {
        if (typeof obj === 'string') _private.space = obj;
        else throw new Error('Instance type error: not a string type');
      },
      get: function() {
        return _private.space;
      }
    },

  });
  // public access function
  this.logging = function() {
    if(this.status)console.log.apply(console, arguments);
  }
  this.stepLog = function() {
    let args  = Array.from(arguments);
    let sp    = '';
    let idx   = args[0];
    idx       = (idx.typeof == 'undefined')? 0:idx;
    idx       = (idx > 8)? 8:idx;
    for (let i = 0; i < idx; i++) {
      sp += this.space;
    }
    args.splice(0, 1, sp);
    if(this.status)console.log.apply(console, args);
  }
}
// Declare Logger Class  *** Do not change line sequence ***
export { Logger };
