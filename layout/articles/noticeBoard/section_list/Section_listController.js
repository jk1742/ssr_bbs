// import { CmdSysFormalController } from '/layout/articles/sample1/section_01/CmdSysFormalController';
// import { PanelNavBtns } from '/layout/components/panel/navBtns/PanelNavBtns';
import { PanelNavBtnsController } from "/layout/components/panel/navBtns/PanelNavBtnsController";

/***
 * block:  Section_01Controller
 ***/
// Describe constant Class below
const Section_listController = function (_section_listHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const contents              = this.firstChild;
  const frameTop              = contents.childNodes[1];
  const panelNavBtns          = frameTop.firstChild.childNodes[2];
  console.log('Section_listController', panelNavBtns);

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
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    // activateSection() {
    // }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  // const cmdSysFormal = $SR.View(this.id + '-CmdSysFormal').inject(CmdSysFormalController, {
  //   onclick_confirm(e){
  //     if ('undefined' !== typeof section_01Handler.section02_activateSection) section_01Handler.section02_activateSection(e);
  //   }
  // });
  // $SR.getModel

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_listController
};
