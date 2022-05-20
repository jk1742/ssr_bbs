import { DynamicBoxController as Super } from "/layout/components/panel/dynamicBox/DynamicBoxController";


/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const TopNavBtnsController = function (_topNavBtnsHandler) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  TopNavBtnsController.prototype = Object.create(Super.prototype);
  TopNavBtnsController.prototype.constructor = TopNavBtnsController;


  //* private variable ////////////////////////////////////////////////////////


  //* Access Control: getter & setter /////////////////////////////////////////


  //* Access control: Public functions ////////////////////////////////////////


  //* Lazy Initialization /////////////////////////////////////////////////////
  //! keep sequence
  this.appendToOven('fa-solid fa-magnifying-glass');
  this.appendToOven('fa-solid fa-arrow-rotate-left');
  this.bake();
  //! Bake first before paint.
  this.adaptStyleAllBtns('is-primary', 'is-inverted');
  this.classList.add('has-text-right');
  //! set tooltip
  //? fa-arrow-rotate-left => arrowRotateLeft
  this.arrowRotateLeft.setTooltip('deselect all', 'bottom', '#555', 1, 0, 0);
  this.magnifyingGlass.setTooltip('search', 'bottom', '#555', 1, 0, 0);


  // //* End of Structure ////////////////////////////////////////////////////////
  return this;
}

export {
  TopNavBtnsController
};
