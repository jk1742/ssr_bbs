import { CmdSysFormalController } from '/layout/articles/sample1/section_list/CmdSysFormalController';
import { PanelNavBtnsController } from '/layout/components/panel/navBtns/PanelNavBtnsController';
import { SubjectController } from '/layout/components/panel/subject/SubjectController';

/***
 * block:  Section_listController
 ***/
// Describe constant Class below
const Section_listController = function (section_listHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _me                   = this;
  const _private              = {};
  const contents              = this.firstChild;
  const frameTop              = contents.children[0];
  let subject                 = frameTop.firstChild.children[0];
  let panelNavBtns            = frameTop.firstChild.children[1];
  let sectionEvent            = $SR.Event.register('SectionChange');
  let queueEvent              = $SR.Queue.getInstance();

  //* Privilege Static Functions //////////////////////////////////////////////

  //* Access Control: getter & setter /////////////////////////////////////////
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    // activateSection() {
    //   queueEvent.push({
    //     id: this.id
    //   });
    //   const y = this.getBoundingClientRect().top + window.scrollY;
    //   console.log(this.getBoundingClientRect(), window.scrollY, y);
    //   $SR.moveScreen(this);
    // }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  subject = $SR.registerModel(subject).inject(SubjectController, {});
  // panelNavBtns = $SR.registerModel(panelNavBtns).inject(PanelNavBtnsController,{});
  subject.subjectValue = 'Sample List Page';

  // panelNavBtns.down.onclick =(e) => {
  //   if ('undefined' !== typeof section_listHandler.section02_activate) section_listHandler.section02_activate(e);
  // }

  // this.onclick = (e) =>{
  //   console.log("target = " + e.target.tagName + ", this=" + this.tagName);
  //   const iNode = this.checkInteractiveDOM(e.target);
  //   if (iNode !== null){
  //     console.log("onclick checkInteractiveDOM: ", );
  //   }
  // }

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_listController
};
