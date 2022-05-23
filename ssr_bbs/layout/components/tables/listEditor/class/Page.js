/**
 * Page class
 * @param {*} size
 * @param {*} orderId
 * @param {*} orderBy
 * @param {*} total
 * @param {*} start
 * @returns
 */
const Page = function(size, orderId, orderBy, total, start){
  let _private = {
    size      : size,
    orderId   : orderId,
    orderBy   : (typeof orderBy === 'undefined') ? 'asc' : orderBy,
    total     : total,
    rows      : [],
    startNum  : (typeof start === 'undefined')? 0:start,
    endNum    : null,
  };
  const _end = (typeof start === 'number' && typeof size === 'number' ) ? (start + size):0;
  _private.endNum = (_end > total) ? total : _end;

  Object.defineProperties(this, {
    size:{
      get: ()   => _private.size,
      set: (o) => { if (typeof o === 'number')_private.size=o},
      enumerable:true, configurable: true
    },
    orderId: {
      get: ()   => _private.orderId,
      set: (o)  => {_private.orderId=o},
      enumerable:true, configurable: true
    },
    orderBy: {
      get: ()   => _private.orderBy,
      set: (o)  => { _private.orderBy=o },
      enumerable:true, configurable: true
    },
    total: {
      get: ()   => _private.total,
      set: (o)  => {_private.total=o},
      enumerable:true, configurable: true
    },
    rows: {
      get: ()   => _private.rows,
      set: (o)  => {_private.rows=o},
      enumerable:true, configurable: true
    },
    startNum: {
      get: () => _private.startNum,
      set: (o) => { if (typeof o === 'number') _private.startNum = (o>0)? o: 0; },
      enumerable:true, configurable: true
    },
    endNum: {
      get: () => _private.endNum,
      set: (o) => { _private.endNum = o },
      enumerable:true, configurable: true
    }
  });


  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    toggleOrderBy() {
      let order = _private.orderBy;
      if('asc' === order) order = 'desc';
      else order = 'asc';
      _private.orderBy = order;
      return order;
    },
    preTic(){
      const k = _private.startNum - _private.size;
      _private.startNum = (k > 0) ? k : 0;
      const j = _private.endNum - _private.size;
      _private.endNum = (j > 0) ? j : 0;
    },
    nextTic(){
      _private.startNum = _private.startNum + _private.size;
      _private.endNum   = _private.endNum + _private.size;
    }
  });
  Object.seal(this);
  return this;
}
//* Declare Point Class  *** Do not change line sequence ***
export { Page };
