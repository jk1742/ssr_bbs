import { PanelNavBtnsController as Super} from "/layout/components/panel/navBtns/PanelNavBtnsController";

/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const PanelNavBtnsController = function (_panelNavBtnsHandler) {
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
  this.revealCheck();
  this.revealAlert();
  this.revealList();
  //? set tooltip
  this.check.setTooltip('check', 'bottom', '#555', 1, 0, 0);
  this.alert.setTooltip('alert', 'bottom', '#555', 1, 0, 0);
  this.list.setTooltip('list', 'bottom', '#555', 1, 0, 0);

  // Teacher.prototype = Object.create(Person.prototype);
  // Teacher.prototype.constructor = Teacher;
  // //* End of Structure ////////////////////////////////////////////////////////
  return this;
}

export {
  PanelNavBtnsController
};
