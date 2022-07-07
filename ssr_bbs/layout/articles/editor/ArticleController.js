import { ToolTipController } from '/layout/components/toolTip/ToolTipController';
import { Section_listController } from './sections/sortingList/Section_listController';
import { Section_staticListEditorController } from './sections/staticListEditor/Section_staticListEditorController';
import { LocalCsvEditorController } from './sections/localCsvEditor/LocalCsvEditorController';


/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  let section_list        = this.getModelByDataId('psr-sorting-list');
  let staticListEditor    = this.getModelByDataId('static-list-editor');
  let section_localCsvEditor = this.getModelByDataId('local-csv-editor');
  let toolTip             = this.children[0];
  console.log('staticListEditor',staticListEditor);


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
  section_list = $SR.registerFrame(section_list).inject(Section_listController, {
    onclick_lineEditor: (e, selectedArray) => {
      selectedArray.forEach(el => {
        el.isSelected = false;
      });
      staticListEditor.renderTable(selectedArray);
      staticListEditor.activate();
    }
  });
  staticListEditor = $SR.registerFrame(staticListEditor).inject(Section_staticListEditorController,{
    onclick_arrowRotateLeft: (_e) => section_list.activate()
  });
  section_localCsvEditor = $SR.registerFrame(section_localCsvEditor).inject(LocalCsvEditorController, {});


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
