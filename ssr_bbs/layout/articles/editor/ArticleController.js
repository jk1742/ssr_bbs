import { ToolTipController } from '/layout/components/toolTip/ToolTipController';
import { Section_listController } from './section_list/Section_listController';
import { Section_listEditorController } from './section_listEditor/Section_listEditorController';

/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  let toolTip             = this.children[0];


  //* Privilege Static Functions //////////////////////////////////////////////


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


  //* inject controller ///////////////////////////////////////////////////////
  $SR.registerModel(toolTip).inject(ToolTipController, {});
  let section_list = $SR.registerFrameById(this.id + '-Section_list').inject(Section_listController, {
    onclick_lineEditor: (e, selectedArray) => {
      selectedArray.forEach(el => {
        el.isSelected = false;
      });
      section_listEditor.renderTable(selectedArray);
      section_listEditor.activate();
    }
  });
  let section_listEditor = $SR.registerFrameById(this.id + '-Section_listEditor').inject(Section_listEditorController,{
    onclick_arrowRotateLeft: (_e) => section_list.activate()
  });


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
