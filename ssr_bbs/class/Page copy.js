/**
 * Page Class of list contents
 * @constructor
 * @param {Number} num 
 * @param {Number} size 
 * @param {String} orderId 
 * @param {String} orderType 
 * @returns {Page}
 */
const Page = function(num, size, orderId, orderType, total){
  const _private = {};
  _private.num = num;
  _private.size = size;
  _private.orderId = orderId;
  _private.orderType = orderType;
  _private.orderBy = 'abc';
  _private.total = total;
  _private.rows = [];
  _private.startRow;
  _private.lastRow;

  // _private.rowscnt = _private.rows.length;
  Object.defineProperties(this, {
    num: {
      get: ()   => _private.num,
      set: (o)  => {_private.num=o},
      enumerable:true
    },
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
      get: ()   => (0 >= _private.num)? null:(_private.num - 1) * _private.size,
      enumerable:true
    },
    lastNum:{
      get: ()   => {
        return (_private.total < _private.num  * _private.size) ? _private.total : _private.num  * _private.size;
      },
      enumerable:true
    }
  });

  
  // Access control: public functions //////////////////////////////////////////
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
    }
  });
  Object.seal(this);
  return this;
}
// Declare Point Class  *** Do not change line sequence ***
export { Page };
