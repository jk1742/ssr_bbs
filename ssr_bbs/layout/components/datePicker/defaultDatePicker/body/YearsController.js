/***
 * WeekDaysController
 * @constructor
 ***/
//* Describe WeekDaysController Class below
const YearsController = function (_yearHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const FOCUS = 'is-active';

  //* Privilege Static Functions ////////////////////////////////////////////////
  const focusSet = function (n) {
    Array.from(me.children).forEach(function (e) {
      if (n === Number(e.getAttribute('data-year'))) e.classList.add(FOCUS);
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
  const me = this;


  //* Access Control: public functions //////////////////////////////////////////
  // Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  // });


  //* Event handler /////////////////////////////////////////////////////////////
  for (const iterator of Array.from(this.children)) {
    iterator.onclick = (e) => {
      if ('undefined' !== typeof _yearHandler.onclick_year) _yearHandler.onclick_year(e, iterator.getAttribute('data-year'));
      focusSet(_yearHandler.get_DatePickerData().year);
    }
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  YearsController
};
