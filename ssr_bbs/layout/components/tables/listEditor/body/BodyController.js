/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Row           } from './Row';
import { RowController } from './RowController';

/**
 * Layout:  BodyController
 * @constructor
 * @param {[Function]} _bodyHandler
 * @param {*} header
 * @returns
 */
const BodyController   = function (_bodyHandler, header) {

  //* Private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  let   rows          = [];
  const rowHandler    = {
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
    onkeydown_cursorTab(_e, _value, _cell, _row,  _header) {
      if ('undefined' !== typeof _bodyHandler.onkeydown_cursorTab) _bodyHandler.onkeydown_cursorTab(_e, _value, _cell, _row,  _header);
    },
    onblur_cursor(_e, _element) {
      if ('undefined' !== typeof _bodyHandler.onblur_cursor) _bodyHandler.onblur_cursor(_e, _element);
    }
  }

  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    rows: {
      get: ()   => rows,
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    generateRows (array, page) {
      rows = [];
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
        const _row = $SR.registerModel(arrTemp[i], true).inject(RowController, rowHandler, array[posErsHead], header);
      }
      rows = me.childNodes;
    },
    generateRvrsRows (array, page) {
      rows = [];
      const arrTemp = [];
      //* draw row 
      let rowNum = page.startNum;
      for (let i = 1; i < array.length; i++) {
        rowNum = rowNum + 1;
        const row = new Row(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.insertBefore(row, me.childNodes[i-1]);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const _row = $SR.registerModel(arrTemp[i], true).inject(RowController, rowHandler, array[posErsHead], header);
      }
      rows = me.childNodes;
    }
  });



  //* Event handler /////////////////////////////////////////////////////////////
  this.onwheel =(e)=>{
    if ('undefined' !== typeof _bodyHandler.onmousewheel_tbody) _bodyHandler.onmousewheel_tbody(e);
  }
  this.addEventListener("dblclick", (_e) => {
    if ('undefined' !== typeof _bodyHandler.ondblclick_tbody) _bodyHandler.ondblclick_tbody(_e);
  });
  this.addEventListener("keydown", (_e) => {
    // enter
    console.log('keydown _e.keyCode', _e.keyCode);
  });
  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
};
export {
  BodyController
};
