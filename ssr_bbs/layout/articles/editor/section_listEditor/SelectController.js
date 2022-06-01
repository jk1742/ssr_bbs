import { SelectController as Super } from "/layout/components/form/select/SelectController";

/**
 * SelectController
 * @constructor
 * @param {[Function]} _handler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const SelectController = function (_handler, header, json) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  SelectController.prototype = Object.create(Super.prototype);
  SelectController.prototype.constructor = SelectController;


  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  console.log('SelectController',_handler);


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
  //   appendToOven: (label, value) => {}},
  // });
  // me = this;


  //* Event handler /////////////////////////////////////////////////////////////


  //* Lazy Initialization ///////////////////////////////////////////////////////
  // get axios values by networks
  const response = [
    { label: 'BD 40', value: 'BD40' }, { label: 'CTH', value: 'CTH'}
  ]
  for (const iterator of response) {
    me.appendToOven(iterator.label, iterator.value);
  }
  me.bake();


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SelectController
};
