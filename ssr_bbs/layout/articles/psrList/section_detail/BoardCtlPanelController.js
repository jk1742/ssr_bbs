import { IconBoxController as Super} from "/layout/components/panel/iconBox/IconBoxController";

/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const BoardCtlPanelController = function (_boardCtlPanelHandler) {

  //* Inheritance /////////////////////////////////////////////////////////////
  Super.call(this);
  BoardCtlPanelController.prototype = Object.create(Super.prototype);
  BoardCtlPanelController.prototype.constructor = BoardCtlPanelController;

  //* private variable ////////////////////////////////////////////////////////

  //* Access Control: getter & setter /////////////////////////////////////////
  // Object.defineProperties(this, {
  //   left: { get: () => left },
  // });

  //* Access control: Public functions ////////////////////////////////////////


  //* Lazy Initialization /////////////////////////////////////////////////////
  this.appendToOven('fa-solid fa-brain');
  this.appendToOven('fa-solid fa-briefcase');
  this.appendToOven('fa-solid fa-lock');
  this.bake();
  //! Bake first before paint.
  this.adaptStyleAllBtns('is-primary', 'is-inverted');
  this.classList.add('has-text-right');


  console.log(' board', this.getData('Section_detailController'));
  // //* End of Structure ////////////////////////////////////////////////////////
  return this;
}

export {
  BoardCtlPanelController
}
