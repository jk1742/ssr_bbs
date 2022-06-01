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
  let   me            = this;

  const _private       = {
    cellValue: _cellValue
  };

  //* Privilege Static Functions ////////////////////////////////////////////////
  const onchange_input = (_e, _value) => {
    _cellHandler.onchange_cell(_e, me, _value, header);
  }
  const onfocusout_input = (_e, _value) => {
    console.log('onfocusout_input', me.cellValue != _value, me.cellValue, _value);
    if(me.cellValue != _value) {
      _cellHandler.onchange_cell(_e, me, _value, header);
    } else {
      me.innerHTML = me.cellValue;
    }
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    cellValue: {
      get: () => _private.cellValue,
      set: (o) => { _private.cellValue = o }
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    insertEditor(){
      me.innerHTML = '';
      if (header.editor) {
        let _dom = header.editor.dom.cloneNode(true);
        this.append(_dom);
        _dom = $SR.registerModel(_dom).inject(header.editor.controller, { onchange_input: onchange_input, onfocusout_input:onfocusout_input }, header, rowJson);
        console.log('insertEditor', header.editor.controller);
        _dom.value = me.cellValue;
      } else {
        const input = new Input();
        this.append(input);
        $SR.registerModel(input).inject(InputController, {
          onchange_input, onfocusout_input
        });
        input.value = me.cellValue;
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
    // me.innerHTML = '';
    // if (header.editor) {
    //   let _dom = header.editor.dom.cloneNode(true);
    //   this.append(_dom);
    //   _dom = $SR.registerModel(_dom).inject(header.editor.controller, { onchange_input, onfocusout_input }, header, rowJson);
    //   _dom.value = me.cellValue;
    // } else {
    //   const input = new Input();
    //   this.append(input);
    //   $SR.registerModel(input).inject(InputController, {
    //     onchange_input, onfocusout_input
    //   });
    //   input.value = me.cellValue;
    // }
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CellController
};
