/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const CmdAdsController   = function(cmdAdsHandler) {

  // private variable & mapping ////////////////////////////////////////////////
  const me              = this;
  const ad              = me.childNodes[0];
  //const ad              = me.childNodes[0];
  
  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   timefactor: {
  //     get: () => c,
  //   }
  // });

  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // offForward(){
    //   forward.style.display = "none";
    // },
  });

  // Event handler /////////////////////////////////////////////////////////////
  ad.onclick = (e) => {
    console.log('CmdAdsController',ad);
    if('undefined' !== typeof cmdAdsHandler.onclick_ad) cmdAdsHandler.onclick_ad(e);
  }

  // Lazy Initialization ///////////////////////////////////////////////////////

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  CmdAdsController
};
