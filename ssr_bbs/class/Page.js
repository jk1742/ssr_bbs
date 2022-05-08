/**
 * Page Class of list contents
 * @constructor
 * @param {*} size
 * @param {*} orderId
 * @param {*} orderType
 * @param {*} total
 * @returns
 */
const Page = function(size, orderId, orderType, total){
  let _private = {
    size      : size,
    orderId   : orderId,
    orderType : orderType,
    orderBy   : 'asc',
    total     : total,
    rows      : [],
    startNum  : 0,
    lastNum   : 0
  };

  Object.defineProperties(this, {
    size:{
      get: ()   => _private.size,
      set: (o)  => {_private.size=o},
      enumerable:true
    },
    rowscnt: {
      get: ()   => _private.rows.length,
      enumerable:true
    },
    orderId: {
      get: ()   => _private.orderId,
      set: (o)  => {_private.orderId=o},
      enumerable:true
    },
    orderType: {
      get: ()   => _private.orderType,
      set: (o)  => {_private.orderType=o},
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
      get: ()   => {
        let carriage;
        if('undefined' == typeof _private.total || 0 >= _private.total){
          return 0;
        }
        if('undefined' == typeof _private.startNum || Number.isNaN(_private.startNum)) {
          return 0;
        }
        if('undefined' != typeof _private.startNum) {
          carriage = _private.startNum;
        }
        if(_private.startNum > _private.total){
          return 0;
        }
        if(0 > _private.startNum){
          return 0;
        }
        return carriage;
      },
      set:(o) => {_private.startNum = o},
      enumerable:true
    },
    lastNum:{
      get: () => {
        let carriage;
        const tempLast = (this.startNum + _private.size);
        if('undefined' == typeof _private.total || 0 >= _private.total) {
          return _private.size;
        }
        if('undefined' == typeof _private.lastNum || Number.isNaN(_private.lastNum)) {
          return tempLast;
        }
        if('undefined' != typeof _private.lastNum && !Number.isNaN(_private.lastNum)) {
          carriage = _private.lastNum;
        }
        if(_private.lastNum > _private.total){
          return _private.total;
        }
        return carriage;
      },
      set:(o) => {_private.lastNum = o},
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
    preTic(o){
      const start = o - _private.size - 1;
      _private.startNum = (0 > start) ? 0:start;
      _private.lastNum  = o - 1;
    },
    nextTic(o){
      _private.startNum = o;
      _private.lastNum  = _private.lastNum + _private.size;
    }
  });
  Object.seal(this);
  return this;
}
//* Declare Point Class  *** Do not change line sequence ***
export { Page };
