/***
 * WeekDaysController
 * @constructor
 * @event onclick_navNext
 * @event onclick_navMonth
 * @event onclick_navYear
 * @event onclick_navNext
 ***/
//* Describe WeekDaysController Class below
const NavController = function (_navHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const dateRepository = $SR.Date.getInstance();
  const pre = this.children[0];
  const box = this.children[1];
  const next = this.children[2];
  const month = box.children[0];
  const year = box.children[1];


  //* Privilege Static Functions ////////////////////////////////////////////////
  const getMonthName = (n) => {
    let i = n - 1;
    i = (i < 0) ? 0:i;
    return dateRepository.months[i].long;
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    month: {
      get: () => month.innerText,
      set: (o) => {
        if ('number' === typeof o) month.innerText = getMonthName(o);
        console.log(month.innerText, o);
      },
      enumerable: true, configurable: true
    },
    year: {
      get: () => year.innerText,
      set: (o) => { if ('number' === typeof o) year.innerText = o },
      enumerable: true, configurable: true
    },
  });
  // const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  // Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  // });


  //* Event handler /////////////////////////////////////////////////////////////
  pre.onclick = (e) => {
    if ('undefined' !== typeof _navHandler.onclick_navPre) _navHandler.onclick_navPre(e);
  }
  month.onclick = (e) => {
    if ('undefined' !== typeof _navHandler.onclick_navMonth) _navHandler.onclick_navMonth(e);
  }
  year.onclick = (e) => {
    if ('undefined' !== typeof _navHandler.onclick_navYear) _navHandler.onclick_navYear(e);
  }
  next.onclick = (e) => {
    if ('undefined' !== typeof _navHandler.onclick_navNext) _navHandler.onclick_navNext(e);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  NavController
};
