/* eslint-disable no-unused-vars */

import { Textarea } from "../formElement/Textarea";
import { InputController } from "./InputController";

/**
 * TableCellController
 * @constructor
 * @param {[Function]} _cellHandler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const CellController = function (_cellHandler, _cellValue, header, rowJson) {

  //* private variable & mapping ////////////////////////////////////////////////
  const LEFT_ARROW    = 37;
  const UP_ARROW      = 38;
  const RIGHT_ARROW   = 39;
  const DOWN_ARROW    = 40;
  const TAB           = 9;
  const ENTER         = 13;
  const ESC           = 27;
  const CTRL          = 17;
  const KEY_V         = 86;
  let   me            = this;
  const _private      = {
    cellValue   : _cellValue,
    headerId    : header.id,
    watchCtrlKey: false
  };


  //* Privilege Static Functions ////////////////////////////////////////////////
  const onchange_input = (_e, _value) => {
    _cellHandler.onchange_cell(_e, _value, me, header);
  }
  const onfocusout_input = (_e, _value) => {
    console.log('onfocusout_input');
    if(me.cellValue != _value) {
      _cellHandler.onchange_cell(_e, _value, me, header);
    } else {
      me.innerHTML = me.cellValue;
    }
  }
  /**
   * pasteProcess
   * @param {*} str
   * @returns 2d Array
   */
  const pasteProcess = (str)=>{
    if (!(str.includes('\t') || str.includes('\n') || str.includes('\r')) ) return false;
    let lines = [];
    let carriage = [];
    lines = str.split(/\r?\n/);
    for (const iter of lines) {
      const cell = iter.split('\t');
      carriage.push(cell);
    }
    return carriage;
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    cellValue: {
      get: () => _private.cellValue,
      set: (o) => { _private.cellValue = o }
    },
    headerId:{
      get: () => _private.headerId
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    paintUsedCell() {
      me.classList.add('painted-used-one');
    },
    paintSelectedCell() {
      me.classList.add('painted-selected-one');
    },
    truncateClass(){
      me.className = '';
    },
    insertEditor(){
      me.classList.add('is-editing');
      me.innerHTML = '';
      if (header.editor) {
        let _dom = header.editor.dom.cloneNode(true);
        this.append(_dom);
        _dom = $SR.registerModel(_dom).inject(header.editor.controller, { onchange_input, onfocusout_input }, header, rowJson);
      } else {
        const input = new Textarea();
        this.append(input);
        $SR.registerModel(input).inject(InputController, {
          onchange_input, onfocusout_input
        });
      }
      const domObjArray = this.getModelByDataClass('input-field');
      if (1 < domObjArray.length) console.error('Exceeded Objects inserted on a cell, Each Cell only able to have one object.', domObjArray);
      const insertField = domObjArray[0];
      insertField.value = me.cellValue;
      insertField.focus();
      if (insertField.tagName == 'TEXTAREA') {
        insertField.addEventListener("keyup", (_e) => {
          // Up
          if (UP_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorUpCell(_e, insertField.value, me, header);
          // Down
          if (DOWN_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorDownCell(_e, insertField.value, me, header);
          // Paste => send to blur event when ctrl + v key combination
          if (KEY_V == _e.keyCode && _e.ctrlKey) insertField.blur();
        });
        insertField.addEventListener("keydown", (_e) => {
          // Esc
          if (ESC == _e.keyCode) _cellHandler.onblur_cursor(_e, insertField.value, me, header);
          // Enter
          if (ENTER == _e.keyCode) _cellHandler.onkeydown_cellEnter(_e, insertField.value, me, header);
          // Tab
          if (TAB == _e.keyCode) _cellHandler.onkeydown_cursorTab(_e, insertField.value, me, header);
          // Shift Tab shiftKey
          if (TAB == _e.keyCode && _e.shiftKey) _cellHandler.onkeydown_reverseTab(_e, insertField.value, me, header);
          // Left
          if (LEFT_ARROW == _e.keyCode && 0 == _e.target.selectionStart) _cellHandler.onkeydown_cursorPreCell(_e, insertField.value, me, header);
          // Right
          if (RIGHT_ARROW == _e.keyCode && _e.target.value.length == _e.target.selectionStart) _cellHandler.onkeydown_cursorNextCell(_e, insertField.value, me, header);
        });
      } else if (insertField.tagName == 'SELECT'){
        // SELECT document object event
        insertField.addEventListener("keydown", (_e) => {
          // Esc
          if (ESC == _e.keyCode) _cellHandler.onblur_cursor(_e, insertField.value, me, header);
          // Tab
          if (TAB == _e.keyCode) _cellHandler.onkeydown_cursorTab(_e, insertField.value, me, header);
          // Shift + Tab shiftKey
          if (TAB == _e.keyCode && _e.shiftKey) _cellHandler.onkeydown_reverseTab(_e, insertField.value, me, header);
          // Left
          if (LEFT_ARROW == _e.keyCode) _cellHandler.onkeydown_cursorPreCell(_e, insertField.value, me, header);
          // Right
          if (RIGHT_ARROW == _e.keyCode) _cellHandler.onkeydown_cursorNextCell(_e, insertField.value, me, header);
          // Up
          if (UP_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorUpCell(_e, insertField.value, me, header);
          // Down
          if (DOWN_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorDownCell(_e, insertField.value, me, header);
        });
      }
      insertField.addEventListener("blur", (_e) => {
        const pastedArray = pasteProcess(insertField.value);
        // send event to staticListEditor
        if (pastedArray) _cellHandler.onkeyup_paste(_e, pastedArray, me, header);
        else _cellHandler.onblur_cursor(_e, insertField.value, me, header);
      });
      insertField.addEventListener("dblclick", (_e) => {
        // double click in textarea
        _e.preventDefault();
        _e.stopPropagation();
      });
    }
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  this.onclick = (_e) => {
    if ('undefined' === typeof _cellHandler.onclick_cell) return;
    if ('undefined' !== typeof _cellHandler.onclick_cell) _cellHandler.onclick_cell(_e, me, header);
  }
  this.ondblclick = (_e) => {
    if ('undefined' === typeof _cellHandler.ondblclick_cell) return;
    if ('undefined' !== typeof _cellHandler.ondblclick_cell) _cellHandler.ondblclick_cell(_e, me, header);
  }
  this.addEventListener("mousedown", (_e) => {
    if ('undefined' !== typeof _cellHandler.onmousedown_cell) _cellHandler.onmousedown_cell(_e, me, header);
  });
  this.addEventListener("mouseup", (_e) => {
    if ('undefined' !== typeof _cellHandler.onmouseup_cell) _cellHandler.onmouseup_cell(_e, me, header);
  });
  this.addEventListener("mousemove", (_e) => {
    if ('undefined' !== typeof _cellHandler.onmousemove_cell) _cellHandler.onmousemove_cell(_e, me, header);
  });


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CellController
}
