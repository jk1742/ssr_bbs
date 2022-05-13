import { ToolTipController } from '/layout/components/toolTip/ToolTipController';
import { Section_listController } from '/layout/articles/psrList/section_list/Section_listController';
import { Section_detailController } from '/layout/articles/psrList/section_detail/Section_detailController';

/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  let toolTip = this.children[0];

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
  $SR.registerModel(toolTip).inject(ToolTipController, {});
  let section_list = $SR.registerFrameById(this.id + '-Section_list').inject(Section_listController, {
    onclick_write     : (e) => section_detail.activate(),
    detail_viewById   : (id) => section_detail.viewById(id)
  });
  let section_detail = $SR.registerFrameById(this.id + '-Section_detail').inject(Section_detailController, {
    onclick_list: (e) => section_list.activate()
  });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // console.log(this.scrollLock);
  // this.scrollLock = true;

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
