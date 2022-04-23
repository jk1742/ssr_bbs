/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //? private variable & mapping //////////////////////////////////////////////
  const me                = this;
  const namePlate         = me.getElementsByTagName('h3')[0];

  //? Privilege Static Functions //////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //   }
  // }

  // subject // alt // icon //
  //? Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    subject:{
      get: () => namePlate.innerText,
      enumerable:true
    },
  });

  //? Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    // setViewFilter(arr){
    //   let carriage = ['None'].concat(arr);
    //   viewerSelect.generateList(carriage);
    // },
    // trigger_onclickViewer(){
    //   viewerIcon.onclick();
    // },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });

  //? Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //? inject controller ///////////////////////////////////////////////////////
  // viewerSelect            = $SR.View(viewerSelect.id).inject(DropListController, {
  //   update_selectedValue(e, value, id){
  //     viewerFilterDisease = value;
  //     if('undefined' !== typeof commandListHandler.update_selectedValue) commandListHandler.update_selectedValue(e, value, id);
  //   }
  // });

  //? Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //? End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
