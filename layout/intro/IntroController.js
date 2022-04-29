/***
 * block:  IntroController
 ***/
// Describe constant Class below
const IntroController = function (introHandler) {

  //* private variable & mapping ////////////////////////////////////////////////
  const _private              = {};
  const section01             = this.firstChild;

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

  //* Access control: Public functions ////////////////////////////////////////
  Object.assign(this, {
    setPaddingTop(pos) {
      section01.style.paddingTop = `${pos}px`;
    },
    revealIntro(){
      this.style.display = 'block';
    },
    hideIntro() {
      this.style.display = 'none';
    }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////

  //* Lazy Initialization /////////////////////////////////////////////////////
  this.scrollLock = true;

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  IntroController
};
