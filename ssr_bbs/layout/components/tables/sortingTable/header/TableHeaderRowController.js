/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { TableHeaderDataController     } from '/layout/components/tables/sortingTable/header/TableHeaderDataController';

/***
 * Layout:  TableHeaderRowController
 ***/

//* Describe EntryList Class below
const TableHeaderRowController   = function (tableHeaderRowHandler, header) {

  //* private variable & mapping /////////////////////////////////////////////////
  const me            = this;
  const arrayHeaders  = me.getElementsByTagName('th');
  let   selectedId    = '';
  let   selectedType  = '';

  //* Privilege Static Functions ////////////////////////////////////////////////

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    selectedId: {
      get: ()   => selectedId,
      set: (o)  => {selectedId = o}
    },
    selectedType: {
      get: ()   => selectedType,
      set: (o)  => {selectedType = o}
    },
  });

  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onmouseover_btn (e) {
    //   console.log('onmouseover_btn');
    // }
  });

  //* Event handler /////////////////////////////////////////////////////////////
  // this.onclick = (e) => {
  //   if('undefined' !== typeof tableHeaderRowHandler.onclick_th) tableHeaderRowHandler.onclick_th(e, this.id);
  // }

  //* Lazy Initialization ///////////////////////////////////////////////////////
  for (let i = 1; i < arrayHeaders.length; i++) {
    const h = header[i-1];
    $SR.View(arrayHeaders[i].id).inject(TableHeaderDataController, {
      onclick_th(e, id){
        selectedId    = h.id;
        selectedType  = h.type;
        if('undefined' !== typeof tableHeaderRowHandler.stortingTable_sort) tableHeaderRowHandler.stortingTable_sort(e, selectedId, selectedType);
      }
    });
  }

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TableHeaderRowController
};
