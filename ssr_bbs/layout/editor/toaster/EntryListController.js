/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { ToggleSwitchController }  from '/layout/components/toggleSwitch/ToggleSwitchController';

/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryListController   = function (entryListHandler) {

  // private variable //////////////////////////////////////////////////////////
  let   isolated;

  // mapping ///////////////////////////////////////////////////////////////////
  const section   = this.firstChild.firstChild.firstChild.childNodes[1].firstChild;
  const radius    = this.firstChild.firstChild.lastChild.childNodes[1].firstChild;
  const age       = this.firstChild.firstChild.lastChild.childNodes[3].firstChild;

  // Event handler /////////////////////////////////////////////////////////////
  // this.onload = function(){
  //   handle.this_onload();
  // }

  // Privilige Static Functions ////////////////////////////////////////////////
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    section: {
      get: function() {
        const o = section.value;
        return o;
      },
      set: (s) => {section.value = s}
      ,
    },
    isolated: {
      get: function() {
        return isolated.toggleSwitch;
      },
      set: (b) => {isolated.toggleSwitch = b}
    },
    radius: {
      get: function() {
        const o = Number(radius.value);
        return ('NaN' === o)? 0:o;
      },
      set: (n) => {radius.value = Number(n)}

    },
    age: {
      get: function() {
        const o = Number(age.value);
        return ('NaN' === o)? 0:o;
      },
      set: (n) => {age.value = Number(n)}
    }
  });

  // Access control: public functions //////////////////////////////////////////
  // Object.assign(this, {
  //   bind_id (o) {
  //     id.value = ('undefined' == typeof o)? '':o;
  //   }
  // });

  // inject controller /////////////////////////////////////////////////////////
  isolated  = $SR.View('Toaster-EntryList-Isolated').inject(ToggleSwitchController, {});

  // Lazy Initialization ///////////////////////////////////////////////////////
  // isolated.toggleSwitch = false; //
  // section.value         = 'Seoul'; //
  // isolated.value      = 0;
  // radius.value          = 5; //
  // age.value             = 30; //

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  EntryListController
};
