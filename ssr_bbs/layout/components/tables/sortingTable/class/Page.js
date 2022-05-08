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

  let k_end = (start === undefined) ? 0 : (start + size);
  k_end = (k_end>total) ? total : k_end;

  let _private = {
    size      : size,
    orderId   : orderId,
    orderBy   : (orderBy === undefined) ? 'asc' : orderBy,
    total     : total,
    rows      : [],
    startNum  : (start === undefined)? 0:start,
    endNum    : k_end,
  };

  Object.defineProperties(this, {
    size:{
      get: ()   => _private.size,
      set: (o)  => {_private.size=o},
      enumerable:true
    },
    orderId: {
      get: ()   => _private.orderId,
      set: (o)  => {_private.orderId=o},
      enumerable:true
    },
    orderBy: {
      get: ()   => _private.orderBy,
      set: (o)  => {_private.orderBy=o},
      enumerable:true
    },
    total: {
      get: ()   => _private.total,
      set: (o)  => {_private.total=o},
      enumerable:true
    },
    rows:{
      get: ()   => _private.rows,
      set: (o)  => {_private.rows=o},
      enumerable:true
    },
    startNum:{
      get: () => _private.startNum,
      set: (o) => {
        _private.startNum = (o>0)? o: 0;
      },
      enumerable:true
    },
    endNum:{
      get: () => _private.endNum,
      set: (o) => { _private.endNum = o },
      enumerable:true
    }
  });

  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    toggleOrderBy() {
      let order = _private.orderBy;
      if('asc' === order) {
        order = 'desc';
      } else {
        order = 'asc';
      }
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
