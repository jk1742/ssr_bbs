/***
 * layout:  PanelNavController control buttons
 ***/
//* Describe EditTopBarController layout below
const PanelNavBtnsController   = function(panelNavHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me          = this;
  let left          = me.children[0];
  let down          = $SR.registerModel(me.children[1]).setInteractive((d)=>{
    console.log("PanelNavBtnsController.down.setInteractive.",d);
  }).setTooltip('confirm', 'bottom', '#555', 1, 0, 10);
  console.log('PanelNavBtnsController', down);

  // registerModel
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
    down:{
      get: ()=>down
    },
  });

  //* Access control: public functions //////////////////////////////////////////
  // Object.assign(this, {
  //   onUpside(){
  //     upside.style.display = "block";
  //   },
  // });

  //* Event handler /////////////////////////////////////////////////////////////
  // upside.onclick = (e) => {
  //   if('undefined' !== typeof panelNavHandler.onclick_upside) panelNavHandler.onclick_upside(e);
  // }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // upside.style.display = "none";
  // undo.style.display = "none";
  // upload.style.display = "none";
  // confirm.style.display = "none";
  // alert.style.display = "none";

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  PanelNavBtnsController
};
