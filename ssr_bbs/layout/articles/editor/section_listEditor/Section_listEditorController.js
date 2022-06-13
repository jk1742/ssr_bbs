import { ListEditorController } from '/layout/components/tables/listEditor/ListEditorController';
import { StaticTableHeader as getTableHeader } from './StaticTableHeader';
import { Page                   } from '/layout/components/tables/sortingTable/class/Page';


/***
 * block:  Section_listController
 ***/
// Describe constant Class below
const Section_listEditorController = function (section_listEditorHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  let listEditor          = this.getModelById('list-editor');
  let btnArrowRotateLeft  = this.getModelById('btn-back-list');
  let btnGetTableData     = this.getModelById('btn-get-data');


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
      const _page = listEditor.getNewPage(array);
      listEditor.generateTable(_page);
    }
  });


  //* inject controller ///////////////////////////////////////////////////////
  listEditor = $SR.registerModel(listEditor).inject(ListEditorController, {
    onclick_tableRow: (_e, _id, _rowNum, _element, _data) => {
      listEditor.markSelectRow(_id);
    },
    onclick_cell: (_e, _id, _rowNum, _element, _header) => {
      // listEditor.update(page)
      // console.log(_element);
    },
    ondblclick_cell: (_e, _id, _rowNum, _element, _header) => {
      console.log('ondbclick_cell', _element, _header);
    }
  }, getTableHeader());


  //* Event handler ///////////////////////////////////////////////////////////
  btnArrowRotateLeft.onclick = (e) => {
    if ('undefined' !== typeof section_listEditorHandler.onclick_arrowRotateLeft) section_listEditorHandler.onclick_arrowRotateLeft(e);
  }
  btnGetTableData.onclick = (_e) => {
    console.log("btnGetTableData/", listEditor.page);
  }
  // lineEditorBtn.onclick = (e) => {
  //   const selectedArray = sortingTable.page.rows.filter(e => e.isSelected);
  //   console.log("lineEditorBtn/", selectedArray);
  // }


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_listEditorController
}