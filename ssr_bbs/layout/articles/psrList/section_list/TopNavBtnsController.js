import { DynamicBoxController as Super } from "/layout/components/panel/dynamicBox/DynamicBoxController";


/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const TopNavBtnsController = function (_topNavBtnsHandler) {
  //* private variable ////////////////////////////////////////////////////////

  //* Access Control: getter & setter /////////////////////////////////////////
  // Object.defineProperties(this, {
  //   left: { get: () => left },
  // });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, Super.prototype);

  //* Inheritance /////////////////////////////////////////////////////////////
  //! keep sequence
  Super.call(this);

  //* Lazy Initialization /////////////////////////////////////////////////////
  //! keep sequence
  this.appendToOven('fa-solid fa-marker');
  this.appendToOven('fa-solid fa-briefcase');
  this.appendToOven('fa-solid fa-lock');
  this.bake();
  //! Bake first before paint.
  this.adaptStyleAllBtns('is-primary', 'is-inverted');
  this.classList.add('has-text-right');

  // //* End of Structure ////////////////////////////////////////////////////////
  return this;
}

export {
  TopNavBtnsController
};
