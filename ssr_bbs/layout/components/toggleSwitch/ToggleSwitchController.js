/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const ToggleSwitchController   = function (toggleSwitchHandler) {

  // private variable //////////////////////////////////////////////////////////
  //

  // mapping ///////////////////////////////////////////////////////////////////
  const toggleSwitch           = this.firstChild;

  // Event handler /////////////////////////////////////////////////////////////
  toggleSwitch.onclick = (e) => {
    if(typeof toggleSwitchHandler.onclick_toggleSwitch !== 'undefined') toggleSwitchHandler.onclick_toggleSwitch(e);
  }

  // Privilige Static Functions ////////////////////////////////////////////////
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    toggleSwitch: {
      get: function() {
        return toggleSwitch.checked;
      },
      set: function(o){
        o = (o === null) ? false:o;
        o = (o === '')   ? false:o;
        o = (typeof o === 'undefined')? false:o;
        if (typeof o !== 'boolean') throw new Error('Instance type error: not a Boolean type');
        toggleSwitch.checked = o;
      },
      enumerable: true,
      configurable: true
    }
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // bind_id (o) {
    //   id.value = ('undefined' == typeof o)? '':o;
    // }
  });
  
  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ToggleSwitchController
};
