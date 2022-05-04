import { PanelNavBtnsController as Super} from "/layout/components/panel/navBtns/PanelNavBtnsController";

/***
 * layout:  PanelNavBtnsController control buttons
 ***/
const PanelNavBtnsController = function (panelNavBtnsHandler) {
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
  this.revealWrite();
  this.revealCheck();
  this.revealAlert();

  this.write.setTooltip('write', 'bottom', '#555', 1, 0, 0);
  this.check.setTooltip('check', 'bottom', '#555', 1, 0, 0);
  this.alert.setTooltip('alert', 'bottom', '#555', 1, 0, 0);

  // //* End of Structure ////////////////////////////////////////////////////////
  return this;
}

export {
  PanelNavBtnsController
};
