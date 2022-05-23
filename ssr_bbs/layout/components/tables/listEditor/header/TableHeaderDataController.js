/***
 * Layout:  TableHeaderDataController
 ***/
//* Describe EntryList Class below
const TableHeaderDataController   = function (tableHeaderDataController) {

  //* private variable & mapping ////////////////////////////////////////////////
  // const me           = this;

  //* Privilege Static Functions ////////////////////////////////////////////////

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // x: {
    //   get: function() {
    //     const o = Number(x.innerHTML);
    //     return ('NaN' === o)? 0:o;
    //   }
    // },
  });

  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });

  //* Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    if('undefined' !== typeof tableHeaderDataController.onclick_th) tableHeaderDataController.onclick_th(e, this.id);
  }

  //* Lazy Initialization ///////////////////////////////////////////////////////

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TableHeaderDataController
};
