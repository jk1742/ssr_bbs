import { Section_01Controller } from '/layout/articles/sample1/section_01/Section_01Controller';
import { Section_02Controller } from '/layout/articles/sample1/section_02/Section_02Controller';

/***
 * block:  ArticleController
 ***/
// Describe constant Class below
const ArticleController   = function(_articleHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private          = {};
  const namePlate         = this.getElementsByTagName('h3')[0];

  //* Privilege Static Functions //////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //   }
  // }

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    subject:{
      get: () => namePlate.innerText,
      enumerable:true
    },
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
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  let section_01 = $SR.View(this.id + '-Section_01').inject(Section_01Controller, {
    section02_activateSection(e){
      section_02.activateSection();
    }
  });
  let section_02 = $SR.View(this.id + '-Section_02').inject(Section_02Controller, {
    section01_activateSection(e) {
      section_01.activateSection();
    }
  });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';
  // console.log('fire article Section-01', section_01.id);


  //* End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ArticleController
};
