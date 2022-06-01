/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Page                     } from './class/Page';
import { CHART_ICONS              } from '/class/static/BasicChartIcons';
import { BodyController           } from './body/BodyController';
import { TableHeaderRow           } from './header/TableHeaderRow';
import { TableHeaderRowController } from './header/TableHeaderRowController';
import { SliderBarController      } from './index/SliderBarController';


/**
 * Layout:  ListEditorController
 * @constructor
 * @param {Function} _listEditorHandler
 * public functions below
 * @function generateTable    : first load table
 * @function updateTable      : when data changed
 * @function renderNext       : when next paging
 * @function renderPre        : when pre paging
 * event
 * @event onclick_tableRow
 * @event ondblclick_tableRow
 * @event onscroll_prePaging
 * @event onscroll_nextPaging
 * @event onscrollBarTouch_paging
 * @event onheaderclick_sorting
 *
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
const ListEditorController   = function (_listEditorHandler, headerInfo) {

  //* private variable & mapping //////////////////////////////////////////////
  let     me                = this;
  const   table             = me.firstChild.firstChild;
  let     thead             = table.firstChild;
  let     tbody             = table.lastChild;
  let     indexBar          = me.children[1];
  let     tableArrayData    = [];
  let     tableHeader       = headerInfo;
  let     page              = new Page();
  let     _private          = {
            rowHeight   : null,
            tic         : 5,
            clickedItems: new Set(),
            keys        : []
  }


  //* Privilege Static Functions //////////////////////////////////////////////
  const getKeys = function(){
    const array = headerInfo.filter(obj => obj.isKey);
    let carriage = [];
    array.forEach(element => {
      carriage.push(element.id);
    });
    return carriage;
  }
  const selectMarker = (_rows)=>{
    let tmpArray = _.cloneDeep(_rows);
    me.clickedItems.forEach(element => {
      tmpArray.map(obj => {
        if (obj[me.keys[0]] === element) obj['isSelected'] = true;
      });
    });
    return tmpArray;
  }
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
  }
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
  }
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
    _p.rows = selectMarker(_p.rows);
    // sorting and fabricTableArray
		let arrTemp = fabricTableArray(_p.rows, tableHeader);
		tableArrayData = mergeTableArrays(tableArrayData, arrTemp);
		// generate tbody
    tbody.generateRows(arrTemp, _p);
  }
  /**
   * appendTrBefore
   * @param {Page} _p
   */
  const appendTrBefore = function(_p) {
    _p.rows = selectMarker(_p.rows);
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
  const remapTable_adapt = function (array) {
    for (let i = 0; i < tbody.rows.length; i++) {
      const changedRow = array[i + 1]; // 1 header
      const row = tbody.rows[i];
      for (let j = 0; j < changedRow.length; j++) {
        row.changeCells(j, changedRow[j]);
      }
    }
  }
  /**
   * updateTable_modify(array)
   *  Modify Table
   * @param {Array} array tableArrayData
   */
  const updateTable_modify = function(array){
    for (let i = 0; i < tbody.rows.length; i++) {
      const changedRow = array[i+1]; // 1 header
      const row = tbody.rows[i];
      if (compareArray(changedRow, row.data)) continue;
      for (let j = 0; j < changedRow.length; j++) {
        if (changedRow[j] != row.data[j]) row.changeCells(j, changedRow[j]);
      }
    }
  }
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
  }
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
  const clearRows = function() {
    while (tbody.hasChildNodes()) tbody.removeChild(tbody.firstChild);
    tableArrayData = [];
  }


  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    tableArrayData: {
      get: ()   => tableArrayData,
      enumerable: true
    },
    tableHeader: {
      get: ()   => tableHeader,
      enumerable: true
    },
    page:{
      get: ()   => page,
      enumerable: true
    },
    rowHeight:{
      get: () => _private.rowHeight,
      set: (o)=> {_private.rowHeight = o},
      configurable:true,
      enumerable: true
    },
    tic:{
      get: () => _private.tic,
      set: (o) => { _private.tic = o },
      configurable: true,
      enumerable: true
    },
    clickedItems: {
      get: () => [..._private.clickedItems],
      configurable: true,
      enumerable: true
    },
    keys:{
      get: () => getKeys(),
      configurable: true,
      enumerable: true
    }
  });


  //* Access Control: public functions ////////////////////////////////////////
  Object.assign(this, {
    // !important update tableData
    generateTable(_p){
      page = _p;
      // reset table and array data
      clearRows();
      // append tr
      appendTrAfter(_p);
    },
    getNewPage(_p){
      const size = _p.length;
      const _page = new Page(size, '', '', size, 0);
      _page.rows = _p
      return _page;
    },
    /**
     * updateTable
     * @param {*} _p
     * @returns
     */
    updateTable (_p) {
      if(null === _p) {
        clearRows();
        return;
      }
      // object to array
      const tempTableArray = fabricTableArray(_p.rows, tableHeader);
      // sorting
      tableArrayData = sorting(tempTableArray, tableHeaderRow.selectedId, _p.orderBy, tableHeaderRow.selectedType);
      // updateTable by page array
      updateTable_modify(tableArrayData);
    },
    remapTable(_p) {
      if (null === _p) {
        clearRows();
        return;
      }
      // object to array
      const tempTableArray = fabricTableArray(_p.rows, tableHeader);
      // sorting
      tableArrayData = sorting(tempTableArray, tableHeaderRow.selectedId, _p.orderBy, tableHeaderRow.selectedType);
      // updateTable by page array
      remapTable_adapt(tableArrayData);
    },
    /**
     * Render Next page
     * @param {*} nextPage
     */
    renderNext(nextPage) {
      // append rows on bottom
      if (nextPage.endNum <= tbody.lastChild.rowNum || nextPage.endNum > page.total) return;
      page.endNum = page.endNum + nextPage.size;
      appendTrAfter(nextPage);
      page.rows = page.rows.concat(nextPage.rows);
      // cut top items
      page.startNum = page.startNum + nextPage.size;
      cutHeadRows(nextPage.size);
      page.rows = page.rows.slice(nextPage.size);
      indexBar.scrollNextTic(me.tic, tbody.firstChild.rowNum, page);
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
      indexBar.scrollPreTic(me.tic, tbody.firstChild.rowNum, page);
    },
    markSelectRow(id){
      const row = document.getElementById(id);
      const key = this.keys[0];
      // _private.keys[0]
      const qId = row.getDataByName(key);
      let tmpArray = _.cloneDeep(page.rows);
      const r = tmpArray.findIndex(e => e[key] === qId);
      if (typeof tmpArray[r].isSelected !== 'undefined' && tmpArray[r].isSelected === true) tmpArray[r].isSelected = undefined;
      else tmpArray[r].isSelected = true;
      page.rows = tmpArray;
      me.updateTable(me.page);
      if (_private.clickedItems.has(qId)) _private.clickedItems.delete(qId);
      else _private.clickedItems.add(qId);
    },
    selectedRowsClear(){
      // erase isSelected
      let _tmpRows = _.cloneDeep(page.rows);
      _tmpRows.forEach(element => { element.isSelected = false});
      me.page.rows = _tmpRows;
      // clear isSelected data set
      _private.clickedItems.clear();
      // renew table
      me.updateTable(me.page);
    }
  });
  me = this;

  //* Lazy Initialization /////////////////////////////////////////////////////
  // generate table HEADER
  thead = $SR.registerModel(thead);
  thead.appendChild(new TableHeaderRow(thead.id, tableHeader));


  //* Inject controller ///////////////////////////////////////////////////////
  const tableHeaderRow = thead.inject(TableHeaderRowController, {
    onclick_asteriskTh(e, dom){
      console.log('onclick_asteriskTh/1/',e, dom);
      const key = me.keys[0];
      let sw = false;
      // has any selected rows then change @sw to true
      const tmpArray = _.cloneDeep(page.rows);
      if (undefined === tmpArray.find(o => o.isSelected === true)) sw = true;
      if(sw) {
        page.rows = tmpArray.map(obj => {
          obj.isSelected = true;
          _private.clickedItems.add(obj[key]);
          return obj;
        });
      } else {
        page.rows = tmpArray.map(obj => {
          _private.clickedItems.delete(obj[key]);
          obj.isSelected = undefined;
          return obj;
        });
      }
      me.updateTable(page);
    },
    listEditor_sort(e, selectedId, selectedType){
      // order by
      page.orderBy = page.toggleOrderBy();
      page.orderId = selectedId;
      // page update call
      if('undefined' !== typeof _listEditorHandler.onheaderclick_sorting) _listEditorHandler.onheaderclick_sorting(page);
    }
  }, tableHeader);
  tbody = $SR.registerModel(tbody).inject(BodyController, {
    onclick_row(_e, _id, _rowNum, _element, _data) {
      if ('undefined' !== typeof _listEditorHandler.onclick_tableRow) _listEditorHandler.onclick_tableRow(_e, _id, _rowNum, _element, _data);
    },
    ondbclick_row(_e, _id, _rowNum, _element, _data) {
      if ('undefined' !== typeof _listEditorHandler.ondblclick_tableRow) _listEditorHandler.ondblclick_tableRow(_e, _id, _rowNum, _element, _data);
    },
    onclick_cell(_e, _id, _rowNum, _element, _header) {
      if ('undefined' !== typeof _listEditorHandler.onclick_cell) _listEditorHandler.onclick_cell(_e, _id, _rowNum, _element, _header);
    },
    ondblclick_cell(_e, _id, _rowNum, _element, _header) {
      if ('undefined' !== typeof _listEditorHandler.ondblclick_cell) _listEditorHandler.ondblclick_cell(_e, _id, _rowNum, _element, _header);
    },
    onchange_cell(_e, _element, _rowNum, _value, _header){
      page.rows[_rowNum - 1][_header.id] = _value;
      console.log('listEditor', _value, page.rows);
      me.updateTable(page);
    },
    // onmousewheel_tbody(e){
    //   let cnt;
    //   if(0 > e.deltaY){  // up
    //     cnt = (table.scrollTop / table.scrollHeight) * 100;
    //     if('undefined' !== typeof _listEditorHandler.onscroll_prePaging && 0 <= cnt && 20 > cnt) {
    //       let firstNum = tbody.firstChild.rowNum;
    //       let prePage = new Page(me.tic, page.orderId, page.orderBy, page.total, page.startNum);
    //       prePage.preTic();
    //       if (1 < firstNum) _listEditorHandler.onscroll_prePaging(prePage);
    //     }
    //   } else {            //down
    //     cnt = ((table.scrollTop + table.getBoundingClientRect().height) / table.scrollHeight) * 100;
    //     if('undefined' !== typeof _listEditorHandler.onscroll_nextPaging && 85 < cnt) {
    //       let endNum = tbody.lastChild.rowNum;
    //       let nextPage = new Page(me.tic, page.orderId, page.orderBy, page.total, page.endNum);
    //       if (nextPage.total > endNum) _listEditorHandler.onscroll_nextPaging(nextPage);
    //     }
    //   }
    // },
    ondblclick_tbody(_e){
      me.remapTable(page);
      _e.target.insertEditor();
    }
  }, tableHeader);
  // record index
  this.rowHeight = thead.getBoundingClientRect().height;


  //* Event handler ///////////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  ListEditorController
}
