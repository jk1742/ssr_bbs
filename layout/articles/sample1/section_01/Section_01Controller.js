import { CmdSysFormalController } from '/layout/articles/sample1/section_01/CmdSysFormalController';

/***
 * block:  Section_01Controller
 ***/
// Describe constant Class below
const Section_01Controller = function (section_01Handler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const me                    = this;
  const _private              = {};
  let sectionEvent = $SR.Event.register('SectionChange');
  let queueEvent = $SR.Queue.getInstance();

  //* Privilege Static Functions ////////////////////////////////////////////////
  const getPositionInfo = function(e, t){
    return {
      left  : t.left,
      top   : t.top,
      width : t.width,
      height: t.height,
      pageX : e.pageX,
      pageY : e.pageY
    }
  }

  //* Access Control: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    // articleId:{
    //   set:(str) => {_private.articleId = str},
    //   get:() => _private.articleId,
    //   enumerable:true
    // }
  });

  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    activateSection() {
      queueEvent.push({
        id: this.id
      });
      const y = this.getBoundingClientRect().top + window.scrollY;
      console.log(this.getBoundingClientRect(), window.scrollY, y);
      $SR.moveScreen(this);
    }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }
  
  console.log('sction activate:', this.activate);
  // console.log('sction activate:', this.activate());

  //* inject controller ///////////////////////////////////////////////////////
  const cmdSysFormal = $SR.View(this.id + '-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_confirm(e){
      if ('undefined' !== typeof section_01Handler.section02_activate) section_01Handler.section02_activate(e);
    }
  });

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';
  // console.log('fire section_01 '+ this.id);

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_01Controller
};
