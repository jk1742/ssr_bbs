/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const ApplyPanelController   = function (applyPanelhandler) {

  // private variable //////////////////////////////////////////////////////////
  //

  // mapping ///////////////////////////////////////////////////////////////////
  const paticleCnt           = this.firstChild.childNodes[1];
  const inject               = this.firstChild.childNodes[2];

  // Event handler /////////////////////////////////////////////////////////////
  inject.onclick = (e) => {
      applyPanelhandler.onclick_inject(e, this.paticleCnt);
  }

  // Privilige Static Functions ////////////////////////////////////////////////
  //
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    paticleCnt: {
      get: function() {
        const o = Number(paticleCnt.value);
        return ('NaN' === o)? 0:o;
      }
    }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // bind_id (o) {
    //   id.value = ('undefined' == typeof o)? '':o;
    // }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  this.classList.add('top-space');

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ApplyPanelController
};
