/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { TableBodyRow           } from '/layout/components/tables/sortingTable/body/TableBodyRow';
import { TableBodyRowController } from '/layout/components/tables/sortingTable/body/TableBodyRowController';

/**
 * Layout:  TableBodyController
 * @constructor
 * @param {[Function]} tableBodyHandler
 * @param {*} header
 * @returns
 */
const TableBodyController   = function (tableBodyHandler, header) {

  //* Private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  let   rows          = [];

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
        const row = new TableBodyRow(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.appendChild(row);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const row = $SR.registerModel(arrTemp[i], true).inject(TableBodyRowController, {
          onclick_row(_e, _id, _rowNum, _element, _data){
            if ('undefined' !== typeof tableBodyHandler.onclick_row) tableBodyHandler.onclick_row(_e, _id, _rowNum, _element, _data);
          },
          ondbclick_row(_e, _id, _rowNum, _element, _data){
            if ('undefined' !== typeof tableBodyHandler.ondbclick_row) tableBodyHandler.ondbclick_row(_e, _id, _rowNum, _element, _data);
          },
          changeTableCells(name, pos, data, dom){
            if('undefined' !== typeof tableBodyHandler.changeTableCells) tableBodyHandler.changeTableCells(name, pos, data, dom);
          }
        }, array[posErsHead], header);
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
        const row = new TableBodyRow(me.id, rowNum, 'row','data', array[i]);
        arrTemp.push(row);
        me.insertBefore(row, me.childNodes[i-1]);
      }
      //* inject controller
      for (let i = 0; i < arrTemp.length; i++) {
        const posErsHead = i+1;
        const row = $SR.registerModel(arrTemp[i], true).inject(TableBodyRowController, {
          onclick_row(_e, _id, _rowNum, _element, _data) {
            if ('undefined' !== typeof tableBodyHandler.onclick_row) tableBodyHandler.onclick_row(_e, _id, _rowNum, _element, _data);
          },
          ondbclick_row(_e, _id, _rowNum, _element, _data) {
            if ('undefined' !== typeof tableBodyHandler.ondbclick_row) tableBodyHandler.ondbclick_row(_e, _id, _rowNum, _element, _data);
          },
          changeTableCells(name, pos, data, dom){
            if('undefined' !== typeof tableBodyHandler.changeTableCells) tableBodyHandler.changeTableCells(name, pos, data, dom);
          }
        }, array[posErsHead], header);
      }
      rows = me.childNodes;
    }
  });


  //* Event handler /////////////////////////////////////////////////////////////
  this.onwheel =(e)=>{
    if ('undefined' !== typeof tableBodyHandler.onmousewheel_tbody) tableBodyHandler.onmousewheel_tbody(e);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////

  
  //* End of Structure //////////////////////////////////////////////////////////
  return this;
};
export {
  TableBodyController
};
