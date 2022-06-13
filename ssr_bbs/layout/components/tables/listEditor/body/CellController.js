/* eslint-disable no-unused-vars */

import { Input } from "../formElement/Input";
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
    watchCtrlKey: false
  };

  //* Privilege Static Functions ////////////////////////////////////////////////
  const onchange_input = (_e, _value) => {
    _cellHandler.onchange_cell(_e, _value, me, header); //(_e, _value, _element, _header)
  }
  const onfocusout_input = (_e, _value) => {
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
    console.log('pasteProcess', str, str.includes('\t'), str.includes('\n'), str.includes('\r'));
    if (!(str.includes('\t') || str.includes('\n') || str.includes('\r')) ) return false;
    // if (str.includes('\r')) str.replace('\r', '\n');
    let lines = [];
    let carriage = [];
    lines = str.split(/\r?\n/);
    console.log('pasteProcess lines', lines);
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
    watchCtrlKey: {
      get: () => _private.watchCtrlKey,
      set: (o) => { _private.watchCtrlKey = o }
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    insertEditor(){
      me.classList.add('_is-selected');
      me.innerHTML = '';
      if (header.editor) {
        let _dom = header.editor.dom.cloneNode(true);
        this.append(_dom);
        _dom = $SR.registerModel(_dom).inject(header.editor.controller, { onchange_input, onfocusout_input }, header, rowJson);
      } else {
        const input = new Input();
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
      if (insertField.tagName == 'INPUT' && insertField.type == 'text'){
        insertField.addEventListener("keyup", (_e) => {
          // Ctrl
          if (CTRL == _e.keyCode) me.watchCtrlKey = false;
          // Up
          if (UP_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorUpCell(_e, insertField.value, me, header);
          // Down
          if (DOWN_ARROW == _e.keyCode) _cellHandler.onkeyup_cursorDownCell(_e, insertField.value, me, header);
          // Paste
          if (KEY_V == _e.keyCode && me.watchCtrlKey) {
            // const pastedArray = pasteProcess(insertField.value); //str.split(/\r?\n/);
            // console.log('pastedArray', pastedArray);
            const str = insertField.value;
            for (let index = 0; index < str.length; index++) {
              const element = str[index];
              console.log(element,str.charCodeAt(index));
            }
          }
        });
        insertField.addEventListener("keydown", (_e) => {
          // Ctrl
          if (CTRL == _e.keyCode) me.watchCtrlKey = true;
          // Esc
          if (ESC == _e.keyCode) _cellHandler.onblur_cursor(_e, me);
          // Tab
          if (TAB == _e.keyCode) _cellHandler.onkeydown_cursorTab(_e, insertField.value, me, header);
          // Left
          if (LEFT_ARROW == _e.keyCode && 0 == _e.target.selectionStart) _cellHandler.onkeydown_cursorPreCell(_e, insertField.value, me, header);
          // Right
          if (RIGHT_ARROW == _e.keyCode && _e.target.value.length == _e.target.selectionStart) _cellHandler.onkeydown_cursorNextCell(_e, insertField.value, me, header);
        });
        insertField.addEventListener("blur", (_e) => {
          _cellHandler.onblur_cursor(_e, me);
        });
      } else if (insertField.tagName == 'SELECT'){
        // tab key down
        insertField.addEventListener("keydown", (_e) => {
          // Esc
          if (ESC == _e.keyCode) _cellHandler.onblur_cursor(_e, me);
          // Tab
          if (TAB == _e.keyCode) _cellHandler.onkeydown_cursorTab(_e, insertField.value, me, header);
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

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // const obj = this.querySelector('input');

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CellController
}
