import { CmdSysFormalController as Super }     from '/layout/components/cmdSysFormal/CmdSysFormalController';

/***
 * layout:  EditTopBarController control buttons
 ***/
//* Describe EditTopBarController layout below
const CmdSysFormalController   = function(cmdSysFormalHandler) {

  //* Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, cmdSysFormalHandler);

  //* public function ///////////////////////////////////////////////////////////
  Object.assign(this, {
    // trigger_onclickBtnSelect(){
    //   btnSelect.onclick();
    // },
  }, Super.prototype);

  //* Lazy Initialization ///////////////////////////////////////////////////////
  this.onUndo();
  this.onConfirm();
  this.onAlert();
  this.setTooltipUndo('pervious page', 'bottom', '#555', 1, 0);
  this.setTooltipUpload('upload', 'bottom', '#555', 1, 0);
  this.setTooltipConfirm('confirm', 'bottom', '#555', 1, 0);
  this.setTooltipAlert('alert', 'bottom', '#555', 1, 0);

  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CmdSysFormalController
};
