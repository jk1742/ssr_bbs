/***
 * DummyController
 * @constructor
 * @event onclick_dummy
 * @event onclick_erase
 ***/

import { LocalDate } from "../class/LocalDate";

//* Describe DummyController Class below
const DummyController = function (_dummyHandler, datetype) {

  //* private variable & mapping ////////////////////////////////////////////////
  const box = this.children[0];
  const erase = this.children[1];
  const localDate = new LocalDate();
  const _private = {
    inactive: false
  };

  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    inactive: {
      get: () => _private.inactive,
      enumerable: true
    },
  });
  const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    setInactive(){
      _private.inactive = true;
      erase.classList.add('is-hidden');
      box.classList.replace('datetimepicker-dummy-wrapper', 'datetimepicker-dummy-wrapper-inactive');
    },
    setActive(){
      _private.inactive = false;
      erase.classList.remove('is-hidden');
      box.classList.replace('datetimepicker-dummy-wrapper-inactive', 'datetimepicker-dummy-wrapper');
    },
    printDummy (que) {
      const array = Array.from(box.children);
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.value = this.formattedDate(que[index], datetype);
      }
    },
    getArray(){
      const carriage = [];
      for (const iterator of Array.from(box.children)) {
        const val = iterator.value;
        if (
            !_.isNull(val) &&
            'undefined' != typeof val &&
            '' != val
        ) carriage.push(new Date(val).getTime());
      }
      return carriage;
    },
    clear(){
      Array.from(box.children).forEach(o=>{
        o.value = '';
      });
    },
    formattedDate: localDate.dateParseString
  });


  //* Event handler /////////////////////////////////////////////////////////////
  erase.onclick = (_e) => {
    if ('undefined' !== typeof _dummyHandler.onclick_erase) _dummyHandler.onclick_erase(_e);
  }
  box.onclick = (_e) => {
    if ('undefined' !== typeof _dummyHandler.onclick_dummy) _dummyHandler.onclick_dummy(_e);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DummyController
};
