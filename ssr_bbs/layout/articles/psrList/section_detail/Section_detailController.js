import { PanelNavBtnsController } from './PanelNavBtnsController';
import { BoardCtlPanelController } from './BoardCtlPanelController';
import { DatePickerController } from '/layout/components/datePicker/defaultDatePicker/DatePickerController';


/***
 * block:  Section_detailController
 ***/
// Describe constant Class below
const Section_detailController = function (section_detailHandler) {

  //* private variable & mapping //////////////////////////////////////////////
  const _private      = {};
  const contents      = this.firstChild;
  const frameTop      = contents.children[0];
  let panelNavBtns    = frameTop.firstChild.childNodes[2];
  let calender        = this.getModelByDataId('SampleCalendar');
  let dayPick         = this.getModelByDataId('single-datepicker');
  const textarea      = this.getModelByDataId('input-textarea');
  let boardCtrl       = this.getModelByDataId('BoardCtrlBox');


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
      this.activate();
      axios({
        method: 'get',
        url: 'http://localhost:9000/api/psr',
        // withCredentials: true,
        params: { RULE_ID: id }
      }).then((Response) => {
        textarea.innerText = JSON.stringify(Response.data);
        const result = Response.data[0];
        calender.load([
          calender.stringParseDate(String(result.APPLY_DATE), 'yyyyMMdd').getTime(),
          calender.stringParseDate(String(result.END_DATE), 'yyyyMMdd').getTime()
        ]);
        calender.inactive = true;
      }).catch((_Error) => {
        console.log('error', Response.data);
      });
    }
  });

  this.setData(() => {
    return {
      test: 'hello',
      test1: 1,
      test2: true,
      test3: function(){return null},
      test4: { d: 1, d2: 2, d3: function () { return null }},
      test5: [1,2,3,2,[3,4]]
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
  calender = $SR.registerModel(calender).inject(DatePickerController,{});
  dayPick = $SR.registerModel(dayPick).inject(DatePickerController, {});


  //* Event handler ///////////////////////////////////////////////////////////
  panelNavBtns.list.onclick = (e) => {
    if ('undefined' !== typeof section_detailHandler.onclick_list) section_detailHandler.onclick_list(e);
  }

  boardCtrl.brain.onclick = (_e) => {
    axios({
      method: 'get',
      url: 'http://localhost:9000/api/psr',
      // withCredentials: true,
      params: { _page: 7, _limit: 20 }
    }).then((Response) => {
      console.log('Response',Response.data);
    }).catch((_Error) => {
      console.log('error', Response.data);
    });
  }
  boardCtrl.briefcase.onclick = (_e) => {
    console.log('briefcase !!', calender.pickedDateArray);
  }


  //* Lazy Initialization /////////////////////////////////////////////////////


  //* End of Structure ////////////////////////////////////////////////////////
  return this;
}
export {
  Section_detailController
};
