import { Page                   } from '/layout/components/tables/sortingTable/class/Page';
import { SortingTableController } from '/layout/components/tables/sortingTable/SortingTableController';
import { TopNavBtnsController   } from './TopNavBtnsController';
import { StaticTableHeader as getTableHeader } from './StaticTableHeader';

/***
 * block:  Section_listController
 ***/
// Describe constant Class below
const Section_listController = function (section_listHandler) {


  //* private variable & mapping //////////////////////////////////////////////
  const _private              = {};
  const contents              = this.firstChild;
  const frameTop              = contents.children[0];
  const frameMid              = contents.children[1];
  let panelNavBtns            = frameTop.firstChild.childNodes[2];
  let sortingTable            = frameMid.firstChild.firstChild.firstChild.children[0];


  //* Privilege Static Functions //////////////////////////////////////////////
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
  panelNavBtns = $SR.registerModel(panelNavBtns).inject(TopNavBtnsController, {});

  sortingTable = $SR.registerModel(sortingTable).inject(SortingTableController, {
    onclick_tableRow: (i, data, row) => {
      sortingTable.markSelectRow(row.id);
      // console.log("sortingTable.clickedItems:",sortingTable.clickedItems);
    },
    ondblclick_tableRow: (e, i, data) => {
      const id = data[1];
      console.log(id);
      if ('undefined' !== typeof section_listHandler.detail_viewById) section_listHandler.detail_viewById(id);
    },
    load_prePage: (prePage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true, _start=20&_limit=10
        // params: { _start: prePage.startNum, _end: prePage.endNum }
        params: {
          _start: prePage.startNum,
          _end: prePage.endNum,
          _sort: prePage.orderId,
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
    load_nextPage: (nextPage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true, _start=20&_limit=10
        // params: { _start: nextPage.startNum, _end: nextPage.endNum }
        params: {
          _start: nextPage.startNum,
          _end: nextPage.endNum,
          _sort: nextPage.orderId,
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
    load_scrollPage: (scrollPage) => {
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // params: { location: this.id, date: Date.now() }
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
    sort_tableByPageInfo(_p) {
      const _page = _.cloneDeep(_p);
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        params: {
          _start: _page.startNum,
          _end  : _page.endNum,
          _sort : _page.orderId,
          _order: _page.orderBy
        }
      }).then((Response) => {
        _page.rows = Response.data;
        sortingTable.generateTable(_page);
      }).catch((_Error) => {
        console.log('error', Response.data);
      });
    }
  }, getTableHeader());


  //* Event handler ///////////////////////////////////////////////////////////
  panelNavBtns.marker.onclick = (e) => {
    if ('undefined' !== typeof section_listHandler.onclick_write) section_listHandler.onclick_write(e);
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