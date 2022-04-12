import { SpeedIndcController as Super }     from '/layout/components/speedIndc/SpeedIndcController';

/***
 * layout:  EditTopBarController control buttons
 ***/
// Describe EditTopBarController layout below
const SpeedIndcController   = function(speedIndcHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, speedIndcHandler);

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
  SpeedIndcController
};
