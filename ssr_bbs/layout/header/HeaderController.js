/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import view block with controller
import { ServicePanelController     } from '/layout/header/ServicePanelController';
// import background img
import HeaderBG from '/static/img/bg_ship_container_1024x524.jpg';

/**
 * Controller:  ToasterController
 * @param {[Function]} headerHandler
 * @returns
 */
const HeaderController    = function (headerHandler) {


  // private variable & mapping ////////////////////////////////////////////////
  let   me                = this;
  let   history           = $SR.History.getInstance('PageHistory');


  // Privilige Static Functions ////////////////////////////////////////////////


  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   screenImage: {
  //     get:()=> screenImage,
  //   },
  // });


  // Access Controls: public functions /////////////////////////////////////////
  Object.assign(this, {
    activateSection(){
      history.append('Header');
      $SR.moveScreen(this);
    }
  });


  // inject controller /////////////////////////////////////////////////////////
  let servicePanel        = $SR.View('Header-ServicePanel').inject(ServicePanelController, {
    onclick_atvSimulator  :(e) => {
      if('undefined' !== typeof headerHandler.simulator_activateSection) headerHandler.simulator_activateSection(e);
    },
    onclick_support       :(e) => {
      if('undefined' !== typeof headerHandler.support_activateSection) headerHandler.support_activateSection(e);
    }
  });


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage = "url(" + HeaderBG + ")";
  history.append('Header');


  // Event handler /////////////////////////////////////////////////////////////
  // store.onStoreItemAppended = function(e){
  //   const name = e.detail.text();
  //   console.log(`ToasterController.store.onStoreItemAppended ${name}:${store.call(name)}`, store.call('currentPage'));
  // }

  
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  HeaderController
};
