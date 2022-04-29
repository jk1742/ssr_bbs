import { Section_listController } from '/layout/articles/noticeBoard/section_list/Section_listController';
import { Section_02Controller } from '/layout/articles/sample1/section_02/Section_02Controller';

/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};

  //* Privilege Static Functions //////////////////////////////////////////////
  // const getSubject = function(obj){
  //   let subject;
  //   return subject;
  // }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // subject:{
    //   get: () => me.subject,
    //   enumerable:true
    // },
  });

  //* Access control: Public functions ////////////////////////////////////////
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

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  let section_list = $SR.getModelById(this.id + '-Section_list').inject(Section_listController, {
  });
  // let section_02 = $SR.View(this.id + '-Section_02').inject(Section_02Controller, {
  //   section01_activateSection(e) {
  //     section_01.activateSection();
  //   }
  // });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // console.log(this.scrollLock);
  // this.scrollLock = true;

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
