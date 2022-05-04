import { Section_listController } from '/layout/articles/sample1/section_list/Section_listController';
import { Section_02Controller } from '/layout/articles/sample1/section_02/Section_02Controller';
import { ToolTipController } from '/layout/components/toolTip/ToolTipController';
/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  let queueEvent = $SR.Queue.getInstance();
  const _private          = {};
  const namePlate         = this.getElementsByTagName('h3')[0];
  // const toolTip = this.children[0];
  const toolTip           = $SR.registerModel(this.children[0]).inject(ToolTipController,{});
  // console.log(toolTip);

  //* Privilege Static Functions //////////////////////////////////////////////

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // subject:{
    //   get: () => namePlate.innerText,
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
    section02_activate: (e) => section_02.activate()
  });
  let section_02 = $SR.getModelById(this.id + '-Section_02').inject(Section_02Controller, {
    sectionList_activate: (e) => section_list.activate()
  });

  console.log(section_list);
  //* Lazy Initialization /////////////////////////////////////////////////////
  this.scrollLock = true;

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
