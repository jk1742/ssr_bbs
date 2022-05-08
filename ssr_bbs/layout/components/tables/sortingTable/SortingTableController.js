/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Page                     } from './class/Page';
import { CHART_ICONS              } from '/class/static/BasicChartIcons';
import { TableBodyController      } from '/layout/components/tables/sortingTable/body/TableBodyController';
import { SpaceRow } from './body/SpaceRow';
import { TableHeaderRow           } from '/layout/components/tables/sortingTable/header/TableHeaderRow';
import { TableHeaderRowController } from '/layout/components/tables/sortingTable/header/TableHeaderRowController';
import { SliderBarController      } from './index/SliderBarController';
import _ from 'lodash';

/**
 * Layout:  SortingTableController
 * @constructor
 * @param {[Function]} sortingTableHandler
 * @param {*} headerInfo
 * headerInfo
 * [
 *  {
 *   name: '',
 *   id: 'isSelected',
 *   type: 'boolean',
 *   icon: ['fas','fa-check-circle'],
 *   width: '2%',
 *  },
 * ]
 * @returns
 */
const SortingTableController   = function (sortingTableHandler, headerInfo) {

  //* private variable & mapping //////////////////////////////////////////////
  const   PAGE_TIC          = 5;
  let     me                = this;
  const   table             = me.firstChild.firstChild;
  const   thead             = table.firstChild;
  let     tbody             = table.lastChild;
  let     indexBar          = me.children[1];
  let     tableArrayData    = [];
  let     tableHeader       = headerInfo;
  let     page              = new Page();
  let     _private ={
    rowHeight:null
  }
  // console.log("SortingTableController/indexBar:", indexBar);

  //* Privilege Static Functions //////////////////////////////////////////////
  /**
   * sorting
   * @param {[Array]} array
   * @param {String} selectedHeadId
   * @param {String} direction
   * @param {String} selectedHeadType
   * @returns {[Array]}
   */
  const sorting = function (tableArray, selectedHeadId, direction, selectedHeadType) {
    const innerSort = function (a, b) {
      if (a[pos] > b[pos]) return ('asc' === direction) ? 1 : -1;
      if (a[pos] < b[pos]) return ('asc' === direction) ? -1 : 1;
      return 0;
    }
    let array = _.cloneDeep(tableArray);
    let pos = array[0].findIndex(e => e === selectedHeadId);
    pos = (0 > pos)? 0:pos;
    const header = _.cloneDeep(array.splice(0,1));
    if ('string' === selectedHeadType) {
      array.sort(function(a, b) {
        let nameA = a[pos].toUpperCase();
        let nameB = b[pos].toUpperCase();
        if (nameA < nameB) return ('asc' === direction) ? -1: 1;
        if (nameA > nameB) return ('asc' === direction) ?  1:-1;
        return 0;
      });
    } else if ('number' === selectedHeadType){
      array.sort(innerSort);
    } else if ('boolean' === selectedHeadType){
      array.sort(innerSort);
    }
    return header.concat(array);
  };//

  /**
   * fabricTableArray
   * @param {[Object]} objArray
   * @param {[Array]} headArray
   * @returns {[Array]}
   */
  const fabricTableArray = function (objArray, headArray){
    let carriage = [];
    let arrayId = [];
    for (const element of headArray) {
        const header = element;
        arrayId.push(header.id);
    }
    carriage.push(arrayId);
    for (const element of objArray) {
      let array = [];
      for (const header of arrayId) {
        array.push(element[header]);
      }
      carriage.push(array);
    }
    return carriage;
  };

	/**
	 * mergeTableArrays
	 * @param {*} o1
	 * @param {*} o2
	 * @returns {[]} table array data
	 */
  const mergeTableArrays = function(o1, o2){
		if(0 >= o1.length) return o2;
		if(0 >= o2.length) return o1;
		let a1 = _.cloneDeep(o1);
		let a2 = _.cloneDeep(o2);
		let head = a1.splice(0,1);
		a2.splice(0,1);
    const body = a1.concat(a2);
    return head.concat(body);
  }

  /**
   * appendTrAfter
   *  Generate Table
   * @param {Page} _p
   */
  const appendTrAfter = function(_p) {
    // sorting and fabricTableArray
		let arrTemp = fabricTableArray(_p.rows, tableHeader);
		tableArrayData = mergeTableArrays(tableArrayData, arrTemp);
		// generate tbody
    // console.log("SortingTableController/appendTrAfter:",_p.rows, page.rows);
    tbody.generateRows(arrTemp, _p);
  };

  /**
   * appendTrBefore
   * @param {Page} _p
   */
  const appendTrBefore = function(_p) {
    // sorting and fabricTableArray
    let arrTemp = fabricTableArray(_p.rows, tableHeader);
		tableArrayData = mergeTableArrays(arrTemp, tableArrayData);
		// generate tbody
    tbody.generateRvrsRows(arrTemp, _p);
  };

  /**
   * modifyTable(array)
   *  Modify Table
   * @param {Array} array tableArrayData
   */
  const modifyTable = function(array){
    for (let i = 0; i < tbody.rows.length; i++) {
      const e   = array[i+1];
      const row = tbody.rows[i];
      if(compareArray(e, row.data)) continue;
      for (let j = 0; j < e.length; j++) {
        if(e[j] != row.data[j]) row.changeCells(j, e[j]);
      }
    }
  };

  /**
   * compareArray
   *  compare array a1 to a2
   * @param {Array} a1
   * @param {Array} a2
   * @returns {boolean}
   */
  const compareArray = function(a1, a2){
    let i = a1.length;
    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  };

  /**
   * Cut Head Rows
   * @param {Number} size
   */
  const cutHeadRows = function(size) {
    for (let index = 0; index < size; index++) {
      tbody.removeChild(tbody.firstChild);
    }
    tableArrayData.splice(1, size);
  }

  /**
   * Cut Tail Rows
   * @param {Number} size
   */
  const cutTailRows = function(size) {
    let tbodyLength = tbody.childNodes.length;
		let cnt = tbodyLength % size;
		cnt = (0 < cnt) ? cnt:size;
    for (let index = 0; index < cnt; index++) {
      tbody.removeChild(tbody.lastChild);
    }
    tableArrayData.splice((tableArrayData.length-cnt), cnt);
  }

  /**
   * clear Rows
   */
  const clearRows = function(){
    while (tbody.hasChildNodes()) tbody.removeChild(tbody.firstChild);
    tableArrayData = [];
  }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    tableArrayData: {
      get: ()   => tableArrayData,
    },
    tableHeader: {
      get: ()   => tableHeader,
    },
    pageInfo:{
      get: ()   => page,
    },
    rowHeight:{
      get: () => _private.rowHeight,
      set: (o)=> {_private.rowHeight = o},
      configurable:true,
    }
  });


  //* Access Control: public functions ////////////////////////////////////////
  Object.assign(this, {
    // !important update tabledata
    generateTable(_p){
      page = _p;
      // reset table and array data
      clearRows();
      // append tr
      appendTrAfter(_p);
    },
    updateTable (_p) {
      if(null === _p) {
        clearRows();
        return;
      }
      // object to array
      const tempTableArray = fabricTableArray(_p.rows, tableHeader);
      // sorting
      tableArrayData = sorting(tempTableArray, tableHeaderRow.selectedId, _p.orderBy, tableHeaderRow.selectedType);
      // data insert
      modifyTable(tableArrayData);
    },
    renderTableRow (name, pos, data, dom) {
      // select item
      if(pos == 1) {
        if(data) dom.innerHTML = CHART_ICONS.CHECK;
        else dom.removeChild(dom.firstChild);
      } else dom.textContent = data;
    },
    /**
     * Render Next page
     * @param {*} nextPage
     */
    renderNext(nextPage){
      // append rows on bottom
      console.log(`renderNext1: ${nextPage.endNum} ${tbody.lastChild.rowNum}`);
      if (nextPage.endNum == tbody.lastChild.rowNum || nextPage.endNum > page.total) {
        const k = nextPage.endNum % nextPage.size;
        console.log(`    renderNext2: ${nextPage.endNum} ${tbody.lastChild.rowNum}`, k);
        return;
      }
      page.endNum = page.endNum + nextPage.size;
      appendTrAfter(nextPage);
      page.rows = page.rows.concat(nextPage.rows);
      // cut top items
      page.startNum = page.startNum + nextPage.size;
      cutHeadRows(nextPage.size);
      page.rows = page.rows.slice(nextPage.size);
      indexBar.scrollNextTic(PAGE_TIC, tbody.firstChild.rowNum, page);
    },
    renderPre(prePage) {
      // append rows on top
      if ((prePage.startNum + 1) == tbody.firstChild.rowNum || page.startNum <= 0) return;
      page.startNum = page.startNum - prePage.size;
      appendTrBefore(prePage);
      // inner structure page for sync
      // insert loaded rows at front
      page.rows.splice(0, 0, ...prePage.rows);
      // measure page size
      page.endNum = page.endNum - prePage.size;
      const k = page.rows.length % prePage.size;
      const r = (k == 0) ? prePage.size : k;
      // cut page rows from tail
      page.rows.splice((page.rows.length - r) , r);
      // cut table rows form tail
      cutTailRows(prePage.size);
      indexBar.scrollPreTic(PAGE_TIC, tbody.firstChild.rowNum, page);
    }
  });
  me = this;

  //* Lazy Initialization /////////////////////////////////////////////////////
  // generate table HEADER
  thead.appendChild(new TableHeaderRow(thead.id, tableHeader));

  //* Inject controller ///////////////////////////////////////////////////////
  const tableHeaderRow = $SR.View(thead.id).inject(TableHeaderRowController, {
    stortingTable_sort(e, selectedId, selectedType){
      page.toggleOrderBy();
      page.orderId    = selectedId;
      // page update call
      if('undefined' !== typeof sortingTableHandler.sort_tableByPageInfo) sortingTableHandler.sort_tableByPageInfo(page);
    }
  }, tableHeader);
  tbody = $SR.View(tbody.id).inject(TableBodyController, {
    onclick_row(e, id, data){
      if('undefined' !== typeof sortingTableHandler.onclick_tableRow) sortingTableHandler.onclick_tableRow(e, id, data);
    },
    ondblclick_row(e, id, data){
      if('undefined' !== typeof sortingTableHandler.ondblclick_tableRow) sortingTableHandler.ondblclick_tableRow(e, id, data);
    },
    changeTableCells(name, pos, data, dom){
      me.renderTableRow(name, pos, data, dom);
    },
    onmousewheel_tbody(e){
      let cnt;
      if(0 > e.deltaY){
        // up
        cnt = (table.scrollTop / table.scrollHeight) * 100;
        console.log("SortingTableController/wheel:",cnt);
        if('undefined' !== typeof sortingTableHandler.load_prePage && 0 <= cnt && 20 > cnt) {
          let firstNum = tbody.firstChild.rowNum;
          let prePage = new Page(PAGE_TIC, page.orderId, page.orderBy, page.total, page.startNum);
          prePage.preTic();
          if (1 < firstNum) sortingTableHandler.load_prePage(prePage);
        }
      } else {
        // down
        cnt = ((table.scrollTop + table.getBoundingClientRect().height) / table.scrollHeight) * 100;
        if('undefined' !== typeof sortingTableHandler.load_nextPage && 85 < cnt) {
          let endNum = tbody.lastChild.rowNum;
          let nextPage = new Page(PAGE_TIC, page.orderId, page.orderBy, page.total, page.endNum);
          if (nextPage.total > endNum) sortingTableHandler.load_nextPage(nextPage);
        }
      }
    }
  }, tableHeader);
  // record index
  this.rowHeight = thead.getBoundingClientRect().height;
  // indexBar
  indexBar = $SR.registerModel(indexBar).inject(SliderBarController, {
    getRowHeight:() => this.rowHeight,
    getTableHeight: () => this.getBoundingClientRect().height,
    onMoved_slideDot: _.debounce(function (start, end, p) {
      const toll = end - start;
      const pos = p - start
      const totalTic = Math.ceil(page.total/PAGE_TIC);
      const startPageTic = Math.floor(pos / (toll / (totalTic - page.size / PAGE_TIC)));
      // console.log("fire", toll, pos, `${pos / (toll / 100)}%`, `${startPageTic} tic`);
      // console.log(`start ${startPageTic * PAGE_TIC + 1} ${(startPageTic + 4) * PAGE_TIC}`);
      // console.log(page);
      const scrollPage = new Page(page.size, page.orderId, page.orderBy, page.total, startPageTic * PAGE_TIC)
      sortingTableHandler.load_scrollPage(scrollPage);
    }, 1000)
  });
  console.log("SortingTableController", table);

  //* Event handler ///////////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
};
export {
  SortingTableController
};

