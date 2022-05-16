/***
 * DummyController
 * @constructor
 * @event onclick_dummy
 * @event onclick_erase
 ***/
//* Describe DummyController Class below
const DummyController = function (_dummyHandler, datetype) {

  //* private variable & mapping ////////////////////////////////////////////////
  const box = this.children[0];
  const erase = this.children[1];


  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   picked: {
  //     get: () => year.innerText,
  //     set: (o) => { if ('number' === typeof o) year.innerText = o },
  //     enumerable: true, configurable: true
  //   },
  // });
  const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
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
    formattedDate (date, _datetype) {
      switch (_datetype) {
        case 'yyyy-mm-dd':
          return new Date(date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
        case 'yyyy/mm/dd':
          return new Date(date).toLocaleDateString('en-ZA');
        case 'mm/dd/yyyy':
          return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        case 'dd-mon-yyyy':
          return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        default:
          return new Date(date).toLocaleDateString('en-CA');
      }
    }
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
