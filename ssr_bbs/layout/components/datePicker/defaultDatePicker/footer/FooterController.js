/***
 * FooterController
 * @constructor
 ***/
//* Describe FooterController Class below
const FooterController = function (_footerHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const validate  = this.children[0];
  const today     = this.children[1];
  const clear     = this.children[2];
  const cancel    = this.children[3];

  //* Privilege Static Functions ////////////////////////////////////////////////
  // const getMonthName = (n) => {
  //   let i = n - 1;
  //   i = (i < 0) ? 0:i;
  //   return dateRepository.months[i].long;
  // }


  //* Access Control: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   year: {
  //     get: () => year.innerText,
  //     set: (o) => { if ('number' === typeof o) year.innerText = o },
  //     enumerable: true, configurable: true
  //   },
  // });
  // const me           = this;


  //* Access Control: public functions //////////////////////////////////////////
  // Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  // });


  //* Event handler /////////////////////////////////////////////////////////////
  validate.onclick = (e) => {
    console.log('_footerHandler.onclick_validate');
    if ('undefined' !== typeof _footerHandler.onclick_validate) _footerHandler.onclick_validate(e);
  }
  today.onclick = (e) => {
    console.log('_footerHandler.onclick_today');
    if ('undefined' !== typeof _footerHandler.onclick_today) _footerHandler.onclick_today(e);
  }
  clear.onclick = (e) => {
    console.log('_footerHandler.onclick_clear');
    if ('undefined' !== typeof _footerHandler.onclick_clear) _footerHandler.onclick_clear(e);
  }
  cancel.onclick = (e) => {
    console.log('_footerHandler.onclick_cancel');
    if ('undefined' !== typeof _footerHandler.onclick_cancel) _footerHandler.onclick_cancel(e);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  FooterController
};
