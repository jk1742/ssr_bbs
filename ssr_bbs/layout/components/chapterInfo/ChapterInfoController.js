/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const ChapterInfoController   = function (chapterInfoHandler) {

  // private variable //////////////////////////////////////////////////////////
  const me           = this;

  // mapping ///////////////////////////////////////////////////////////////////
  const subject     = me.firstChild;

  // Privilege Static Functions ////////////////////////////////////////////////

  // Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    subject: {
      get: function() {
        return subject;
      },
      set: function (o) {
        subject.innerHTML = o;
      },
      enumerable:true
    },
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onclick_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });

  // Event handler /////////////////////////////////////////////////////////////
  // this.onclick = (e) => {
  //   if('undefined' !== typeof btnAnimateHandler.onclick_btn) btnAnimateHandler.onclick_btn(e);
  // }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ChapterInfoController
}
