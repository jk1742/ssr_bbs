import { BtnAnimateController as Super}     from '/layout/components/btnAnimate/BtnAnimateController';


/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const BtnAnimateController   = function (btnAnimateHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, btnAnimateHandler);

  // mapping ///////////////////////////////////////////////////////////////////
  const value           = this.firstChild.childNodes[1];
  let   underlineColor  = '#3e7ebc';
  let   defalutColor    = '#efefef';

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   underlineColor: {
  //     get: function() {
  //       return underlineColor;
  //     },
  //     set: function (o) {
  //       underlineColor = o;
  //     },
  //     enumerable:true
  //   }
  // });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    deactivate(o) {
      this.style.backgroundColor = this.defalutColor;
      this.classList.add('animate-flicker');
    }
  });

  // Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    this.style.backgroundColor = this.underlineColor;
    this.classList.add('animate-flicker');
    if('undefined' !== typeof btnAnimateHandler.onclick_btn) btnAnimateHandler.onclick_btn(e);
  }
  this.onanimationend = (e) => {
    this.classList.remove('animate-flicker');
    if('undefined' !== typeof btnAnimateHandler.onanimationend_btn) btnAnimateHandler.onanimationend_btn(e);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  BtnAnimateController
};
