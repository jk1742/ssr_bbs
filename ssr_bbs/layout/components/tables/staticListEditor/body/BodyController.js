/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Row           } from './Row';
import { RowController } from './RowController';

/**
 * Layout:  BodyController
 * Description: functional process => draw rectangle by mouse click.
 * @constructor
 * @param {[Function]} _bodyHandler
 * @param {*} header
 * @returns
 */
const BodyController   = function (_bodyHandler, header) {

  //* Private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  const _private      = {
    rows          : [],
    rowHandler    : {
      onmousedown_cell(_e, _id, _rowNum, _element, _data){
        if ('undefined' !== typeof _bodyHandler.onmousedown_cell) _bodyHandler.onmousedown_cell(_e, _id, _rowNum, _element, _data);
      },
      onmouseup_cell(_e, _id, _rowNum, _element, _data) {
        if ('undefined' !== typeof _bodyHandler.onmouseup_cell) _bodyHandler.onmouseup_cell(_e, _id, _rowNum, _element, _data);
      },
      onmousemove_cell(_e, _id, _rowNum, _element, _data) {
        if ('undefined' !== typeof _bodyHandler.onmousemove_cell) _bodyHandler.onmousemove_cell(_e, _id, _rowNum, _element, _data);
      },
      onclick_row(_e, _id, _rowNum, _element, _data) {
        if ('undefined' !== typeof _bodyHandler.onclick_row) _bodyHandler.onclick_row(_e, _id, _rowNum, _element, _data);
      },
      ondbclick_row(_e, _id, _rowNum, _element, _data) {
        if ('undefined' !== typeof _bodyHandler.ondbclick_row) _bodyHandler.ondbclick_row(_e, _id, _rowNum, _element, _data);
      },
      onclick_cell(_e, _id, _rowNum, _element, _header) {
        if ('undefined' !== typeof _bodyHandler.onclick_cell) _bodyHandler.onclick_cell(_e, _id, _rowNum, _element, _header);
      },
      ondblclick_cell(_e, _id, _rowNum, _element, _header) {
        if ('undefined' !== typeof _bodyHandler.ondblclick_cell) _bodyHandler.ondblclick_cell(_e, _id, _rowNum, _element, _header);
      },
      onchange_cell(_e, _value, _rowNum,  _element,  _header) {
        if ('undefined' !== typeof _bodyHandler.onchange_cell) _bodyHandler.onchange_cell(_e, _value, _rowNum,  _element,  _header);
      },
      onkeyup_cursorUpCell(_e, _value, _cell, _row,  _header) {
        if ('undefined' !== typeof _bodyHandler.onkeyup_cursorUpCell) _bodyHandler.onkeyup_cursorUpCell(_e, _value, _cell, _row,  _header);
      },
      onkeyup_cursorDownCell(_e,  _value, _element, _row,  _header) {
        if ('undefined' !== typeof _bodyHandler.onkeyup_cursorDownCell) _bodyHandler.onkeyup_cursorDownCell(_e,  _value, _element, _row,  _header);
      },
      onkeydown_cursorNextCell(_e, _value, _cell, _row,  _header) {
        if ('undefined' !== typeof _bodyHandler.onkeydown_cursorNextCell) _bodyHandler.onkeydown_cursorNextCell(_e, _value, _cell, _row,  _header);
      },
      onkeydown_cursorPreCell(_e, _value, _cell, _row,  _header) {
        if ('undefined' !== typeof _bodyHandler.onkeydown_cursorPreCell) _bodyHandler.onkeydown_cursorPreCell(_e, _value, _cell, _row,  _header);
      },
      onkeydown_cellEnter(_e, _value, _cell, _row, _header) {
        if ('undefined' !== typeof _bodyHandler.onkeydown_cellEnter) _bodyHandler.onkeydown_cellEnter(_e, _value, _cell, _row, _header);
      },
      onkeydown_cursorTab(_e, _value, _cell, _row,  _header) {
        if ('undefined' !== typeof _bodyHandler.onkeydown_cursorTab) _bodyHandler.onkeydown_cursorTab(_e, _value, _cell, _row,  _header);
      },
      onkeydown_reverseTab(_e, _value, _cell, _row, _header) {
        if ('undefined' !== typeof _bodyHandler.onkeydown_reverseTab) _bodyHandler.onkeydown_reverseTab(_e, _value, _cell, _row, _header);
      },
      onkeyup_paste(_e, _pastedArray, _cell, _row, _header) {
        if ('undefined' !== typeof _bodyHandler.onkeyup_paste) _bodyHandler.onkeyup_paste(_e, _pastedArray, _cell, _row, _header);
      },
      onblur_cursor(_e, _value, _cell, _row, _header) {
        if ('undefined' !== typeof _bodyHandler.onblur_cursor) _bodyHandler.onblur_cursor(_e, _value, _cell, _row, _header);
      }
    }
  }


  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    rows: {
      get: ()   => _private.rows,
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    generateRows (array, page) {
      _private.rows = [];
      const arrTemp = [];
      //* draw row
      let rowNum = page.startNum;
      for (let i = 1; i < array.length; i++) {
        rowNum = rowNum + 1;
        const row = new Row(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.appendChild(row);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const _row = $SR.registerModel(arrTemp[i], true).inject(RowController, _private.rowHandler, array[posErsHead], header);
      }
      _private.rows = me.childNodes;
    }
  });



  //* Event handler /////////////////////////////////////////////////////////////
  this.onwheel =(e)=>{
    if ('undefined' !== typeof _bodyHandler.onmousewheel_tbody) _bodyHandler.onmousewheel_tbody(e);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
};
export {
  BodyController
};
