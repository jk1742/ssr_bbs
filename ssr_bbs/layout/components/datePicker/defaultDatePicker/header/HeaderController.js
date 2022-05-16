/***
 * HeaderController
 * @constructor
 ***/
//* Describe HeaderController Class below
const HeaderController = function (_headerHandler, mode) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private = {
    mode: mode,
    que : []
  };


  //* Privilege Static Functions ////////////////////////////////////////////////
  // const getMonthName = (n) => {
  //   let i = n - 1;
  //   i = (i < 0) ? 0:i;
  //   return dateRepository.months[i].long;
  // }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    mode: {
      get: () => _private.mode,
      enumerable: true, configurable: true
    },
    length: {
      get: () => _private.que.length,
      enumerable: true, configurable: true
    },
    que: {
      get: () => _private.que,
      set: (o) => { if (Array.isArray(o)) _private.que = o },
      enumerable: true, configurable: true
    },
  });
  const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    push (o) {
      if ('number' === typeof o) _private.que.push(o);
      else console.warn('number only');
    },
    generate(){
      const array = Array.from(me.children);
      if (2 <= _private.que.length) _private.que.sort();
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // mapping object
        const box = element.children[1].firstChild;
        const inner = box.children[1];
        const day = box.firstChild;
        const yyyymm = inner.children[0];
        const weekday = inner.children[1];
        // write day
        if ('undefined' !== typeof _private.que[index]){
          const date = new Date(_private.que[index]);
          day.innerText = date.getDate();
          yyyymm.innerText = date.toLocaleString(window.navigator.language, { month: 'long' })+' '+ date.getFullYear();
          weekday.innerText = date.toLocaleString(window.navigator.language, { weekday: 'long' });
        } else {
          day.innerText = '';
          yyyymm.innerText = '';
          weekday.innerText = '';
        }
      }
    },
    clear(){
      _private.que = [];
      me.generate();
    }
  });


  //* Event handler /////////////////////////////////////////////////////////////
  // today.onclick = (e) => {
  //   console.log('_footerHandler.onclick_today');
  //   if ('undefined' !== typeof _footerHandler.onclick_today) _footerHandler.onclick_today(e);
  // }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  HeaderController
};
