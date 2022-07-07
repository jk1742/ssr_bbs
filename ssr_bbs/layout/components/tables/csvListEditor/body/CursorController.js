/* eslint-disable no-unused-vars */

/**
 * CursorController
 * @constructor
 * @param {[Function]} _handler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const CursorController = function (_handler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const KEY_V         = 86;
  const KEY_C         = 67;
  let   me            = this;


  //* Privilege Static Functions ////////////////////////////////////////////////
  /**
   * pasteProcess
   * @param {*} str
   * @returns 2d Array
   */
  const pasteProcess = (str) => {
    if (!(str.includes('\t') || str.includes('\n') || str.includes('\r'))) return false;
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
  // Object.defineProperties(this, {
  //   data: {
  //     get: () => data
  //   },
  // });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onchange_this(_e, _value){
    //   if ('undefined' !== typeof _inputHandler.onchange_input) _inputHandler.onchange_input(_e, _value);
    // }
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  this.addEventListener("keyup", (_e) => {
    // Paste => send to blur event when ctrl + v key combination
    if (KEY_V == _e.keyCode && _e.ctrlKey) {
      let pastedArray = pasteProcess(this.value);
      if (!pastedArray) pastedArray = [[this.value]];
      // send event to staticListEditor
      if ('undefined' !== typeof _handler.onkeyup_paste && pastedArray) _handler.onkeyup_paste(_e, pastedArray);
    }
    if (KEY_C == _e.keyCode && _e.ctrlKey) {
      if ('undefined' !== typeof _handler.onkeyup_copy) _handler.onkeyup_copy(_e);
    }
  });
  // this.addEventListener("keydown", (_e) => {});


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CursorController
}
