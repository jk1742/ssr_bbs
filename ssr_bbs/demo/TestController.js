/***
 * Layout:  Test
 ***/
// Describe EntryList Class below
const TestController   = function (o, handle) {
  const dom                 = o;
  // mapping ///////////////////////////////////////////////////////////////////
  const id                  = dom.firstChild.childNodes[0].lastChild.firstChild;
  const radius              = dom.firstChild.childNodes[1].lastChild.firstChild;
  const isolated            = dom.firstChild.childNodes[2].lastChild.firstChild;
  const liveDays            = dom.firstChild.childNodes[3].lastChild.firstChild;
  const liveTics            = dom.firstChild.childNodes[4].lastChild.firstChild;
  const healthGage         = dom.firstChild.childNodes[5].lastChild.firstChild;
  const color               = dom.firstChild.childNodes[6].lastChild.firstChild;
  const group               = dom.firstChild.childNodes[7].lastChild.firstChild;
  // Event handler /////////////////////////////////////////////////////////////
  dom.onload = function(){
    handle.dom_onload();
  }
  // access List ///////////////////////////////////////////////////////////////
  Object.defineProperties(dom, {
    switchInfoTable: {
      get: function() {
        return switchInfoTable;
      },
      set: function(o) {
        switchInfoTable = o;
      }
    }
  });
  // Object binder /////////////////////////////////////////////////////////////
  Object.assign(dom, {
    bindId (o) {
      id.value = ('undefined' == typeof o)? '':o;
    },
    bindRadius (o){
      radius.value = ('undefined' == typeof o)? '':o;
    },
    bindIsolated (o) {
      isolated.value = ('undefined' == typeof o)? '':o;
    },
    bindLiveDays (o) {
      liveDays.value = ('undefined' == typeof o)? '':o;
    },
    bindLiveTics (o) {
      liveTics.value = ('undefined' == typeof o)? '':o;
    },
    bindStageHealth (o) {
      healthGage.value = ('undefined' == typeof o)? '':o;
    },
    bindColor (o) {
      color.value = ('undefined' == typeof o)? '':o;
    }
  });
  return dom;
}
export {
  TestController
};
