import { Page                   } from '/layout/components/tables/sortingTable/class/Page';
import { SortingTableController } from '/layout/components/tables/sortingTable/SortingTableController';
import { StaticTableHeader as  getTableHeader  } from './StaticTableHeader';
import { FileInputController } from '/layout/components/form/file/FileInputController';

/***
 * block:  Section_listController
 ***/
// Describe constant Class below
const Section_listController = function (section_listHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private        = {};
  let sortingTable      = this.getModelById('sorting-table');
  let selectCancelBtn   = this.getModelById('btn-select-cancel');
  let lineEditorBtn     = this.getModelById('btn-line-editor');
  let fileInput         = this.getModelByDataClass('file-input')[0];


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
    // activateSection() {
    // }
  });


  //* inject controller ///////////////////////////////////////////////////////
  sortingTable = $SR.registerModel(sortingTable).inject(SortingTableController, {
    onclick_tableRow: (_e, _id, _rowNum, _element, _data) => {
      sortingTable.markSelectRow(_id);
    },
    ondblclick_tableRow: (_e, _id, _rowNum, _element, _data) => {
      const id = _data[1];
      if ('undefined' !== typeof section_listHandler.detail_viewById) section_listHandler.detail_viewById(id);
    },
    onscroll_prePaging: (prePage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true, _start=20&_limit=10
        // params: { _start: prePage.startNum, _end: prePage.endNum }
        params: {
          _start: prePage.startNum,
          _end  : prePage.endNum,
          _sort : prePage.orderId,
          _order: prePage.orderBy
        }
      }).then((Response) => {
        prePage.rows = Response.data;
        sortingTable.renderPre(prePage);
      }).catch((_Error) => {
        console.log('error', Response.data);
        console.log('    ', prePage);
      });
    },
    onscroll_nextPaging: (nextPage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true, _start=20&_limit=10
        // params: { _start: nextPage.startNum, _end: nextPage.endNum }
        params: {
          _start: nextPage.startNum,
          _end  : nextPage.endNum,
          _sort : nextPage.orderId,
          _order: nextPage.orderBy
        }
      }).then((Response) => {
        nextPage.rows = Response.data;
        sortingTable.renderNext(nextPage);
      }).catch((_Error) => {
        console.log('error', Response.data);
        console.log('    ', nextPage);
      });
    },
    onscrollBarTouch_paging: (scrollPage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        params: {
          _start: scrollPage.startNum,
          _end  : scrollPage.endNum,
          _sort : scrollPage.orderId,
          _order: scrollPage.orderBy
        }
      }).then((Response) => {
        scrollPage.rows = Response.data;
        sortingTable.generateTable(scrollPage);
      }).catch((_Error) => {
        console.log('error', Response.data);
      });
    },
    onheaderclick_sorting(_p) {
      const _page = _.cloneDeep(_p);
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        params: {
          _start: _page.startNum,
          _end  : _page.endNum,
          _sort : _page.orderId,
          _order: _page.orderBy
        },// withCredentials: true,
      }).then((Response) => {
        _page.rows = Response.data;
        sortingTable.generateTable(_page);
      }).catch((_Error) => {
        console.log('error', Response.data);
      });
    }
  }, getTableHeader());

  //?
  fileInput = $SR.registerModel(fileInput).inject(FileInputController, {
    onchange_fileInput(_e){
      var reader = new FileReader();
      reader.onload = function () {
        console.log('reader.result:1', reader.result);
        console.log('reader.result:2', fileInput.csvToJSON(reader.result, '\n', ','));
      }
      reader.readAsBinaryString(fileInput.files[0]);
    }
  });
  fileInput.icon = 'fa-brands fa-avianex';


  //* Event handler ///////////////////////////////////////////////////////////
  selectCancelBtn.onclick = (e) => {
    sortingTable.selectedRowsClear();
    if ('undefined' !== typeof section_listHandler.onclick_arrowRotateLeft) section_listHandler.onclick_arrowRotateLeft(e);
  }
  lineEditorBtn.onclick = (e) => {
    const selectedArray = sortingTable.page.rows.filter(o => o.isSelected);
    console.log("lineEditorBtn/", selectedArray);
    if ('undefined' !== typeof section_listHandler.onclick_lineEditor) section_listHandler.onclick_lineEditor(e, selectedArray);
  }


  //* Lazy Initialization /////////////////////////////////////////////////////
  // json-server --watch psrSample.json --port 9005
  axios({
    method: 'get',
    url: 'http://localhost:9000/api/psr',
    // withCredentials: true,
    // params: { location: this.id, date: Date.now() }
    params: { _start: 0, _limit: 20 }
  }).then((Response) => {
    const page = new Page(20, 'RULE_ID', 'asc', 302, 0);
    page.rows = Response.data;
    sortingTable.generateTable(page);
  }).catch((_Error) => {
    console.log('error', Response.data);
  });


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_listController
}