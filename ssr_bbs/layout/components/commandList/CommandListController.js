import { DropListController }  from '/layout/components/dropList/DropListController';


/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const CommandListController   = function(commandListHandler) {

  const FOCUS_CLASS           = 'active';
  // private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const template              = me.firstChild;
  const viewFilter            = template.childNodes[0];
  const viewerIcon            = viewFilter.firstChild;
  let   viewerSelect          = viewFilter.childNodes[2];
  const add                   = template.childNodes[1].firstChild;
  const list                  = template.childNodes[2].firstChild;
  const select                = template.childNodes[3].firstChild;
  const selectsq              = template.childNodes[4].firstChild;
  const remove                = template.childNodes[5].firstChild;
  const clear                 = template.childNodes[6].firstChild;
  let   swTooltip             = true;
  let   toolTipEvent          = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   tooltipViewer         = {};
  let   tooltipAdd            = {};
  let   tooltipList           = {};
  let   tooltipSelect         = {};
  let   tooltipSelectsq       = {};
  let   tooltipRemove         = {};
  let   tooltipClear          = {};
  let   viewerFilterDisease   = 'None';

  // Privilige Static Functions ////////////////////////////////////////////////
  const navClassRemove  = function(){
    const array = [select, selectsq];
    array.forEach(function(e){
      e.classList.remove(FOCUS_CLASS);
    });
  };
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
    tooltipSwitch:{
      set: function(o) {
        swTooltip = o;
      },
      get: function() {
        return swTooltip;
      }
    },
    viewerFilterDisease:{
      get:() => viewerFilterDisease,
      enumerable:true
    }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    setViewFilter(arr){
      let carriage = ['None'].concat(arr);
      viewerSelect.generateList(carriage);
    },
    onViewer(){
      viewFilter.style.display = 'initial';
    },
    setTooltipViewer:(msg, outline, color, opacity, width, height) => tooltipViewer = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height},
    onAdd(){
      add.style.display       = 'initial';
    },
    onList(){
      list.style.display      = 'initial';
    },
    onSelect(){
      select.style.display    = 'initial';
    },
    onSelectsq(){
      selectsq.style.display  = 'initial';
    },
    onRemove(){
      remove.style.display    = 'initial';
    },
    onClear(){
      clear.style.display     = 'initial';
    },
    trigger_onclickViewer(){
      viewerIcon.onclick();
    },
    trigger_onclickSelect(){
      select.onclick();
    },
    trigger_onclickSelectsq(){
      selectsq.onclick();
    },
    trigger_onclickDel(){
      remove.onclick();
    },
    trigger_onclickClear(){
      clear.onclick();
    },
    setTooltipAdd(msg, outline, color, opacity, width, height){
      tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipList(msg, outline, color, opacity, width, height){
      tooltipList = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipSelect(msg, outline, color, opacity, width, height){
      tooltipSelect = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipSelectsq(msg, outline, color, opacity, width, height){
      tooltipSelectsq = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipRemove(msg, outline, color, opacity, width, height){
      tooltipRemove = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
    setTooltipClear(msg, outline, color, opacity, width, height){
      tooltipClear = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    },
  });

  // Event handler /////////////////////////////////////////////////////////////
  // register viewerIcon event
  viewerIcon.onclick = (e) => {
    let swFilter = viewerSelect.style.display;
    if('none' == swFilter)swFilter = 'initial';
    else swFilter = 'none';
    viewerSelect.style.display = swFilter;
    if('undefined' !== typeof commandListHandler.onclick_viewerIcon) commandListHandler.onclick_viewerIcon(e);
  }
  viewerIcon.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Viewer',Object.assign(tooltipViewer, {position: getPositionInfo(e, viewerIcon.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_viewerIcon) commandListHandler.onmouseover_viewerIcon(e, viewerIcon.getBoundingClientRect());
  }
  viewerIcon.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Viewer', null);
    if('undefined' !== typeof commandListHandler.onmouseout_viewerIcon) commandListHandler.onmouseout_viewerIcon(e, viewerIcon.getBoundingClientRect());
  }
  // register add event
  add.onclick = (e) => {
    if('undefined' !== typeof commandListHandler.onclick_add) commandListHandler.onclick_add(e);
  }
  add.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Add',Object.assign(tooltipAdd, {position: getPositionInfo(e, add.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_add) commandListHandler.onmouseover_add(e, add.getBoundingClientRect());
  }
  add.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Add', null);
    if('undefined' !== typeof commandListHandler.onmouseout_add) commandListHandler.onmouseout_add(e, add.getBoundingClientRect());
  }
  // register list event
  list.onclick = (e) => {
    if('undefined' !== typeof commandListHandler.onclick_list) commandListHandler.onclick_list(e);
  }
  list.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-List',Object.assign(tooltipList, {position: getPositionInfo(e, list.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_list) commandListHandler.onmouseover_list(e, list.getBoundingClientRect());
  }
  list.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-List', null);
    if('undefined' !== typeof commandListHandler.onmouseout_list) commandListHandler.onmouseout_list(e, list.getBoundingClientRect());
  }
  // register select event
  select.onclick = (e) => {
    navClassRemove();
    select.classList.add(FOCUS_CLASS);
    if('undefined' !== typeof commandListHandler.onclick_select) commandListHandler.onclick_select(e);
  }
  select.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Select', Object.assign(tooltipSelect, {position: getPositionInfo(e, select.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_select) commandListHandler.onmouseover_select(e, select.getBoundingClientRect());
  }
  select.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Select', null);
    if('undefined' !== typeof commandListHandler.onmouseout_select) commandListHandler.onmouseout_select(e, select.getBoundingClientRect());
  }
  // register selectsq event
  selectsq.onclick = (e) => {
    navClassRemove();
    selectsq.classList.add(FOCUS_CLASS);
    if('undefined' !== typeof commandListHandler.onclick_selectSq) commandListHandler.onclick_selectSq(e);
  }
  selectsq.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Selectsq', Object.assign(tooltipSelectsq, {position: getPositionInfo(e, selectsq.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_selectsq) commandListHandler.onmouseover_selectsq(e, selectsq.getBoundingClientRect());
  }
  selectsq.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Selectsq', null);
    if('undefined' !== typeof commandListHandler.onmouseout_selectsq) commandListHandler.onmouseout_selectsq(e, selectsq.getBoundingClientRect());
  }
  // register remove event
  remove.onclick = (e) => {
    if('undefined' !== typeof commandListHandler.onclick_del) commandListHandler.onclick_del(e);
  }
  remove.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Remove', Object.assign(tooltipRemove, {position: getPositionInfo(e, remove.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_remove) commandListHandler.onmouseover_remove(e, remove.getBoundingClientRect());
  }
  remove.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Remove', null);
    if('undefined' !== typeof commandListHandler.onmouseout_remove) commandListHandler.onmouseout_remove(e, remove.getBoundingClientRect());
  }
  // register clear event
  clear.onclick = (e) => {
    if('undefined' !== typeof commandListHandler.onclick_clear) commandListHandler.onclick_clear(e);
  }
  clear.onmouseover = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Clear', Object.assign(tooltipClear, {position: getPositionInfo(e, clear.getBoundingClientRect())}));
    if('undefined' !== typeof commandListHandler.onmouseover_clear) commandListHandler.onmouseover_clear(e, clear.getBoundingClientRect());
  }
  clear.onmouseout = (e) => {
    if(swTooltip)toolTipEvent.emit(me.id+'-Clear', null);
    if('undefined' !== typeof commandListHandler.onmouseout_clear) commandListHandler.onmouseout_clear(e, clear.getBoundingClientRect());
  }

  // inject controller /////////////////////////////////////////////////////////
  viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
    update_selectedValue(e, value, id){
      viewerFilterDisease = value;
      if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
    }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  viewFilter.style.display    = 'none';
  viewerSelect.style.display  = 'none';
  add.style.display           = 'none';
  list.style.display          = 'none';
  select.style.display        = 'none';
  selectsq.style.display      = 'none';
  remove.style.display        = 'none';
  clear.style.display         = 'none';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CommandListController
};
