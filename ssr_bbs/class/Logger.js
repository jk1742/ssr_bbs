/***
 * class: Logger
 ***/
import { LOG_SWITCH } from '/class/static/DefineConst';
// Describe Logger Class below
const Logger = function() {
  const _private = {};
  _private.status = LOG_SWITCH;
  _private.space  = '  ';
  const calSpace = (idx) => {
    idx = (idx > 8) ? 8 : idx;
    let sp = '';
    for (let i = 0; i < idx; i++) {
      sp += this.space;
    }
    return sp;
  }

  //* accessControl getter setter
  Object.defineProperties(this, {
    status: {
      set: function(obj) {
        if (typeof obj !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        _private.status = obj;
      },
      get: function() {
        return _private.status;
      }
    },
    space: {
      set: function(obj) {
        if (typeof obj !== 'string') throw new Error('Instance type error: not a string type');
        _private.space = obj;
      },
      get: function() {
        return _private.space;
      }
    },

  });
  // public access function
  this.log = function() {
    if(this.status)console.log.apply(console, arguments);
  }
  this.step = function() {
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
  this.ind = (o) =>calSpace(o)

  Object.seal(this);
  return this;
}
export { Logger };
