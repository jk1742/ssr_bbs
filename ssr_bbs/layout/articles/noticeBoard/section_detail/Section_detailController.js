import { PanelNavBtnsController } from './PanelNavBtnsController';
import { BoardCtlPanelController } from './BoardCtlPanelController';

/***
 * block:  Section_detailController
 ***/
// Describe constant Class below
const Section_detailController = function (section_detailHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private      = {};
  const contents      = this.firstChild;
  const frameTop      = contents.children[0];
  const frameMid      = contents.children[1];
  let panelNavBtns    = frameTop.firstChild.childNodes[2];
  let boardCtrl       = frameMid.firstChild.children[1].firstChild.firstChild.children[1];
  console.log('Section_detailController:', frameMid.firstChild.children[1].firstChild.firstChild.children[1]);
  //* Privilege Static Functions //////////////////////////////////////////////
  // const getPositionInfo = function(e, t){
  //   return {
  //     left  : t.left,
  //     top   : t.top,
  //   }
  // }

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
    viewById(id) {
      console.log("render viewById: ",id);
      this.activate();
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true,
        params: { RULE_ID: id }
        // params: { _page: 7, _limit: 20 }
      }).then((Response) => {
        frameMid.firstChild.firstChild.firstChild.children[1].firstChild.innerText = JSON.stringify(Response.data);
        console.log('Response', Response.data, frameMid.firstChild.firstChild.firstChild.children[1].firstChild.innerText);
      }).catch((_Error) => {
        console.log('error', Response.data);
      });
    }
  });

  //* Event handler ///////////////////////////////////////////////////////////
  // register menu event
  // item.onclick = (e) => {
  //   if('undefined' !== typeof navTabHandler.onclick_item) navTabHandler.onclick_item(e);
  // }

  //* inject controller ///////////////////////////////////////////////////////
  panelNavBtns = $SR.registerModel(panelNavBtns).inject(PanelNavBtnsController, {});
  boardCtrl = $SR.registerModel(boardCtrl).inject(BoardCtlPanelController, {});
  boardCtrl.brain.setTooltip('Am I brain ?', 'bottom', '#555', 1, 0, 0);

  //* Event handler ///////////////////////////////////////////////////////////
  panelNavBtns.list.onclick = (e) => {
    if ('undefined' !== typeof section_detailHandler.onclick_list) section_detailHandler.onclick_list(e);
  }

  boardCtrl.brain.onclick = (e) => {
    axios({
      method: 'get',
      url: 'http://localhost:9000/api/psr',
      // withCredentials: true,
      // params: { location: this.id, date: Date.now() }
      params: { _page: 7, _limit: 20 }
    }).then((Response) => {
      console.log('Response',Response.data);
    }).catch((_Error) => {
      console.log('error', Response.data);
    });
  }
  boardCtrl.briefcase.onclick = (e) => {
    console.log('briefcase !!');
  }

  //* Lazy Initialization /////////////////////////////////////////////////////
  // viewFilter.style.display    = 'none';

  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_detailController
};
