/* eslint-disable no-unused-vars */
/**
 * Layout:  TableBodyRowController
 * @constructor
 * @param {[Function]} tableBodyRowHandler 
 * @param {[Array]} array 
 * @param {*} header 
 * @returns 
 */
const TableBodyRowController   = function (tableBodyRowHandler, array, header) {

  // private variable & mapping ////////////////////////////////////////////////
  const me            = this;
  const data          = array;
  let   rowNum        = Number(me.firstChild.textContent);
  let   idList        = [];
  

  // Privilige Static Functions ////////////////////////////////////////////////
  const setIdList = function(){
    let carriage = [];
    for (var i = 0; i < header.length; i++) {
      carriage.push(header[i].id);
    }
    return carriage;
  }


  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    data: {
      get: () => data
    },
    rowNum: {
      get: () => rowNum
    }
  });


  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    getDataByName (name) {
      return array[idList.indexOf(name)];
    },
    changeCells(seq, o){
      // data change
      this.data[seq] = o;
      // render
      const pos  = seq + 1;
      if('undefined' !== typeof tableBodyRowHandler.changeTableCells) tableBodyRowHandler.changeTableCells(idList[seq], pos, o, me.childNodes[pos]);
    },
    select(){
      me.style.backgroundColor = "red";
    }
  });


  // Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    if('undefined' !== typeof tableBodyRowHandler.onclick_row) tableBodyRowHandler.onclick_row(e, this.id, array);
  }
  this.ondblclick = (e) => {
    if('undefined' !== typeof tableBodyRowHandler.ondbclick_row) tableBodyRowHandler.ondbclick_row(e, this.id, array);
  }


  // Lazy Initialization ///////////////////////////////////////////////////////
  idList = setIdList();

  
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TableBodyRowController
};
