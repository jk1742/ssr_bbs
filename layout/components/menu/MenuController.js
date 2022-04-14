/***
 * block:  MenuController
 ***/
// Describe constant Class below
const MenuController   = function(menuHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const _private              = {};
  const close                 = this.firstChild;
  // console.log('MenuController', close);

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
  // store in private
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    open(){
      console.log('MenuController-open', this);
      this.style.height = '250px';
    },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });

  //* Event handler
  // register menu event
  close.onclick = (e) => {
    this.style.height = '0px';
    if ('undefined' !== typeof menuHandler.onclick_close) menuHandler.onclick_close(e);
  }

  //* inject controller /////////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MenuController
};
