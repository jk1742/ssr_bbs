/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Page                     } from './class/Page';
import { BodyController           } from './body/BodyController';
import { TableHeaderRow           } from './header/TableHeaderRow';
import { TableHeaderRowController } from './header/TableHeaderRowController';
import _ from 'lodash';
import { CursorController } from './body/CursorController';


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
  let     table             = this.getModelById('list-editor-table');
  let     thead             = table.firstChild;
  let     tbody             = table.lastChild;
  let     indexBar          = me.children[1];
  let     tableArrayData    = [];
  let     tableHeader       = headerInfo;
  let     page              = new Page();
  let     _private          = {
            rowHeight     : null,
            tic           : 5,
            clickedItems  : new Set(),
            keys          : [],
            selectedValTxt: '',
            cursorCellId  : '',
            cursorReceiver: null,
            mouse         : {
              leftDown: {
                cellId: '',
                status: false
              },
              leftUp: {
                cellId: '',
              },
              move: {
                cellId: '',
              }
            }
  };


  //* Privilege Static Functions //////////////////////////////////////////////
  const getKeys = function(){
    const array = headerInfo.filter(obj => obj.isKey);
    let carriage = [];
    array.forEach(element => {
      carriage.push(element.id);
    });
    return carriage;
  }
  const getParentTableCellId = (_dom) => {
    return _dom.closest('TD').id;
  }
  /**
   * pasteData_tbody
   * edit tbody and page Data model
   */
  const pasteData_tbody = (_pastingStartCell, _pastedArray) =>{
    const _row = _pastingStartCell.closest('TR');
    const array = Array.from(_row.children);
    let columnCursor = array.findIndex((o) => _pastingStartCell.isSameNode(o));
    let rowCursor = _row.rowNum - 1;
    // loop
    for (let rowIndex = 0; rowIndex < _pastedArray.length; rowIndex++) {
      const copiedRow = _pastedArray[rowIndex];
      const currentRow = tbody.rows[rowCursor + rowIndex];
      // currentCell
      let currentCell;
      let sw = false;
      for (let colIndex = 0; colIndex < copiedRow.length; colIndex++) {
        const copiedCellData = copiedRow[colIndex];
        if (!sw) {
          currentCell = currentRow.children[columnCursor + colIndex];
          sw = true;
        } else currentCell = callSibling('next', currentCell);
        if (_.isNull(currentCell)) continue;
        // touch page data model
        page.rows[currentRow.rowNum - 1][currentCell.headerId] = copiedCellData.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, "");
        // paint tbody cell
        currentCell.truncateClass();
        currentCell.paintUsedCell();
      }
    }
  }
  const getTableCellPos = (_dom) => {
    const _table = _dom.closest('TABLE');
    if(_.isNull(_table)) return null;
    const _row = _dom.closest('TR');
    const array = Array.from(_row.children);
    const _cell = _dom;
    let columnCursor = array.findIndex((o) => _cell.isSameNode(o));
    return {
      x: columnCursor,
      y: _row.rowNum
    }
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
   * paintSelectedCells
   * time gap 150 mil second
   */
  const paintSelectedCells = _.throttle((_event) => {
    // skip if same id
    if (_event.target.children.length > 0) return;
    if (_event.target.id == _private.mouse.move.cellId || _event.target.tagName != 'TD') return;
    // get object and paint
    const _startPos = getTableCellPos(document.getElementById(_private.mouse.leftDown.cellId));
    const _cursorPos = getTableCellPos(_event.target);
    const START = 0;
    const END = 1;
    const x_arr = [_startPos.x, _cursorPos.x].sort(function (a, b) { return a - b; });
    const y_arr = [_startPos.y - 1, _cursorPos.y - 1].sort(function (a, b) { return a - b; });
    for (let _i = 0; _i < tbody.rows.length; _i++) {
      const _htmlRow = tbody.rows[_i];
      const _row = Array.from(_htmlRow.children);
      if (y_arr[START] <= _i && _i <= y_arr[END]) {
        for (let _j = 0; _j < _row.length; _j++) {
          const _cell = _row[_j];
          if ('TD' != _cell.tagName) continue;
          if (x_arr[START] <= _j && _j <= x_arr[END]) _cell.paintSelectedCell();
          else _cell.truncateClass();
        }
      } else {
        for (const _cell of _row) {
          if ('TD' == _cell.tagName) _cell.truncateClass();
        }
      }
    }
    _private.mouse.move.cellId = _event.target.id;
  }, 150);
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
        row.changeCleanCells(j, changedRow[j]);
      }
    }
  }
  /**
   * updateTable_modify(array)
   *  Modify Table
   * @param {Array} array tableArrayData
   */
  const remapTable_adaptWithClass = function (array) {
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
   * clear Rows
   */
  const clearRows = function() {
    while (tbody.hasChildNodes()) tbody.removeChild(tbody.firstChild);
    tableArrayData = [];
  }
  /**
   * callSibling
   **/
  const callSibling = (sw, el) => {
    let pos;
    const NEXT = 'nextSibling';
    const PRE = 'previousSibling';
    if (sw == 'next') pos = NEXT;
    else pos = PRE;
    if (_.isNull(el)) return null;
    let _cursor = el[pos];
    if (_.isNull(_cursor)) return null;
    while (_cursor.style.display == 'none') {
      _cursor = _cursor[pos];
    }
    return _cursor;
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
    },
    selectedValTxt: {
      get: () => _private.selectedValTxt,
      set: (o) => { _private.selectedValTxt = o },
      configurable: true,
      enumerable: true
    },
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
    remapTableWithClass(_p) {
      if (null === _p) {
        clearRows();
        return;
      }
      // object to array
      const tempTableArray = fabricTableArray(_p.rows, tableHeader);
      // sorting
      tableArrayData = sorting(tempTableArray, tableHeaderRow.selectedId, _p.orderBy, tableHeaderRow.selectedType);
      // updateTable by page array
      remapTable_adaptWithClass(tableArrayData);
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
      page.rows = page.rows.slice(nextPage.size);
      indexBar.scrollNextTic(me.tic, tbody.firstChild.rowNum, page);
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
    },
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
    },
    setCursorReceiver(){
      // initialize
      const array = me.getModelByDataClass('cursor-receiver');
      if (typeof array !== 'undefined' && array.length > 0) {
        for (const iterator of array) {
          iterator.remove();
        }
      }
      // set receiver
      let textArea = document.createElement("textarea");
      textArea.setAttribute('data-class', 'cursor-receiver');
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      me.appendChild(textArea);
      $SR.registerModel(textArea).inject(CursorController,{
        onkeyup_paste(_e, _pastedArray){
          let _cell = document.getElementById(_private.mouse.leftDown.cellId);
          if (_private.mouse.leftUp.cellId != _private.mouse.leftDown.cellId) {
            const START     = 0;
            const END       = 1;
            const _startPos = getTableCellPos(document.getElementById(_private.mouse.leftDown.cellId));
            const _endPos   = getTableCellPos(document.getElementById(_private.mouse.leftUp.cellId));
            const x_arr     = [_startPos.x, _endPos.x].sort(function (a, b) { return a - b; });
            const y_arr     = [_startPos.y - 1, _endPos.y - 1].sort(function (a, b) { return a - b; });
            _cell           = Array.from(tbody.rows[y_arr[START]].children)[x_arr[START]];
          }
          pasteData_tbody(_cell, _pastedArray);
          me.remapTableWithClass(page);
        },
        onkeyup_copy(_e) {
          me.copyToClipboard(me.selectedValTxt);
        }
      });
      _private.cursorReceiver = textArea;
    },
    focusCursorReceiver() {
      if (_.isNull(_private.cursorReceiver)) {
        console.warn('Unable to get Focus cursor. CursorReceiver object is empty');
        return;
      }
      _private.cursorReceiver.focus();
      _private.cursorReceiver.select();
    },
    removeCursorReceiver(){
      _private.mouse.leftDown.cellId  = '';
      _private.mouse.leftUp.cellId    = '';
      _private.mouse.leftDown.status  = false;
      if (!_.isNull(_private.cursorReceiver)) {
        console.warn('CursorReceiver object is already null');
        return;
      }
      _private.cursorReceiver.remove();
    }
  });
  me = this;


  //* Lazy Initialization /////////////////////////////////////////////////////
  // generate table HEADER
  thead = $SR.registerModel(thead);
  thead.appendChild(new TableHeaderRow(thead.id, tableHeader));


  //* Inject controller ///////////////////////////////////////////////////////
  /**
   * table-header
   */
  const tableHeaderRow = thead.inject(TableHeaderRowController, {
    onclick_asteriskTh(e, dom){
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
    listEditor_sort(_e, selectedId, _selectedType){
      // order by
      page.orderBy = page.toggleOrderBy();
      page.orderId = selectedId;
      // page update call
      if('undefined' !== typeof _listEditorHandler.onheaderclick_sorting) _listEditorHandler.onheaderclick_sorting(page);
    }
  }, tableHeader);

  /**
   * table-body
   */
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
      me.removeCursorReceiver();
      me.remapTable(page);
      _e.target.insertEditor();
      _private.cursorCellId = getParentTableCellId(_e.target);
      if ('undefined' !== typeof _listEditorHandler.ondblclick_cell) _listEditorHandler.ondblclick_cell(_e, _id, _rowNum, _element, _header);
    },
    onchange_cell(_e, _value, _rowNum,  _element,  _header) {
      me.removeCursorReceiver();
      page.rows[_rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      _element.insertEditor();
    },
    onkeyup_cursorUpCell(_e, _value, _cell, _row,  _header) {
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const tdArray = Array.from(_row.getElementsByTagName('td'));
      const pos = tdArray.findIndex((element) => element.id == _cell.id);
      const upRow = callSibling('pre',_row);
      if (_.isNull(upRow)) {
        _cell.insertEditor();
        console.warn('list Editor event: first line');
        return;
      }
      const upRowTdArray = Array.from(upRow.getElementsByTagName('td'));
      const upperCell = upRowTdArray[pos];
      upperCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(upperCell);
    },
    onkeyup_cursorDownCell(_e, _value, _cell, _row,  _header) {
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const tdArray = Array.from(_row.getElementsByTagName('td'));
      const pos = tdArray.findIndex((element) => element.id == _cell.id);
      const downRow = callSibling('next', _row);
      if (_.isNull(downRow)) {
        _cell.insertEditor();
        console.warn('list Editor event: end of line');
        return;
      }
      const downRowTdArray = Array.from(downRow.getElementsByTagName('td'));
      const downCell = downRowTdArray[pos];
      downCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(downCell);
    },
    onkeydown_cursorNextCell(_e, _value, _cell, _row,  _header) {
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const nextCell = callSibling('next', _cell);
      if (_.isNull(nextCell)) {
        _cell.insertEditor();
        console.warn('list Editor event: end of line');
        return;
      }
      nextCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(nextCell);
    },
    onkeydown_cursorPreCell(_e, _value, _cell, _row,  _header) {
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const preCell = callSibling('pre', _cell);
      if (_.isNull(preCell) || 'TH' == preCell.tagName) {
        _cell.insertEditor();
        const inputCell = _cell.getModelByDataClass('input-field')[0];
        inputCell.selectionStart = 0;
        console.warn('list Editor event: first line');
        return;
      }
      preCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(preCell);
    },
    onkeydown_cursorTab(_e, _value, _cell, _row,  _header) {
      _e.preventDefault();
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const nextCell = callSibling('next', _cell);
      if (_.isNull(nextCell)) {
        _cell.insertEditor();
        console.warn('list Editor event: end of line');
        return;
      }
      nextCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(nextCell);
    },
    onkeydown_reverseTab(_e, _value, _cell, _row, _header){
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      const preCell = callSibling('pre', _cell);
      if (_.isNull(preCell) || 'TH' == preCell.tagName) {
        _cell.insertEditor();
        const inputCell = _cell.getModelByDataClass('input-field')[0];
        inputCell.selectionStart = 0;
        console.warn('list Editor event: first line');
        return;
      }
      preCell.insertEditor();
      _private.cursorCellId = getParentTableCellId(preCell);
    },
    onkeydown_cellEnter(_e, _value, _cell, _row, _header) {
      _e.preventDefault();
      me.removeCursorReceiver();
      page.rows[_row.rowNum - 1][_header.id] = _value;
      me.remapTable(page);
      _cell.insertEditor();
    },
    onkeyup_paste(_e, _pastedArray, _cell, _row, _header) {
      // get cursor of column
      // access table body dom and page data model
      pasteData_tbody(_cell, _pastedArray);
      me.remapTableWithClass(page);
    },
    onblur_cursor(_e, _value, _cell, _row, _header) {
      page.rows[_row.rowNum - 1][_header.id] = _value.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, "");
      me.remapTable(page);
    },
    onmousedown_cell(_e){
      _e.preventDefault();
      _private.mouse.leftDown.cellId  = _e.target.id;
      _private.mouse.leftUp.cellId    = '';
      _private.mouse.leftDown.status  = true;
      if(!_.isNull(_private.cursorCellId) && _private.cursorCellId != '') {
        let inputCursor = null;
        if (!_.isNull(_private.cursorCellId) && _private.cursorCellId != '') inputCursor = document.getElementById(_private.cursorCellId).getModelByDataClass('input-field');
        if (!_.isNull(inputCursor) && inputCursor.length > 0) inputCursor[0].blur();
        _private.cursorCellId = '';
      }
      // clear
      me.remapTable(page);
    },
    onmouseup_cell(_e) {
      _private.mouse.leftUp.cellId = _e.target.id;
      me.selectedValTxt = '';
      if (_e.target.tagName != 'TD') return;
      //? Mouse Click
      if (_private.mouse.leftDown.cellId === _private.mouse.leftUp.cellId) {
        // select single
        let inputCursor = null;
        if (!_.isNull(_private.cursorCellId) && _private.cursorCellId != '') inputCursor = document.getElementById(_private.cursorCellId).getModelByDataClass('input-field');
        if (!_.isNull(inputCursor) && inputCursor.length > 0) inputCursor[0].blur();
        _private.cursorCellId = '';
        _e.target.paintSelectedCell();
        me.selectedValTxt = _e.target.cellValue;
      } else {
        // select range
        //? selected row to Array Data
        const _selectedValuesArray = [];
        let _row = tbody.rows[0];
        while (!_.isNull(_row)) {
          const _rowArray = [];
          let _cell = _row.querySelector("TD");
          while (!_.isNull(_cell)) {
            if (_cell.classList.contains('painted-selected-one')) _rowArray.push(_cell.cellValue);
            _cell = callSibling('next', _cell);
          }
          if (_rowArray.length > 0) _selectedValuesArray.push(_rowArray);
          _row = callSibling('next', _row);
        }
        //? Array Data to Text => Array Data
        for (let _i = 0; _i < _selectedValuesArray.length; _i++) {
          const _iterRow = _selectedValuesArray[_i];
          for (let _j = 0; _j < _iterRow.length; _j++) {
            const _iterCell = _iterRow[_j];
            me.selectedValTxt += _iterCell;
            if (_j < _iterRow.length - 1) me.selectedValTxt += '\t';
          }
          if (_i < _selectedValuesArray.length - 1) me.selectedValTxt += '\n';
        }
      }
      //? Initialize
      _private.mouse.leftDown.status = false;
      me.setCursorReceiver();
      me.focusCursorReceiver();
    },
    onmousemove_cell(_e){
      if (!_private.mouse.leftDown.status || _private.mouse.leftDown.cellId.length <= 0) return;
      paintSelectedCells(_e);
    },
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