import { StaticListEditorController } from '/layout/components/tables/staticListEditor/StaticListEditorController';
import { StaticTableHeader as getTableHeader } from './StaticTableHeader';


/***
 * block:  Section_listController
 ***/
// Describe constant Class below
const Section_staticListEditorController = function (section_staticListEditorHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  let staticListEditor    = this.getModelByDataId('list-editor');
  let btnArrowRotateLeft  = this.getModelByDataId('btn-back-list');
  let btnGetTableData     = this.getModelByDataId('btn-get-data');
  let btnCopy             = this.getModelByDataId('btn-copy-selected');


  //* Privilege Static Functions //////////////////////////////////////////////


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
    renderTable(array) {
      const _page = staticListEditor.getNewPage(array);
      staticListEditor.generateTable(_page);
    }
  });


  //* inject controller ///////////////////////////////////////////////////////
  staticListEditor = $SR.registerModel(staticListEditor).inject(StaticListEditorController, {
    onclick_tableRow: (_e, _id, _rowNum, _element, _data) => {
      staticListEditor.markSelectRow(_id);
    },
    onclick_cell: (_e, _id, _rowNum, _element, _header) => {
      // staticListEditor.update(page);
      // console.log(_element);
    },
    ondblclick_cell: (_e, _id, _rowNum, _element, _header) => {
      console.log('ondbclick_cell', _element, _header);
    }
  }, getTableHeader());


  //* Event handler ///////////////////////////////////////////////////////////
  btnArrowRotateLeft.onclick = (e) => {
    if ('undefined' !== typeof section_staticListEditorHandler.onclick_arrowRotateLeft) section_staticListEditorHandler.onclick_arrowRotateLeft(e);
  }
  btnGetTableData.onclick = (_e) => {
    console.log("btnGetTableData/", staticListEditor.page);
  }
  btnCopy.onclick = (_e) => {
    const selectedValues = staticListEditor.selectedValTxt;
    staticListEditor.copyToClipboard(selectedValues);
  }


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_staticListEditorController
}