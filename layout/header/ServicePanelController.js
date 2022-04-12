/***
 * controller:  ToasterController
 ***/
// Describe ToasterController Class below
const ServicePanelController    = function (servicePanelHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me                = this;
  let   subText           = 'Start';
  const atvSimulator      = me.firstChild;
  const atvSimulatorSub   = atvSimulator.firstChild;
  const tutorial          = me.childNodes[1];
  const support           = me.lastChild;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   selectedPtcls: {
  //     get:()=> _.cloneDeep(selectedPtcls),
  //     set:(o) => selectedPtcls = _.cloneDeep(o),
  //   },
  // });

  // Access Controls: public functions /////////////////////////////////////////
  // Object.assign(this, {
  //   updatePopCnt(o){
  //     editBotBar.updatePopCnt(o);
  //   }
  // });

  // inject controller /////////////////////////////////////////////////////////
  //let servicePanel        = $SR.View('Header-ServicePanel').inject(ServicePanelController, {});

  // Lazy Initialization ///////////////////////////////////////////////////////
  atvSimulator.style.letterSpacing  = '2px';
  support.style.letterSpacing       = 'nomal';
  support.style.backgroundColor     = '#f44336';
  tutorial.style.backgroundColor     = '#708090';
  atvSimulatorSub.innerHTML         = subText;

  // Event handler /////////////////////////////////////////////////////////////
  atvSimulator.onclick = function(e){
    subText = 'Continue';
    atvSimulator.style.letterSpacing  = '0px';
    atvSimulatorSub.innerHTML = subText;
    if('undefined' !== typeof servicePanelHandler.onclick_atvSimulator) servicePanelHandler.onclick_atvSimulator(e);
  }
  support.onclick = function(e){
    if('undefined' !== typeof servicePanelHandler.onclick_support) servicePanelHandler.onclick_support(e);
  }
  tutorial.onclick = function(e){
    window.open('https://www.youtube.com/watch?v=03xXSFmsztI', '_blank').focus();
    if('undefined' !== typeof servicePanelHandler.onclick_tutorial) servicePanelHandler.onclick_tutorial(e);
  }

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ServicePanelController
};
