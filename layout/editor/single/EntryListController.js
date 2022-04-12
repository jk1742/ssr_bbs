import { ToggleSwitchController }  from '/layout/components/toggleSwitch/ToggleSwitchController';


/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const EntryListController   = function (entryListHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  const table               = this.firstChild.firstChild;
  const id                  = table.childNodes[0].lastChild.firstChild;
  const radius              = table.childNodes[1].childNodes[1].firstChild;
  const healthGage          = table.childNodes[2].childNodes[1].firstChild;
  const color               = table.childNodes[2].lastChild.firstChild;
  const vaccine             = table.childNodes[3].lastChild.firstChild;
  const rNumbers            = table.childNodes[3].childNodes[1].firstChild;
  let   isolated;

  // Event handler /////////////////////////////////////////////////////////////
  // this.onload = function(){
  //   handle.this_onload();
  // }

  // Privilige Static Functions ////////////////////////////////////////////////
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    id: {
      get: function() {
        return id.innerHTML;
      }
    },
    radius: {
      get: function() {
        return radius.value;
      }
    },
    isolated: {
      get: function() {
        return isolated.toggleSwitch;
      }
    },
    healthGage: {
      get: function() {
        return healthGage.value;
      }
    },
    rNumbers: {
      get: function() {
        const o = rNumbers.value;
        return o;
      },
      set: function(array) {
        let arrText = [];
        array.forEach((disease, i) => {
          arrText.push(disease.name + ': ' + disease.rNumber);
        });
        rNumbers.value = _.join(arrText, ', ');
      }
    },
    vaccine: {
      get: function() {
        const o = vaccine.value;
        return o;
      },
      set: function(array) {
        let arrText = [];
        array.forEach((immun, i) => {
          arrText.push(immun.id);
        });
        vaccine.value = _.join(arrText, ', ');
      }
    },
  });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    bind_id (o) {
      id.innerHTML = ('undefined' == typeof o)? '':o;
    },
    bind_radius (o){
      radius.value = ('undefined' == typeof o)? '':o;
    },
    bind_isolated (o) {
      isolated.toggleSwitch = ('undefined' == typeof o)? '':o;
    },
    bind_liveDays (o) {
      liveDays.value = ('undefined' == typeof o)? '':o;
    },
    bind_liveTics (o) {
      liveTics.value = ('undefined' == typeof o)? '':o;
    },
    bind_healthGage (o) {
      healthGage.value = ('undefined' == typeof o)? '':o;
    },
    bind_color (o) {
      color.style.color = o;
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////

  // inject controller /////////////////////////////////////////////////////////
  isolated = $SR.View('FocusEditor-EntryList-Isolated').inject(ToggleSwitchController, {});
  // console.log('entrylist vaccine',vaccine);
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  EntryListController
};
