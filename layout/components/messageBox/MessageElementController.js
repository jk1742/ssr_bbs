
/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const MessageElementController   = function (messageElementHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  const close         = this.firstChild;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // filterClass: {
    //   get: function() {
    //     return filterClass;
    //   },
    //   enumerable:true
    // },
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // toggle_msgbox (e, o) {
    //
    // }
  });

  // Event handler /////////////////////////////////////////////////////////////
  close.onclick = (e) => {
      if('undefined' !== typeof messageElementHandler.onclick_close) messageElementHandler.onclick_close(e, this.id);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MessageElementController
};
