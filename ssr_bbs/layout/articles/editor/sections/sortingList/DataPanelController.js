/***
 * block:  DataPanelController
 ***/
// Describe constant Class below
const DataPanelController   = function(_handler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  console.log('DataPanelController', this);

  //* Privilege Static Functions //////////////////////////////////////////////


  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // subject:{
    //   get: () => me.subject,
    //   enumerable:true
    // },
  });


  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    // setViewFilter(arr){
    //   let carriage = ['None'].concat(arr);
    //   viewerSelect.generateList(carriage);
    // },
    // trigger_onclickViewer(){
    //   viewerIcon.onclick();
    // },
    // setTooltipAdd(msg, outline, color, opacity, width, height){
    //   tooltipAdd = {msg:msg, outline:outline, color:color, opacity:opacity, width:width, height:height};
    // }
  });


  //* Event handler ///////////////////////////////////////////////////////////


  //* inject controller ///////////////////////////////////////////////////////
  // $SR.registerModel(toolTip).inject(ToolTipController, {});


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  DataPanelController
}
