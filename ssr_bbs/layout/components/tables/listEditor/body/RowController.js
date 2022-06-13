/* eslint-disable no-unused-vars */
import { CHART_ICONS } from '/class/static/BasicChartIcons';
import { CellController } from "./CellController";

/**
 * Layout:  RowController
 * @constructor
 * @param {[Function]} _rowHandler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const RowController   = function (_rowHandler, array, header) {

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const data          = array;
  let   rowNum        = Number(me.children[1].textContent);
  let   idList        = [];
  const rowJson       = {};
  for (let index = 0; index < header.length; index++) {
    const _h = header[index];
    const _d = array[index];
    rowJson[_h.id] = _d;
  }


  //* Privilege Static Functions ////////////////////////////////////////////////
  const setIdList = function(){
    let carriage = [];
    for (const element of header) {
      carriage.push(element.id);
    }
    return carriage;
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    data: {
      get: () => data
    },
    rowNum: {
      get: () => rowNum
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    getDataByName (name) {
      return array[idList.indexOf(name)];
    },
    changeCells(_seq, _value) {
      // data change
      this.data[_seq] = _value;
      // html row element align sequence
      if (_seq == 0) {
        const _cell = me.childNodes[_seq];
        if (_value) _cell.innerHTML = CHART_ICONS.CHECK;
        else _cell.innerHTML = '';
        return;
      }
      if (1 > _seq) console.error('script trying to change head of fixed parts.');
      const pos = _seq + 1;
      me.childNodes[pos].textContent = _value;
      me.childNodes[pos].cellValue = _value;
      me.childNodes[pos].classList.remove('_is-selected');
    },
    select(){
      me.style.backgroundColor = "red";
    },
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  me.children[0].onclick = (e) => {
    if ('undefined' !== typeof _rowHandler.onclick_row) _rowHandler.onclick_row(e, this.id, this.rowNum, this, array);
  }
  me.children[0].ondblclick = (e) => {
    if ('undefined' !== typeof _rowHandler.ondbclick_row) _rowHandler.ondbclick_row(e, this.id, this.rowNum, this, array);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////
  idList = setIdList();
  for (let index = 1; index < header.length; index++){
    const headerCell = header[index];
    let tableCell = me.children[index + 1];
    tableCell = $SR.registerModel(tableCell, true).inject(CellController,{
      onclick_cell(_e, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onclick_cell) _rowHandler.onclick_cell(_e, _element.id, me.rowNum, _element, _header);
      },
      ondblclick_cell(_e, _element, _header) {
        if ('undefined' !== typeof _rowHandler.ondblclick_cell) _rowHandler.ondblclick_cell(_e, _element.id, me.rowNum, _element, _header);
      },
      onchange_cell(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onchange_cell) _rowHandler.onchange_cell(_e, _value, me.rowNum, _element, _header);
      },
      onkeyup_cursorUpCell(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onkeyup_cursorUpCell) _rowHandler.onkeyup_cursorUpCell(_e, _value, _element, me, _header);
      },
      onkeyup_cursorDownCell(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onkeyup_cursorDownCell) _rowHandler.onkeyup_cursorDownCell(_e, _value, _element, me, _header);
      },
      onkeydown_cursorNextCell(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onkeydown_cursorNextCell) _rowHandler.onkeydown_cursorNextCell(_e, _value, _element, me, _header);
      },
      onkeydown_cursorPreCell(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onkeydown_cursorPreCell) _rowHandler.onkeydown_cursorPreCell(_e, _value, _element, me, _header);
      },
      onkeydown_cursorTab(_e, _value, _element, _header) {
        if ('undefined' !== typeof _rowHandler.onkeydown_cursorTab) _rowHandler.onkeydown_cursorTab(_e, _value, _element, me, _header);
      },
      onblur_cursor(_e, _element){
        if ('undefined' !== typeof _rowHandler.onblur_cursor) _rowHandler.onblur_cursor(_e, _element);
      }
    }, me.getDataByName(headerCell.id), headerCell, rowJson);
    if ('undefined' !== headerCell.display && 'none' === headerCell.display) tableCell.style.display = 'none';
  }


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  RowController
};
