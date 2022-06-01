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
  // Object.assign(this, {
  //   select(){
  //     me.style.backgroundColor = "red";
  //   },
  // });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  this.onchange = (_e) => {
    if ('undefined' !== typeof _inputHandler.onchange_input) _inputHandler.onchange_input(_e, me.value);
  }
  this.onfocusout = (_e) => {
    if ('undefined' !== typeof _inputHandler.onfocusout_input) _inputHandler.onfocusout_input(_e, me.value);
  }

  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  InputController
};
