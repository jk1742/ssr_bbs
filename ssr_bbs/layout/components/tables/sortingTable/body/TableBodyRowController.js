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

  //* private variable & mapping ////////////////////////////////////////////////
  let   me            = this;
  const data          = array;
  let   rowNum        = Number(me.children[1].textContent);
  let   idList        = [];


  //* Privilege Static Functions ////////////////////////////////////////////////
  const setIdList = function(){
    let carriage = [];
    for (const element of header) {
      carriage.push(element.id);
    }
    return carriage;
  }


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    data: {
      get: () => data
    },
    rowNum: {
      get: () => rowNum
    }
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    getDataByName (name) {
      return array[idList.indexOf(name)];
    },
    changeCells(seq, o){
      //* data change
      this.data[seq] = o;
      //* render
      const pos  = seq;
      if('undefined' !== typeof tableBodyRowHandler.changeTableCells) tableBodyRowHandler.changeTableCells(idList[seq], pos, o, me.childNodes[pos]);
    },
    select(){
      me.style.backgroundColor = "red";
    },
  });
  me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  this.onclick = (e) => {
    if('undefined' !== typeof tableBodyRowHandler.onclick_row) tableBodyRowHandler.onclick_row(e, this.id, this.rowNum, this, array);
  }
  this.ondblclick = (e) => {
    if ('undefined' !== typeof tableBodyRowHandler.ondbclick_row) tableBodyRowHandler.ondbclick_row(e, this.id, this.rowNum, this, array);
  }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  idList = setIdList();

  for (let index = 0; index < header.length; index++){
    const element = header[index];
    if ('undefined' !== element.display && 'none' === element.display) me.children[index + 1].style.display = 'none';
  }


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TableBodyRowController
};
