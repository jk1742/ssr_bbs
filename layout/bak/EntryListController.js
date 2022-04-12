/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryListController   = function (entryListHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  const row1        = this.firstChild.firstChild.childNodes[0];
  const row2        = this.firstChild.firstChild.childNodes[1];
  const row3        = this.firstChild.firstChild.childNodes[2];
  const selectedInfo= row1.childNodes[1].firstChild;
  const radius      = row2.childNodes[1].firstChild;
  const healthGage  = row2.childNodes[3].firstChild;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    section: {
      get: function() {
        const o = section.value;
        return o;
      }
    },
    selectedInfo: {
      // get: function() {
      //   const o = section.value;
      //   return o;
      // },
      set: function(o){
        const text = Array.isArray(o) ? `${o.length} items selected`:o;
        selectedInfo.innerHTML = text;
      }
    },
    radius: {
      get: function() {
        const o = Number(radius.value);
        return ('NaN' === o)? 0:o;
      }
    },
    healthGage: {
      get: function() {
        const o = Number(healthGage.value);
        return ('NaN' === o)? 0:o;
      }
    }
  });

  // Access control: public functions //////////////////////////////////////////
  // Object.assign(this, {
  //   bind_id (o) {
  //     id.value = ('undefined' == typeof o)? '':o;
  //   }
  // });

  // Lazy Initialization ///////////////////////////////////////////////////////
  radius.value          = 5;
  healthGage.value      = 100;

  // inject controller /////////////////////////////////////////////////////////

  // Event handler /////////////////////////////////////////////////////////////
  // this.onload = function(){
  //   handle.this_onload();
  // }

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  EntryListController
};
