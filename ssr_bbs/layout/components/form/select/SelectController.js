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
  //   eventCarriage: {
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
    },
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////


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
