/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const BlurFilterController   = function (blurFilterHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  const me                  = this;
  const filterClass         = this.firstChild.id;
  const blur                = me.firstChild.firstChild;
  
  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    filterClass: {
      get: () => filterClass,
      enumerable:true
    },
    blur:{
      get:()  => blur.getAttribute('stdDeviation'),
      set:(o) => blur.setAttribute("stdDeviation", o),
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

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  BlurFilterController
};
