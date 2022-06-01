/* eslint-disable no-unused-vars */

/**
 * SelectController
 * @constructor
 * @param {[Function]} _handler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const SelectController = function (_handler) {

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const select        = me.firstChild;
  const oven          = [];


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
    appendToOven: (label, value) => {
      oven.push({
        label: label,
        value: value
      });
    },
    bake(){
      oven.forEach(element => {
        const option = document.createElement("OPTION");
        option.innerHTML = element.label;
        option.value = element.value;
        select.append(option);
      });
    },
    getValue(){
      return select.value;
    }
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  select.onchange = (_e) => {
    if ('undefined' !== typeof _handler.onchange_input) _handler.onchange_input(_e, select.value);
  }
  select.addEventListener("focusout", (_e) => {
    if ('undefined' !== typeof _handler.onfocusout_input) _handler.onfocusout_input(_e, select.value);
  });


  //* Lazy Initialization ///////////////////////////////////////////////////////
  // example
  // const response = [
  //   { label: 'BD 40', value: 'BD40' }, { label: 'CTH', value: 'CTH'}
  // ]
  // for (const iterator of response) {
  //   me.appendToOven(iterator.label, iterator.value);
  // }
  // me.bake();


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SelectController
}
