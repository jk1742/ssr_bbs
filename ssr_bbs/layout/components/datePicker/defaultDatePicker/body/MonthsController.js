/***
 * WeekDaysController
 * @constructor
 ***/
//* Describe WeekDaysController Class below
const MonthsController = function (_monthHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const FOCUS = 'is-active';


  //* Privilege Static Functions ////////////////////////////////////////////////
  const focusSet = function (n) {
    Array.from(me.children).forEach(function (e) {
      if (n === Number(e.getAttribute('data-month'))) e.classList.add(FOCUS);
      else e.classList.remove(FOCUS);
    });
  };

  //* Access Control: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
    // x: {
    //   get: function() {
    //     const o = Number(x.innerHTML);
    //     return ('NaN' === o)? 0:o;
    //   }
    // },
  // });
  

  //* Access Control: public functions //////////////////////////////////////////
  // Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  // });
  const me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  for (const iterator of Array.from(this.children)) {
    iterator.onclick = (e) => {
      if ('undefined' !== typeof _monthHandler.onclick_month) _monthHandler.onclick_month(e, iterator.getAttribute('data-month'));
      focusSet(_monthHandler.get_DatePickerData().month);
    }
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MonthsController
};
