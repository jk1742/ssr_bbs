/***
 * Layout:  DropListContentsController
 ***/

// Describe EntryList Class below
const DropListContentsController   = function (dropListContentsHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me            = this;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // delta: {
    //   get: function() {
    //     return delta;
    //   },
    // },
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });

  // Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    const value = me.getAttribute('data-value');
    if('undefined' !== typeof dropListContentsHandler.onclick_this) dropListContentsHandler.onclick_this(e, value, this.id);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DropListContentsController
};
