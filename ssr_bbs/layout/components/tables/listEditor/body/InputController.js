/* eslint-disable no-unused-vars */

/**
 * InputController
 * @constructor
 * @param {[Function]} _inputHandler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const InputController = function (_inputHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;


  //* Privilege Static Functions ////////////////////////////////////////////////
  // const setIdList = function(){
  //   let carriage = [];
  //   for (const element of header) {
  //     carriage.push(element.id);
  //   }
  //   return carriage;
  // }


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
    // },
    // onfocusout_this(_e, _value) {
    //   if ('undefined' !== typeof _inputHandler.onchange_input) _inputHandler.onfocusout_input(_e, _value);
    // },
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  // normal mouse active mouse left button down
  this.addEventListener("mousedown", (_e) => {
    _e.stopPropagation();
  });
  // normal mouse active mouse left button up
  this.addEventListener("mouseup", (_e) => {
    _e.stopPropagation();
  });


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  InputController
}
