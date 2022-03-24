/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const BtnAnimateController   = function (btnAnimateHandler) {

  // private variable //////////////////////////////////////////////////////////
  const value           = this.firstChild.childNodes[1];

  // mapping ///////////////////////////////////////////////////////////////////
  let   underlineColor  = '#3e7ebc';
  let   defalutColor    = '#efefef';

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    underlineColor: {
      get: function() {
        return underlineColor;
      },
      set: function (o) {
        underlineColor = o;
      },
      enumerable:true
    },
    defalutColor: {
      get: function() {
        return defalutColor;
      },
      set: function (o) {
        defalutColor = o;
      },
      enumerable:true
    }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onclick_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });

  // Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    if('undefined' !== typeof btnAnimateHandler.onclick_btn) btnAnimateHandler.onclick_btn(e);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  BtnAnimateController
};
