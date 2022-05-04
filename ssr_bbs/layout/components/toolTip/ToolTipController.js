
/***
 * ToolTipController
 ***/
//* Describe ToolTipController Class below
const ToolTipController   = function (toolTipHandler) {

  //* private variable //////////////////////////////////////////////////////////
  const toolTip = $SR.Event.register('ToolTipEvent');

  //* mapping ///////////////////////////////////////////////////////////////////
  const me           = this;

  //* Event handler /////////////////////////////////////////////////////////////

  //* Privilege Static Functions ////////////////////////////////////////////////

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    //* toggleSwitch: {
    //*   get: function() {
    //*     return toggleSwitch.checked;
    //*   },
    //*   enumerable: true,
    //*   configurable: true
    //* }
  });

  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // open
    // parameter index - below
    // o.msg      ::
    // o.outline  ::
    // o.color    ::
    // o.width    ::
    // o.height   ::
    // o.position :: left, top, width, height, pageX, pageY
    open (o) {
      o.width   = ('undefined' === typeof o.width)? 0: o.width;
      o.height  = ('undefined' === typeof o.height)? 0: o.height;
      if('bottom' == o.outline) {
        me.className = 'tool-tip-bottom';
        me.style.left = (o.position.pageX + o.width) +'px';
        me.style.top = (o.position.pageY + o.position.height + o.height-10) +'px';
      } else if('top' == o.outline) {
        me.className = 'tool-tip-top';
        me.style.left = (o.position.pageX - 5 + 0*o.position.width + o.width) +'px';
        me.style.top = (o.position.pageY - 2.5*o.position.height + o.height) +'px';
      }
      me.innerHTML = o.msg;
      me.style.visibility = 'visible';
      me.style.opacity = 1;
      me.style.backgroundColor = o.color;
    },
    collapse(){
      me.className = '';
      me.innerHTML = '';
      me.style.visibility = 'hidden';
      me.style.opacity = 0;
    }
  });

  //* Lazy Initialization ///////////////////////////////////////////////////////
  toolTip.onToolTipEvent = (e)=>{
    const msg = e.detail.getMessage();
    if (msg.name === 'onmouseenter'){
      this.open(msg.tip);
    } else {
      this.collapse();
    }
  }

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ToolTipController
};
