/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// import view block with contorller
import { ChapterInfoController    } from '/layout/components/chapterInfo/ChapterInfoController';
import { CmdSysFormalController   } from '/layout/support/CmdSysFormalController';
import { ContentsController       } from '/layout/support/ContentsController';
// images
import imgWebpack     from '/static/img/support/bannerWebpack.svg';
import imgSSR         from '/static/img/support/bannerSSR.png';
import imgSpring      from '/static/img/support/bannerSpring.svg';
import screenImage    from '/static/img/headerBG1.jpg';


/***
 * controller:  SupportController
 ***/
// Describe SupportController Class below
const SupportController    = function (supportHandler) {


  // private variable & mapping ////////////////////////////////////////////////
  let   me                = this;
  let   history           = $SR.History.getInstance('PageHistory');


  // Privilige Static Functions ////////////////////////////////////////////////


  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   selectedPtcls: {
  //     get:()=> _.cloneDeep(selectedPtcls),
  //     set:(o) => selectedPtcls = _.cloneDeep(o),
  //   },
  // });


  // Access Controls: public functions /////////////////////////////////////////
  Object.assign(this, {
    activateSection(){
      history.append('Support');
      $SR.moveScreen(this);
    }
  });


  // inject controller /////////////////////////////////////////////////////////
  let chapterInfo         = $SR.View('Support-ChapterInfo').inject(ChapterInfoController, {});
  chapterInfo.subject     = 'SUPPORT US';
  let cmdSysFormal          = $SR.View('Support-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_undo      :(e)  => {
      supportHandler.undoNavigate(e, history.pre().value);
    }
  });
  let banners               = [
    {
      name:'SSR',
      src :imgSSR
    },{
      name:'Webpack',
      src :imgWebpack
    },{
      name:'Spring',
      src :imgSpring
    }
  ];
  let supportContents       = $SR.View('Support-Contents').inject(ContentsController, {});


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage = "url(" + screenImage + ")";
  supportContents.buildBanners(banners);


  // Event handler /////////////////////////////////////////////////////////////
  // store.onStoreItemAppended = function(e){
  //   const name = e.detail.text();
  //   console.log(`ToasterController.store.onStoreItemAppended ${name}:${store.call(name)}`, store.call('currentPage'));
  // }


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SupportController
};
