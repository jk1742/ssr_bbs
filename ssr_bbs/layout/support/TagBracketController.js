/***
 * controller:  TagBracketController
 ***/
// Describe TagBracketController Class below
const TagBracketController    = function (tagBracketHandler) {

  // private variable //////////////////////////////////////////////////////////

  // mapping ///////////////////////////////////////////////////////////////////
  const me                = this;
  const banner            = me.childNodes[1];
  const imgBanner         = banner.firstChild;
  // console.log('TagBracketController', banner);

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    bannerSource: {
      get:()  => imgBanner.src,
      set:(o) => imgBanner.src = o
    },
  });

  // Access Controls: public functions /////////////////////////////////////////
  Object.assign(this, {

  });

  // inject controller /////////////////////////////////////////////////////////


  // Lazy Initialization ///////////////////////////////////////////////////////

  // Event handler /////////////////////////////////////////////////////////////
  // store.onStoreItemAppended = function(e){
  //   const name = e.detail.text();
  //   console.log(`ToasterController.store.onStoreItemAppended ${name}:${store.call(name)}`, store.call('currentPage'));
  // }

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  TagBracketController
};
