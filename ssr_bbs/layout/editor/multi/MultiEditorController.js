/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import image
import screenBG                     from '/static/img/vaccine_bg.jpg';
// class
import { Page                       } from '/class/Page';
// import view block with contorller
import { ChapterInfoController      } from '/layout/components/chapterInfo/ChapterInfoController';
import { CmdSysFormalController     } from '/layout/editor/multi/CmdSysFormalController';
import { CmdPlayCtrlController      } from '/layout/editor/multi/CmdPlayCtrlController';
import { SortingTableController     } from '/layout/components/sortingTable/SortingTableController';
import { ApplyPanelController       } from '/layout/editor/multi/ApplyPanelController';
import { ProgressBarController      } from '/layout/components/progressBar/ProgressBarController';
import { CommandListController      } from '/layout/editor/multi/CommandListController';
import { BlurFilterController       } from '/layout/components/blurFilter/BlurFilterController';
import { MessageBoxController       } from '/layout/components/messageBox/MessageBoxController';
import { ToolTipController          } from '/layout/components/toolTip/ToolTipController';
// STATIC
import { StaticMultiEditorTableHeader
          as getTableHeader         } from '/class/static/object/StaticMultiEditorTableHeader';
import { FRAME_SETTING              } from '/class/static/DefineConst';


/**
 * controller:  MultiEditorController
 *  Describe MultiEditorController Class below
 * @param {{Function}} multiEditorHandler
 * @returns
 */
const MultiEditorController   = function (multiEditorHandler) {


  // private variable & mapping ////////////////////////////////////////////////
  let   me                    = this;
  let   selectedPtcls         = [];
  let   livetime;
  let   history               = $SR.History.getInstance('PageHistory');
  let   state                 = $SR.VolatileState.getInstance();
  let   toolTipEvent          = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   onResize              = $SR.EventCarrier.getInstance('ResizeEvent');
  let   page                  = new Page();
  let   content               = this.childNodes[4].childNodes[1];


  // Privilige Static Functions ////////////////////////////////////////////////


  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    selectedPtcls: {
      get: ()   => _.cloneDeep(selectedPtcls),
      set: (o)  => {selectedPtcls = _.cloneDeep(o)}
    },
  });


  // Access control: Public functions //////////////////////////////////////////
  Object.assign(this, {
    activateSection(e,c){
      $SR.moveScreen(this);
      history.append('MultiEditor');
      messageBox.turnOffMsgbox();
      if('undefined' !== typeof c) this.selectedPtcls = c;
      this.initializeTable();
      if(state.call('simulator.isRunning')) cmdPlayCtrl.trigger_onclickPlay();
      else cmdPlayCtrl.trigger_onclickStop();
    },
    initializeTable(){
      page       = sortingTable.pageInfo;
      // console.log('MultiEditor - refeshTable:1:', page);
      sortingTable.generateTable(multiEditorHandler.simulator_getCavansParticles(page));
    },
    updateTable(array){
      page       = sortingTable.pageInfo;
      // console.log('MultiEditor - updateTable:', page);
      sortingTable.updateTable(multiEditorHandler.simulator_getCavansParticles(page));
    },
    updateLivetime(o){
      livetime = o;
      progressBar.barValue = parseInt(livetime % FRAME_SETTING.DAY);
      progressBar.rSubValue = parseInt(livetime / FRAME_SETTING.DAY);
    }
  });


  // inject controller /////////////////////////////////////////////////////////
  let chapterInfo         = $SR.View('MultiEditor-ChapterInfo').inject(ChapterInfoController, {});
  chapterInfo.subject     = 'MULTI-SELECT TABLE';
  let cmdSysFormal = $SR.View('MultiEditor-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_undo          :(e)    =>  multiEditorHandler.simulator_triggerUndo(e),
    onclick_alert         :(e)    =>  {
      let contentpos = content.getBoundingClientRect();
      content.classList.toggle(blur.filterClass);
      messageBox.toggle_msgbox(e, contentpos);
    }
  });
  let cmdPlayCtrl = $SR.View('MultiEditor-CmdPlayCtrl').inject(CmdPlayCtrlController, {
    onclick_stop          :(e)    =>  {
      if(state.call('simulator.isRunning')) multiEditorHandler.simulator_triggerStop(e);
      return true;
    },
    onclick_play          :(e)    =>  {
      if(0 >= state.call('simulator.particles').length) {
        messageBox.addAlert('No data to run simulation.');
        cmdSysFormal.trigger_onclickAlert();
        return false;
      }
      multiEditorHandler.simulator_triggerPlay(e);
      return true;
    },
  });
  let sortingTable = $SR.View('MultiEditor-SortingTable').inject(SortingTableController, {
    onclick_tableRow      : (o, i, data) => {
      const id = data[1];
      const match = selectedPtcls.findIndex((e)=>(e === id));
      if(0 > match) selectedPtcls.push(id);
      else selectedPtcls.splice(match, 1);
      console.log('MultiEditor - onclick_tableRow:', data);
      // to process double click, one click event need to slow down
      _.debounce(()=>multiEditorHandler.simulator_addselectedPaticle(selectedPtcls), 200)();
    },
    ondblclick_tableRow   : (o, i, data) => {
      const id = data[1];
      const carriage = multiEditorHandler.simulator_focusOn(id);
      multiEditorHandler.focusEditor_activateSection('', carriage);
    },
    load_prePage          : (page) => {
      // load page
      return multiEditorHandler.simulator_getCavansParticles(page);
    },
    load_nextPage         : (page) => {
      // load page
      return multiEditorHandler.simulator_getCavansParticles(page);
    },
    sort_tableByPageInfo(p){
      page       = sortingTable.pageInfo;
      console.log('MultiEditor - sort_tableByPageInfo:', page);
      sortingTable.generateTable(multiEditorHandler.simulator_getCavansParticles(page));
    }
  }, getTableHeader());

  let applyPanel = $SR.View('MultiEditor-ApplyPanel').inject(ApplyPanelController, {
    onclick_btnVaccine    :(e)    => {
      messageBox.addInfo(`${this.selectedPtcls.length} people got Covid-19 vaccine injection.`);
      multiEditorHandler.simulator_injectVaccine(e, this.selectedPtcls);
    },
    onclick_btnHospital   :(e)    => {
      messageBox.addInfo(`${this.selectedPtcls.length} people were taken to the hospital for 7 days.`);
      multiEditorHandler.simulator_toHospital(e, this.selectedPtcls);
    },
    onclick_btnMask       :(e)    => {
      messageBox.addInfo(`${this.selectedPtcls.length} people put on mask for 7 days.`);
      multiEditorHandler.simulator_putOnMask(e, this.selectedPtcls);
    },
    onclick_btnDistance   :(e)    => {
      messageBox.addInfo(`${this.selectedPtcls.length} people are starting keep distance with people for 7 days.`);
      multiEditorHandler.simulator_keepDistance(e, this.selectedPtcls);
    },
    onclick_btnLockdown   :(e)    => {
      messageBox.addInfo(`${this.selectedPtcls.length} people agreed to a social blockade for 7 days.`);
      multiEditorHandler.simulator_lockdown(e, this.selectedPtcls);
    },
  });
  let progressBar         = $SR.View('MultiEditor-bottom-left-status').inject(ProgressBarController, {});
  progressBar.barLabel    = 'Day Time';
  progressBar.rSubLabel   = 'Days';
  let commandList         = $SR.View('MultiEditor-Command-List').inject(CommandListController, {
    onclick_add   : (e) => multiEditorHandler.toaster_activateSection(),
    onclick_del   : (e) => {
      messageBox.addInfo(`${selectedPtcls.length} particles are deleted.`);
      selectedPtcls = [];
      multiEditorHandler.simulator_triggerDel(e);
      this.refreshTable();
      // update
      if(0 >= state.call('simulator.particles').length) {
        progressBar.barValue = 0;
        progressBar.rSubValue = 0;
        cmdPlayCtrl.trigger_onclickStop();
        sortingTable.updateTable(null);
        // message
        messageBox.addInfo('simulation stopped.');
        messageBox.addAlert('in run there was no simulation data. the simulation failed to run.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
    },
    onclick_clear: (e)=> {
      // initialize table & params
      progressBar.barValue = 0;
      progressBar.rSubValue = 0;
      cmdPlayCtrl.trigger_onclickStop();
      selectedPtcls = [];
      console.log('MultiEditorController.onclick_clear:1');
      sortingTable.updateTable(null);
      console.log('MultiEditorController.onclick_clear:2');
      // clean action on canvas
      multiEditorHandler.simulator_triggerClear(e);
      // message
      messageBox.addInfo('simulation stopped.');
      messageBox.addAlert('Table data cleared.');
      cmdSysFormal.trigger_onclickAlert();
    }
  });
  let blur                = $SR.View('MultiEditor-Filter').inject(BlurFilterController, {});
  let messageBox          = $SR.View('MultiEditor-MessageBox').inject(MessageBoxController, {
    onchange_msgStack(a){
      const n = a.length;
      cmdSysFormal.alertCnt = n;
      if(0 < n) {
        cmdSysFormal.alertColor = messageBox.lastMsgType;
      } else {
        cmdSysFormal.alertColor = '';
        cmdSysFormal.trigger_onclickAlert();
      }
    },
    turnOffMsgbox(){
      content.classList.remove(blur.filterClass);
    },
    turnOnMsgbox(){
      content.classList.add(blur.filterClass);
    }
  });
  let toolTip             = $SR.View('MultiEditor-ToolTip').inject(ToolTipController, {});


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage = "url(" + screenBG + ")";


  // Event handler /////////////////////////////////////////////////////////////
  toolTipEvent.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('MultiEditor' == name.split('-')[0]){
      const cont  = e.detail.getContents();
      if(null !== cont)toolTip.open(cont);
      else toolTip.collapse();
    }
  }
  onResize.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('window' != name.split('-')[0])return;
    const cont  = e.detail.getContents();
    cmdPlayCtrl.trigger_onclickStop(e);
    _.debounce(function(e){
      messageBox.addWarning('This Simulater resized, Simulation stoped');
      messageBox.turnOnMsgbox(e, content.getBoundingClientRect());
    }, 300)();
  }


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  MultiEditorController
};
