/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Row           } from './Row';
import { RowController } from './RowController';

/**
 * Layout:  BodyController
 * @constructor
 * @param {[Function]} _bodyHandler
 * @param {*} header
 * @returns
 */
const BodyController   = function (_bodyHandler, header) {

  //* Private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  let   rows          = [];
  const rowHandler    = {
    onclick_row(_e, _id, _rowNum, _element, _data) {
      if ('undefined' !== typeof _bodyHandler.onclick_row) _bodyHandler.onclick_row(_e, _id, _rowNum, _element, _data);
    },
    ondbclick_row(_e, _id, _rowNum, _element, _data) {
      if ('undefined' !== typeof _bodyHandler.ondbclick_row) _bodyHandler.ondbclick_row(_e, _id, _rowNum, _element, _data);
    },
    onclick_cell(_e, _id, _rowNum, _element, _header) {
      if ('undefined' !== typeof _bodyHandler.onclick_cell) _bodyHandler.onclick_cell(_e, _id, _rowNum, _element, _header);
    },
    ondblclick_cell(_e, _id, _rowNum, _element, _header) {
      if ('undefined' !== typeof _bodyHandler.ondblclick_cell) _bodyHandler.ondblclick_cell(_e, _id, _rowNum, _element, _header);
    },
    onchange_cell(_e, _element, _rowNum, _value, _header) {
      if ('undefined' !== typeof _bodyHandler.onchange_cell) _bodyHandler.onchange_cell(_e, _element, _rowNum, _value, _header);
    }
  }

  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    rows: {
      get: ()   => rows,
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    generateRows (array, page) {
      rows = [];
      const arrTemp = [];
      //* draw row
      let rowNum = page.startNum;
      for (let i = 1; i < array.length; i++) {
        rowNum = rowNum + 1;
        const row = new Row(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.appendChild(row);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const row = $SR.registerModel(arrTemp[i], true).inject(RowController, rowHandler, array[posErsHead], header);
      }
      rows = me.childNodes;
    },
    generateRvrsRows (array, page) {
      rows = [];
      const arrTemp = [];
      //* draw row 
      let rowNum = page.startNum;
      for (let i = 1; i < array.length; i++) {
        rowNum = rowNum + 1;
        const row = new Row(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.insertBefore(row, me.childNodes[i-1]);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const row = $SR.registerModel(arrTemp[i], true).inject(RowController, rowHandler, array[posErsHead], header);
      }
      rows = me.childNodes;
    }
  });



  //* Event handler /////////////////////////////////////////////////////////////
  this.onwheel =(e)=>{
    if ('undefined' !== typeof _bodyHandler.onmousewheel_tbody) _bodyHandler.onmousewheel_tbody(e);
  }
  this.addEventListener("dblclick", (_e) => {
    if ('undefined' !== typeof _bodyHandler.ondblclick_tbody) _bodyHandler.ondblclick_tbody(_e);
  });

  //* Lazy Initialization ///////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
};
export {
  BodyController
};
