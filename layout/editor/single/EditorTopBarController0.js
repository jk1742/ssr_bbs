import { EditorTopBarController as Super}     from '/layout/components/editorTopBar/EditorTopBarController';
/***
 * layout:  EditTopBarController control buttons
 ***/
// Describe EditTopBarController layout below
const EditorTopBarController   = function(editTopBarHandler) {

  // Inheritance & private variable ////////////////////////////////////////////
  Super.call(this, editTopBarHandler);

  // public function ///////////////////////////////////////////////////////////
  Object.assign(this, {
    // trigger_onclickBtnSelect(){
    //   btnSelect.onclick();
    // },
  }, Super.prototype);

  // Lazy Initialization ///////////////////////////////////////////////////////
  this.offUpload();


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  EditorTopBarController
};
