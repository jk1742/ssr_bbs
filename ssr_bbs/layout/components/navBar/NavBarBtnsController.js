//import { DropListController }  from '/layout/components/dropList/DropListController';


/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const NavBarBtnsController   = function(NavBarBtnsHandler) {

  // private variable & mapping
  const me                    = this;
  const template              = me.firstChild;

  
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
    // tooltipSwitch:{
    //   set: function(o) {
    //     swTooltip = o;
    //   },
    //   get: function() {
    //     return swTooltip;
    //   }
    // },
    // viewerFilterDisease:{
    //   get:() => viewerFilterDisease,
    //   enumerable:true
    // }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    // setViewFilter(arr){
    //   let carriage = ['None'].concat(arr);
    //   viewerSelect.generateList(carriage);
    // },
    // onViewer(){
    //   viewFilter.style.display = 'initial';
    // },
    // setTooltipViewer:(msg, outline, color, opacity, width, height) => tooltipViewer = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height},
    // onAdd(){
    //   add.style.display       = 'initial';
    // },
    // onList(){
    //   list.style.display      = 'initial';
    // },
    // onSelect(){
    //   select.style.display    = 'initial';
    // },
    // onselectSq(){
    //   selectSq.style.display  = 'initial';
    // },
    // onRemove(){
    //   remove.style.display    = 'initial';
    // },
    // onClear(){
    //   clear.style.display     = 'initial';
    // },
    // trigger_onclickViewer(){
    //   viewerIcon.onclick();
    // },
    // trigger_onclickSelect(){
    //   select.onclick();
    // },
    // trigger_onclickselectSq(){
    //   selectSq.onclick();
    // },
    // trigger_onclickDel(){
    //   remove.onclick();
    // },
    // trigger_onclickClear(){
    //   clear.onclick();
    // },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
    // setTooltipList(msg, outline, color, opacity, width, height){
    //   tooltipList = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
    // setTooltipSelect(msg, outline, color, opacity, width, height){
    //   tooltipSelect = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
    // setTooltipSelectSq(msg, outline, color, opacity, width, height){
    //   tooltipSelectSq = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
    // setTooltipRemove(msg, outline, color, opacity, width, height){
    //   tooltipRemove = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
    // setTooltipClear(msg, outline, color, opacity, width, height){
    //   tooltipClear = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // },
  });

  /***
   * Event handler
   ***/
  // register menu event
  template.onclick = (e) => {
    if('undefined' !== typeof navBarHandler.onclick_template) navBarHandler.onclick_template(e);
  }
  // menu.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Menu',Object.assign(tooltipMenu, {position: getPositionInfo(e, menu.getBoundingClientRect())}));
  //   if('undefined' !== typeof NavBarBtnsHandler.onmouseover_menu) NavBarBtnsHandler.onmouseover_menu(e, menu.getBoundingClientRect());
  // }
  // menu.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Menu', null);
  //   if('undefined' !== typeof NavBarBtnsHandler.onmouseout_menu) NavBarBtnsHandler.onmouseout_menu(e, menu.getBoundingClientRect());
  // }

  // register viewerIcon event
  // viewerIcon.onclick = (e) => {
  //   let swFilter = viewerSelect.style.display;
  //   if('none' == swFilter)swFilter = 'initial';
  //   else swFilter = 'none';
  //   viewerSelect.style.display = swFilter;
  //   if('undefined' !== typeof commandListHandler.onclick_viewerIcon) commandListHandler.onclick_viewerIcon(e);
  // }
  // viewerIcon.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Viewer',Object.assign(tooltipViewer, {position: getPositionInfo(e, viewerIcon.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_viewerIcon) commandListHandler.onmouseover_viewerIcon(e, viewerIcon.getBoundingClientRect());
  // }
  // viewerIcon.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Viewer', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_viewerIcon) commandListHandler.onmouseout_viewerIcon(e, viewerIcon.getBoundingClientRect());
  // }
  // // register add event
  // add.onclick = (e) => {
  //   if('undefined' !== typeof commandListHandler.onclick_add) commandListHandler.onclick_add(e);
  // }
  // add.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Add',Object.assign(tooltipAdd, {position: getPositionInfo(e, add.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_add) commandListHandler.onmouseover_add(e, add.getBoundingClientRect());
  // }
  // add.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Add', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_add) commandListHandler.onmouseout_add(e, add.getBoundingClientRect());
  // }
  // // register select event
  // select.onclick = (e) => {
  //   navClassRemove();
  //   select.classList.add(FOCUS_CLASS);
  //   if('undefined' !== typeof commandListHandler.onclick_select) commandListHandler.onclick_select(e);
  // }
  // select.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Select', Object.assign(tooltipSelect, {position: getPositionInfo(e, select.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_select) commandListHandler.onmouseover_select(e, select.getBoundingClientRect());
  // }
  // select.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Select', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_select) commandListHandler.onmouseout_select(e, select.getBoundingClientRect());
  // }
  // // register selectSq event
  // selectSq.onclick = (e) => {
  //   navClassRemove();
  //   selectSq.classList.add(FOCUS_CLASS);
  //   if('undefined' !== typeof commandListHandler.onclick_selectSq) commandListHandler.onclick_selectSq(e);
  // }
  // selectSq.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-selectSq', Object.assign(tooltipSelectSq, {position: getPositionInfo(e, selectSq.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_selectSq) commandListHandler.onmouseover_selectSq(e, selectSq.getBoundingClientRect());
  // }
  // selectSq.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-selectSq', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_selectSq) commandListHandler.onmouseout_selectSq(e, selectSq.getBoundingClientRect());
  // }
  // // register remove event
  // remove.onclick = (e) => {
  //   if('undefined' !== typeof commandListHandler.onclick_del) commandListHandler.onclick_del(e);
  // }
  // remove.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Remove', Object.assign(tooltipRemove, {position: getPositionInfo(e, remove.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_remove) commandListHandler.onmouseover_remove(e, remove.getBoundingClientRect());
  // }
  // remove.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Remove', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_remove) commandListHandler.onmouseout_remove(e, remove.getBoundingClientRect());
  // }
  // // register clear event
  // clear.onclick = (e) => {
  //   if('undefined' !== typeof commandListHandler.onclick_clear) commandListHandler.onclick_clear(e);
  // }
  // clear.onmouseover = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Clear', Object.assign(tooltipClear, {position: getPositionInfo(e, clear.getBoundingClientRect())}));
  //   if('undefined' !== typeof commandListHandler.onmouseover_clear) commandListHandler.onmouseover_clear(e, clear.getBoundingClientRect());
  // }
  // clear.onmouseout = (e) => {
  //   if(swTooltip)toolTipEvent.emit(me.id+'-Clear', null);
  //   if('undefined' !== typeof commandListHandler.onmouseout_clear) commandListHandler.onmouseout_clear(e, clear.getBoundingClientRect());
  // }

  // inject controller /////////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  // Lazy Initialization ///////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';
  // viewerSelect.style.display  = 'none';
  // add.style.display           = 'none';
  // list.style.display          = 'none';
  // select.style.display        = 'none';
  // selectSq.style.display      = 'none';
  // remove.style.display        = 'none';
  // clear.style.display         = 'none';

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  NavBarBtnsController
};
