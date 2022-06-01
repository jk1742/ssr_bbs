/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Page                     } from '/class/Page';
import { CHART_ICONS              } from '/class/static/BasicChartIcons';
import { TableBodyController      } from '/layout/components/sortingTable/body/TableBodyController';
import { TableHeaderRow           } from '/layout/components/sortingTable/header/TableHeaderRow';
import { TableHeaderRowController } from '/layout/components/sortingTable/header/TableHeaderRowController';

/**
 * Layout:  SortingTableController
 * @constructor
 * @param {[Function]} sortingTableHandler
 * @param {*} headerInfo
 * headerInfo sample
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
  let   me                = this;
  let   table             = me.firstChild;
  let   temp              = me.lastChild;
  let   thead             = table.firstChild;
  let   tbody             = table.lastChild;
  let   tableArrayData    = [];
  let   tableHeader       = headerInfo;
  let   page              = new Page();
  //let   page              = new Page(100, 'id', 'string');

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
      array.sort(function(a, b) {
        if (a[pos] > b[pos]) return ('asc' === direction) ?  1:-1;
        if (a[pos] < b[pos]) return ('asc' === direction) ? -1: 1;
        return 0;
      });
    } else if ('boolean' === selectedHeadType){
      array.sort(function(a, b) {
        if (a[pos] > b[pos]) return ('asc' === direction) ?  1:-1;
        if (a[pos] < b[pos]) return ('asc' === direction) ? -1: 1;
        return 0;
      });
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
    for (let h = 0; h < headArray.length; h++) {
        const header = headArray[h];
        arrayId.push(header.id);
    }
    carriage.push(arrayId);
    for (let i = 0; i < objArray.length; i++) {
      let array = [];
      for (let j = 0; j < arrayId.length; j++) {
          const header = arrayId[j];
          array.push(objArray[i][header]);
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
   * updateTable_modify(array)
   *  Modify Table
   * @param {Array} array tableArrayData
   */
  const updateTable_modify = function(array){
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
  });


  //* Access Control: public functions ////////////////////////////////////////
  Object.assign(this, {
    // !important update tabledata
    generateTable(_p){
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
      updateTable_modify(tableArrayData);
    },
    renderTableRow (name, pos, data, dom) {
      // select item
      if(pos == 1) {
        if(data) dom.innerHTML = CHART_ICONS.CHECK;
        else dom.removeChild(dom.firstChild);
      } else dom.textContent = data;
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
      page.orderType  = selectedType;
      // page update call
      if('undefined' !== typeof sortingTableHandler.sort_tableByPageInfo) sortingTableHandler.sort_tableByPageInfo(page);
    }
  }, tableHeader);
  tbody = $SR.View(tbody.id).inject(TableBodyController, {
    onclick_row(e, id, data){
      if('undefined' !== typeof sortingTableHandler.onclick_tableRow) sortingTableHandler.onclick_tableRow(e, id, data);
    },
    ondbclick_row(e, id, data){
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
        if('undefined' !== typeof sortingTableHandler.load_prePage && 0 <= cnt && 20 > cnt) {
          let firstNum = tbody.firstChild.rowNum;
					let prePage = new Page(10, page.orderId, page.orderType, page.total);
          prePage.orderBy = page.orderBy;
					prePage.preTic(firstNum);
          // prepage
          if(1 >= firstNum) return;
          prePage = sortingTableHandler.load_prePage(prePage);
          appendTrBefore(prePage);
          page.startNum = page.startNum - prePage.size;
          page.lastNum  = page.startNum + page.size;
          cutTailRows(prePage.size);
        }
      } else {
        // down
        cnt = ((table.scrollTop + table.getBoundingClientRect().height) / table.scrollHeight) * 100;
        if('undefined' !== typeof sortingTableHandler.load_nextPage && 85 < cnt) {
          let lastNum = tbody.lastChild.rowNum;
					let nextPage = new Page(10, page.orderId, page.orderType, page.total);
          nextPage.orderBy = page.orderBy;
          nextPage.nextTic(lastNum);
          // nextPage
					if(nextPage.total <= lastNum) return;
          nextPage = sortingTableHandler.load_nextPage(nextPage);
          appendTrAfter(nextPage);
          page.lastNum  = page.lastNum + nextPage.size;
          page.startNum = page.startNum + nextPage.size;
          cutHeadRows(nextPage.size);
        }
      }
    }
  }, tableHeader);


  //* Event handler ///////////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
};
export {
  SortingTableController
};

