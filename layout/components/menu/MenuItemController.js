/***
 * block:  MenuItemController
 ***/
// Describe constant Class below
const MenuItemController = function (menuItemHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private              = {};

  //* Privilege Static Functions //////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //     width : t.width,
  //     height: t.height,
  //     pageX : e.pageX,
  //     pageY : e.pageY
  //   }
  // }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    loc:{
      set:(str) => {_private.loc = str},
      get:() => _private.loc,
      enumerable:true
    }
  });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  this.onclick = (e) => {
    if ('undefined' !== typeof menuItemHandler.onclick_menuItem) menuItemHandler.onclick_menuItem(e);
  }

  //* inject controller ///////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization /////////////////////////////////////////////////////
  console.log('menu item controller', this);

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  MenuItemController
};
