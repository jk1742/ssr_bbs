/* eslint-disable no-unused-vars */

/**
 * FileInputController
 * @constructor
 * @param {[Function]} _handler
 * @param {[Array]} array
 * @param {*} header
 * @returns
 * * logic
 * https://curryyou.tistory.com/252
 * http://jsfiddle.net/thzytf1w/2/
 * 
 * const fileInput = document.querySelector('#file-js-example input[type=file]');
  fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
      const fileName = document.querySelector('#file-js-example .file-name');
      fileName.textContent = fileInput.files[0].name;
    }
  }
 */
const FileInputController = function (_handler) {

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const $input = this.querySelector('input[type=file]');
  console.log($input);

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
  // Object.assign(this, {
  //   appendToOven: (label, value) => {
  //     oven.push({
  //       label: label,
  //       value: value
  //     });
  //   },
  // });
  // me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  $input.onchange = () => {
    if ($input.files.length > 0) {
      const fileName = this.querySelector('span.file-name');
      fileName.textContent = $input.files[0].name;
    }
  }

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
  FileInputController
}
