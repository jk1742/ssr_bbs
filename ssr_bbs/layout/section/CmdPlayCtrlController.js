import { CmdPlayCtrlController as Super }     from '/layout/components/cmdPlayCtrl/CmdPlayCtrlController';

/***
 * layout:  EditTopBarController control buttons
 ***/
// Describe EditTopBarController layout below
const CmdPlayCtrlController   = function(cmdPlayCtrlHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, cmdPlayCtrlHandler);

  // public function ///////////////////////////////////////////////////////////
  Object.assign(this, {
    // trigger_onclickBtnSelect(){
    //   btnSelect.onclick();
    // },
  }, Super.prototype);

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CmdPlayCtrlController
};
