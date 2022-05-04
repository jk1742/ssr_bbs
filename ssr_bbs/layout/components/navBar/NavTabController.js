/***
 * block:  NavTabController control buttons
 ***/
// Describe constant Class below
const NavTabController   = function(navTabHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const item = this.firstChild.childNodes[1];
  const close = this.firstChild.childNodes[2];

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
    articleId:{
      set:(str) => {_private.articleId = str},
      get:() => _private.articleId,
      enumerable: true
    },
  });

  //* Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    // setViewFilter(arr){
    //   let carriage = ['None'].concat(arr);
    //   viewerSelect.generateList(carriage);
    // },
    trigger_onclickItem(){
      item.onclick();
    },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  item.onclick = (e) => {
    if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  }
  close.onclick = (e) => {
    if('undefined' !== typeof navTabHandler.onclick_close) navTabHandler.onclick_close(e);
  }

  //* inject controller ///////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  NavTabController
};
