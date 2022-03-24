// import view block with contorller
import { TagBracket           } from '/layout/support/TagBracket';
import { TagBracketController } from '/layout/support/TagBracketController';
// import { CmdSysFormalController   } from '/layout/support/CmdSysFormalController';

/***
 * controller:  ToasterController
 ***/
// Describe ToasterController Class below
const ContentsController    = function (contentsHandler) {

  // private variable //////////////////////////////////////////////////////////
  // const tagBracket    = new TagBracket('Support-TagBracket');

  // mapping ///////////////////////////////////////////////////////////////////
  let   me                = this;
  let   contentsArray     = [];

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    contentsArray: {
      get:() => contentsArray
    },
    text:{
      set:(o) => {
        const text = document.createTextNode(o);
        me.appendChild(text);
      }
    }
  });

  // Access Controls: public functions /////////////////////////////////////////
  Object.assign(this, {
    buildBanners(array){
      array.forEach((item) => {
        const tagBracket    = new TagBracket('Support-TagBracket-' + item.name);
        me.appendChild(tagBracket);
      });
      array.forEach((item) => {
        const obj = $SR.View('Support-TagBracket-' + item.name).inject(TagBracketController, {});
        obj.bannerSource = item.src;
        contentsArray.push(obj);
      });
    }
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
  ContentsController
};
