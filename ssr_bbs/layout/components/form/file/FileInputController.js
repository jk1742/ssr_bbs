/* eslint-disable no-unused-vars */

/**
 * FileInputController
 * @constructor
 * @param {[Function]} _handler
 * @public name
 * @public label
 * @public icon
 * @public files
 * @returns
 */
const FileInputController = function (_handler) {

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const $input        = this.querySelector('input[type=file]');


  //* Privilege Static Functions ////////////////////////////////////////////////
  const onChangeHasFileName = function(_e){
    if ($input.files.length > 0) {
      const fileName = me.querySelector('span.file-name');
      fileName.textContent = $input.files[0].name;
    }
    commonOnChange(_e);
  }
  const onChangeDefault = function (_e) {
    commonOnChange(_e);
  }
  const commonOnChange = function(_e){
    if ('undefined' !== typeof _handler.onchange_fileInput) _handler.onchange_fileInput();
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    name: {
      get: () => {
        const carriage = me.querySelector('span.file-name');
        if (!_.isNull(carriage)) return carriage.textContent;
      },
      set: (o) => {
        const carriage = me.querySelector('span.file-name');
        if (!_.isNull(carriage)) {
          carriage.innerHTML = '';
          carriage.append(document.createTextNode(o));
        }
      }
    },
    label: {
      get: () => {
        const carriage = me.querySelector('span.file-label');
        if (!_.isNull(carriage)) return carriage.textContent;
      },
      set:(o) => {
        const carriage = me.querySelector('span.file-label');
        if (!_.isNull(carriage)){
          carriage.innerHTML = '';
          carriage.append(document.createTextNode(o));
        }
      }
    },
    icon: {
      get: () => {
        return me.querySelector('span.file-icon').children[0].className;
      },
      set: (o) => {
        const carriage = me.querySelector('span.file-icon');
        carriage.innerHTML = '';
        const fileIcon = document.createElement('I');
        carriage.append(fileIcon);
        fileIcon.className = o;
      }
    },
    files:{
      get: () => $input.files
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    csvToJSON: (csv_string, newline, cell) => {
      const rows = csv_string.split(newline);
      const jsonArray = [];
      const header = rows[0].split(cell);
      for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let row = rows[i].split(cell);
        for (let j = 0; j < header.length; j++) {
          obj[header[j]] = row[j];
        }
        jsonArray.push(obj);
      }
      return jsonArray;
    },
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  let changeEvent;
  changeEvent = onChangeDefault;
  if (this.classList.contains('has-name')) changeEvent = onChangeHasFileName;
  $input.addEventListener('change', changeEvent);


  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  FileInputController
}
