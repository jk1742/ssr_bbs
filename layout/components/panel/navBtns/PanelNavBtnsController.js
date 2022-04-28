import { ToolTipController          } from '/layout/components/toolTip/ToolTipController';

/***
 * layout:  PanelNavController control buttons
 ***/
//* Describe EditTopBarController layout below
const PanelNavBtnsController   = function(panelNavHandler) {

  //* private variable //////////////////////////////////////////////////////////

  //* mapping ///////////////////////////////////////////////////////////////////
  const me            = this;
  const upside        = me.childNodes[0];
  const undo          = me.childNodes[1];
  const upload        = me.childNodes[2];
  const confirm       = me.childNodes[3];
  const alert         = me.childNodes[4];
  const alertCnt      = me.childNodes[4].lastChild;

  let   swTooltip     = true;
  let   toolTipEvent  = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   tooltipUpside = {};
  let   tooltipUndo   = {};
  let   tooltipUpload = {};
  let   tooltipConfirm= {};
  let   tooltipAlert  = {};

  //* Privilege Static Functions ////////////////////////////////////////////////
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

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    alertColor:{
      set: function(o) {
        alert.className = o;
      }
    },
    alertCnt:{
      set: function(o) {
        alertCnt.innerHTML = (0 === o)? '':o;
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

  //* Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    onUpside(){
      upside.style.display = "block";
    },
    onUndo(){
      undo.style.display = "block";
    },
    onUpload(){
      upload.style.display = "block";
    },
    onConfirm(){
      confirm.style.display = "block";
    },
    onAlert(){
      alert.style.display = "block";
    },
    setTooltipUpside(msg, outline, color, opacity, width, height){
      tooltipUpside = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipUndo(msg, outline, color, opacity, width, height){
      tooltipUndo = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipUpload(msg, outline, color, opacity, width, height){
      tooltipUpload = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipConfirm(msg, outline, color, opacity, width, height){
      tooltipConfirm = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipAlert(msg, outline, color, opacity, width, height){
      tooltipAlert = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    trigger_onclickUpside(){
      upside.onclick();
    },
    trigger_onclickUndo(){
      undo.onclick();
    },
    trigger_onclickUpload(){
      upload.onclick();
    },
    trigger_onclickConfirm(){
      confirm.onclick();
    },
    trigger_onclickAlert(){
      alert.onclick();
    },
  });

  //* Event handler /////////////////////////////////////////////////////////////
  upside.onclick = (e) => {
    if('undefined' !== typeof panelNavHandler.onclick_upside) panelNavHandler.onclick_upside(e);
  }
  undo.onclick = (e) => {
    if('undefined' !== typeof panelNavHandler.onclick_undo) panelNavHandler.onclick_undo(e);
  }
  upload.onclick = (e) => {
    if('undefined' !== typeof panelNavHandler.onclick_upload) panelNavHandler.onclick_upload(e);
  }
  confirm.onclick = (e) => {
    if('undefined' !== typeof panelNavHandler.onclick_confirm) panelNavHandler.onclick_confirm(e);
  }
  alert.onclick = (e) => {
    if('undefined' !== typeof panelNavHandler.onclick_alert) panelNavHandler.onclick_alert(e);
  }
  upside.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Upside',Object.assign(tooltipUpside, {position: getPositionInfo(e, upside.getBoundingClientRect())}));
    if('undefined' !== typeof panelNavHandler.onmouseover_upside) panelNavHandler.onmouseover_upside(e, upside.getBoundingClientRect());
  }
  undo.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Undo',Object.assign(tooltipUndo, {position: getPositionInfo(e, undo.getBoundingClientRect())}));
    if('undefined' !== typeof panelNavHandler.onmouseover_undo) panelNavHandler.onmouseover_undo(e, undo.getBoundingClientRect());
  }
  upload.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Upload',Object.assign(tooltipUpload, {position: getPositionInfo(e, undo.getBoundingClientRect())}));
    if('undefined' !== typeof panelNavHandler.onmouseover_upload) panelNavHandler.onmouseover_upload(e, upload.getBoundingClientRect());
  }
  confirm.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Confirm',Object.assign(tooltipConfirm, {position: getPositionInfo(e, undo.getBoundingClientRect())}));
    if('undefined' !== typeof panelNavHandler.onmouseover_confirm) panelNavHandler.onmouseover_confirm(e, confirm.getBoundingClientRect());
  }
  alert.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Alert',Object.assign(tooltipAlert, {position: getPositionInfo(e, alert.getBoundingClientRect())}));
    if('undefined' !== typeof panelNavHandler.onmouseover_alert) panelNavHandler.onmouseover_alert(e, alert.getBoundingClientRect());
  }
  upside.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Upside', null);
    if('undefined' !== typeof panelNavHandler.onmouseout_upside) panelNavHandler.onmouseout_upside(e, upside.getBoundingClientRect());
  }
  undo.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Undo', null);
    if('undefined' !== typeof panelNavHandler.onmouseout_undo) panelNavHandler.onmouseout_undo(e, undo.getBoundingClientRect());
  }
  upload.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Upload', null);
    if('undefined' !== typeof panelNavHandler.onmouseout_upload) panelNavHandler.onmouseout_upload(e, upload.getBoundingClientRect());
  }
  confirm.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Confirm', null);
    if('undefined' !== typeof panelNavHandler.onmouseout_confirm) panelNavHandler.onmouseout_confirm(e, confirm.getBoundingClientRect());
  }
  alert.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Alert', null);
    if('undefined' !== typeof panelNavHandler.onmouseout_alert) panelNavHandler.onmouseout_alert(e, alert.getBoundingClientRect());
  }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  upside.style.display = "none";
  undo.style.display = "none";
  upload.style.display = "none";
  confirm.style.display = "none";
  alert.style.display = "none";

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  PanelNavBtnsController
};
