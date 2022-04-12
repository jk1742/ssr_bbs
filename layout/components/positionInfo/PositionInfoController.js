/***
 * Layout:  PositionInfoController
 ***/
// Describe EntryList Class below
const PositionInfoController   = function (positionInfoHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const position              = me.childNodes[0].firstChild;
  const x                     = me.childNodes[1].firstChild.lastChild;
  const y                     = me.childNodes[2].firstChild.lastChild;
  let   swTooltip             = true;
  let   toolTipEvent          = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   tooltipPosition       = {};

  // Privilige Static Functions ////////////////////////////////////////////////
  const getPositionInfo = function(e, t){
    return {
      left  : t.left,
      top   : t.top,
      width : t.width,
      height: t.height,
      pageX : e.pageX,
      pageY : e.pageY
    }
  }

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    x: {
      get: function() {
        const o = Number(x.firstChild.nodeValue);
        return ('NaN' === o)? 0:o;
      },
      set: function(o) {
        if(o.toFixed(0) != x.firstChild.nodeValue) x.firstChild.nodeValue = o.toFixed(0);
      }
    },
    y: {
      get: function() {
        const o = Number(y.firstChild.nodeValue);
        return ('NaN' === o)? 0:o;
      },
      set: function(o) {
        if(o.toFixed(0) != y.firstChild.nodeValue) y.firstChild.nodeValue = o.toFixed(0);
      }
    },
    tooltipSwitch:{
      set: function(o) {
        swTooltip = o;
      },
      get: function() {
        return swTooltip;
      }
    }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    setTooltipPosition:(msg, outline, color, opacity, width, height) => tooltipPosition = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height},
  });

  // Event handler /////////////////////////////////////////////////////////////
  position.onclick = (e) => {
    if('undefined' !== typeof positionInfoHandler.onclick_position) positionInfoHandler.onclick_position(e);
  }
  position.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Position',Object.assign(tooltipPosition, {position: getPositionInfo(e, position.getBoundingClientRect())}));
    if('undefined' !== typeof positionInfoHandler.onmouseover_position) positionInfoHandler.onmouseover_position(e, position.getBoundingClientRect());
  }
  position.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Position', null);
    if('undefined' !== typeof positionInfoHandler.onmouseout_position) positionInfoHandler.onmouseout_position(e, position.getBoundingClientRect());
  }

  // Lazy Initialization ///////////////////////////////////////////////////////
  
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  PositionInfoController
};
