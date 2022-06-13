import { SelectController as Super } from "/layout/components/form/select/SelectController";

/**
 * SelectController
 * @constructor
 * @param {[Function]} _handler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 */
const SelectController = function (_handler, _header, _json) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  SelectController.prototype = Object.create(Super.prototype);
  SelectController.prototype.constructor = SelectController;


  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const select        = this.getModelByDataClass('input-field')[0];


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
  select.addEventListener("change", (_e) => {
    if ('undefined' !== typeof _handler.onchange_input) _handler.onchange_input(_e, select.value);
  });
  select.addEventListener("click", (_e) => {
    console.log('select.addEventListener.click');
  });

  //* Lazy Initialization ///////////////////////////////////////////////////////
  // get axios values by networks
  const response = [
    { label: 'BD 50', value: 'BD50' }, { label: 'CTH', value: 'CTH' }, { label: 'NC 41.66', value: 'NC41.66' }
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
