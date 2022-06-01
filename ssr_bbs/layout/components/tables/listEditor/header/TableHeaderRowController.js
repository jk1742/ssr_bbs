/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { TableHeaderDataController     } from './TableHeaderDataController';

/***
 * Layout:  TableHeaderRowController
 ***/

//* Describe EntryList Class below
const TableHeaderRowController   = function (tableHeaderRowHandler, header) {

  //* private variable & mapping /////////////////////////////////////////////////
  const arrayHeaders  = this.getElementsByTagName('th');
  const asteriskTh    = arrayHeaders[0];
  const _private      = {
        allSwitch   : false,
        selectedId  : '',
        selectedType: ''
  };


  //* Privilege Static Functions ////////////////////////////////////////////////


  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    selectedId: {
      get: () => _private.selectedId,
      set: (o) => {_private.selectedId = o},
      enumerable: true, configurable: true
    },
    selectedType: {
      get: () => _private.selectedType,
      set: (o) => {_private.selectedType = o},
      enumerable: true, configurable: true
    },
    allSwitch: {
      get: () => _private.allSwitch,
      set: (o) => { if(typeof o === 'boolean') _private.allSwitch = o },
      enumerable: true, configurable: true
    },
  });


  //* Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    toggleAll () {
      if(!this.allSwitch) this.allSwitch = true;
      else this.allSwitch = false;
      return this.allSwitch;
    }
  });
  const me = this;


  //* Event handler /////////////////////////////////////////////////////////////
  asteriskTh.onclick = (e) => {
    if ('undefined' !== typeof tableHeaderRowHandler.onclick_asteriskTh) tableHeaderRowHandler.onclick_asteriskTh(e, asteriskTh);
  }


  //* Lazy Initialization ///////////////////////////////////////////////////////
  for (let i = 2; i < arrayHeaders.length; i++) {
    const h = header[i - 1];
    $SR.View(arrayHeaders[i].id).inject(TableHeaderDataController, {
      onclick_th(e, id){
        me.selectedId    = h.id;
        me.selectedType  = h.type;
        if ('undefined' !== typeof tableHeaderRowHandler.stortingTable_sort) tableHeaderRowHandler.stortingTable_sort(e, me.selectedId, me.selectedType);
      }
    });
  }


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TableHeaderRowController
};
