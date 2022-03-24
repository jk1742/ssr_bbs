/***
 * block:  FocusView Controller
 ***/
// Describe FocusViewController Class below
const FocusBridgeController   = function(focusViewHandler) {

  // private variable //////////////////////////////////////////////////////////
  let   type                  = 'none';
  let   focus                 = '';
  let   selected              = 0;

  // mapping ///////////////////////////////////////////////////////////////////
  const me                    = this;
  const focusedSpan           = this.childNodes[1].firstChild;
  const infoText              = this.childNodes[1].lastChild;
  const btnEdit               = this.lastChild.firstChild;

  // Event handler /////////////////////////////////////////////////////////////
  btnEdit.onclick = (e) => {
    if ('BoxSelect' == type){
      focusViewHandler.onclick_multiEditor(e);
    } else {
      focusViewHandler.onclick_focusEditor(e);
    }
  }

  // Privilige Static Functions ////////////////////////////////////////////////
  //
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    focus: {
      get: function() {
        return focus;
      }
    },
    type: {
      get: function() {
        return type;
      }
    },
    selected:{
      get: function() {
        return selected;
      }
    }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    bindId(o){
      const c = o;
      focus   = c;
      focusedSpan.innerHTML = _.join(['ID:', c.substring(0,15), '...'], ' ');
    },
    bind_focusClear(){
      focusedSpan.innerHTML = _.join(['ID:', 'Unselected'], ' ');
      focus                 = '';
    },
    bind_singleSelectInfo(){
      type                  = 'none';
      infoText.innerHTML    = 'select single item';
    },
    bind_selectSqure(){
      type                  = 'BoxSelect';
      infoText.innerHTML    = 'drag mouse on cavas';
    },
    bind_add(){
      type                  = 'add';
      infoText.innerHTML    = 'select group & info';
    },
    bind_selected(o){
      selected = o;
      focusedSpan.innerHTML = _.join(['selected', o, 'items'], ' ');
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.display = 'none';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  FocusBridgeController
};
