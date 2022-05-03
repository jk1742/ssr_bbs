import { PanelNavBtnsController } from "./PanelNavBtnsController";
import { ActiveBarController } from "/layout/components/panel/activeBar/ActiveBarController";

/***
 * block:  Section_detailController
 ***/
// Describe constant Class below
const Section_detailController = function (section_detailHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private      = {};
  const contents      = this.firstChild;
  const frameTop      = contents.children[0];
  const frameMid      = contents.children[1];
  let panelNavBtns    = frameTop.firstChild.childNodes[2];
  let activeBar       = frameMid.firstChild.firstChild.firstChild.children[2].children[1];

  //* Privilege Static Functions //////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //   }
  // }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    // activateSection() {
    //   queueEvent.push({
    //      id: this.id
    //   });
    //   $SR.moveScreen_bak(this);
    // }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  panelNavBtns = $SR.registerModel(panelNavBtns).inject(PanelNavBtnsController, {});
  activeBar = $SR.registerModel(activeBar).inject(ActiveBarController, {});
  activeBar.appendToOven("fa-solid fa-brain");
  activeBar.appendToOven("fa-solid fa-briefcase");
  activeBar.bake();


  //* Event handler ///////////////////////////////////////////////////////////
  panelNavBtns.list.onclick = (e) => {
    if ('undefined' !== typeof section_detailHandler.onclick_list) section_detailHandler.onclick_list(e);
  }
  activeBar.brain.onclick = (e) => {
    console.log('brain !!');
  }
  activeBar.briefcase.onclick = (e) => {
    console.log('briefcase !!');
  }

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_detailController
};
