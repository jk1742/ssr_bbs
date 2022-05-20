import { FilterBarController as Super } from "/layout/components/panel/filterBar/FilterBarController";

/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const SearchBarController = function (_searchBarHandler) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  SearchBarController.prototype = Object.create(Super.prototype);
  SearchBarController.prototype.constructor = SearchBarController;


  //* private variable ////////////////////////////////////////////////////////


  //* Access Control: getter & setter /////////////////////////////////////////


  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    adaptFilter(_e, carriage) {
      if ('undefined' !== typeof _searchBarHandler.onclick_adaptFilter) _searchBarHandler.onclick_adaptFilter(_e, carriage);
    },
    resetFilter(_e){
      if ('undefined' !== typeof _searchBarHandler.onclick_resetFilter) _searchBarHandler.onclick_resetFilter(_e);
    }
  });


  //* Lazy Initialization /////////////////////////////////////////////////////
  //! keep sequence
  this.appendHeader('Search');
  this.appendFilter('HS Code', 'hsCode', 'fas fa-book', 'width:30%;');
  this.appendFilter('FTA Code', 'ftaCode','fa-solid fa-globe', 'width:30%;');
  this.appendFooter();


  // //* End of Structure /////////////////////////////////////////////////////
  return this;
}

export {
  SearchBarController
};
