/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import image
import screenBG                     from '/static/img/hospital_bg.jpg';
// import class
import { SocialGroup                } from '/class/SocialGroup';
import { Disease                    } from '/class/Disease';
// import view block with contorller
import { ToolTipController          } from '/layout/components/toolTip/ToolTipController';
import { ChapterInfoController      } from '/layout/components/chapterInfo/ChapterInfoController';
import { CmdSysFormalController     } from '/layout/editor/single/CmdSysFormalController';
import { CmdPlayCtrlController      } from '/layout/editor/single/CmdPlayCtrlController';
import { SelectSocialGPController   } from '/layout/editor/single/SelectSocialGPController';
import { SelectDiseaseController    } from '/layout/editor/single/SelectDiseaseController';
import { EntryListController        } from '/layout/editor/single/EntryListController';
import { ApplyPanelController       } from '/layout/editor/single/ApplyPanelController';
import { ProgressBarController      } from '/layout/components/progressBar/ProgressBarController';
import { BlurFilterController       } from '/layout/components/blurFilter/BlurFilterController';
import { MessageBoxController       } from '/layout/components/messageBox/MessageBoxController';
import { PositionInfoController     } from '/layout/components/positionInfo/PositionInfoController';
import { StaticSocialGroupArray
        as staticSocialGroupArray   } from '/class/static/object/StaticSocialGroupArray';
import { StaticDiseaseArray
        as staticDiseaseArray       } from '/class/static/object/StaticDiseaseArray';


/***
 * controller:  FocusEditorController
 ***/
// Describe FocusEditorController Class below
const FocusEditorController   = function (focusEditorHandler) {

  
  // private variable & mapping ////////////////////////////////////////////////
  let   me                    = this;
  let   switchInfoTable       = false;
  let   focusId               = '';
  let   history               = $SR.History.getInstance('PageHistory');
  let   toolTipEvent          = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   onResize              = $SR.EventCarrier.getInstance('ResizeEvent');
  let   state                 = $SR.VolatileState.getInstance();
  let   content               = this.childNodes[4].childNodes[1];


  // Privilige Static Functions ////////////////////////////////////////////////


  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    switchInfoTable: {
      get: function() {
        return switchInfoTable;
      },
      set: function(o) {
        switchInfoTable = o;
      }
    }
  });


  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    activateSection(e,c){
      this.switchInfoTable = true;
      $SR.moveScreen(this);
      history.append('FocusEditor');
      messageBox.turnOffMsgbox();
      // bind info table
      if ('undefined' == typeof c) {
        this.bind_infoTableClear();
        return;
      }
      this.updateInfoTable(c);
      // social group bind
      this.bind_socialGroupClear();
      const group = [];
      c.attribute.group.forEach(
        (e) => {group.push( new SocialGroup( e.name, e.speed, e.health, e.recovery, e.img))}
      );
      this.bind_socialGroup(group);
      // disease bind
      selectDisease.bindGroupClear();
      let disease = [];
      c.attribute.disease.forEach(
        (e) => {disease.push( new Disease( e.name, e.damage, e.antiBodyAdapt, e.resistRating, e.immunityEx, e.img, e.ro))}
      );
      selectDisease.bindGroup(staticDiseaseArray(), disease);
      if(state.call('simulator.isRunning')) cmdPlayCtrl.trigger_onclickPlay();
      else cmdPlayCtrl.trigger_onclickStop();
    },
    bindInfoTable(e){
      if(!this.switchInfoTable) return;
      if ('undefined' == typeof e) {
        this.bind_infoTableClear();
        return;
      }
      const o = e.find( i => (i.attribute.onFocus));
      this.updateInfoTable(o);
      const group = [];
      o.attribute.group.forEach(
        (e) => {group.push( new SocialGroup( e.name, e.speed, e.health, e.recovery, e.img))}
      );
      selectSocialGroup.bindGroup(staticSocialGroupArray(), group);
      let disease = [];
      o.attribute.disease.forEach(
        (e) => {disease.push( new Disease( e.name, e.damage, e.antiBodyAdapt, e.resistRating, e.immunityEx, e.img, e.ro))}
      );
      selectDisease.bindGroup(staticDiseaseArray(), disease);
    },
    updateInfoTable(o){
      if(!this.switchInfoTable) return;
      if ('undefined' == typeof o) {
        this.bind_infoTableClear();
        return;
      }
      focusId = o.attribute.id;
      entryList.bind_id(o.attribute.id);
      entryList.bind_radius(o.attribute.radius);
      entryList.bind_isolated(o.attribute.isolated);
      entryList.bind_healthGage(o.attribute.healthGage);
      entryList.bind_color(o.attribute.color);
      entryList.rNumbers = o.attribute.disease;
      entryList.vaccine = o.attribute.immunityPool;
      progressBar.barValue = o.attribute.liveTics;
      progressBar.rSubValue = o.attribute.liveDays;
      positionInfo.x = o.position.x;
      positionInfo.y = o.position.y;
      if(-1 < o.attribute.putOnMask     && 1 >= o.attribute.putOnMask)    applyPanel.deactivateBtnMask(o.attribute.putOnMask);
      if(-1 < o.attribute.keepDistance  && 1 >= o.attribute.keepDistance) applyPanel.deactivateBtnDistance(o.attribute.keepDistance);
      if(-1 < o.attribute.toHospital    && 1 >= o.attribute.toHospital)   applyPanel.deactivateBtnHospital(o.attribute.toHospital);
      if(-1 < o.attribute.lockdown      && 1 >= o.attribute.lockdown)     applyPanel.deactivateBtnLockdown(o.attribute.lockdown);
    },
    bind_infoTableClear(){
      switchInfoTable = false;
      entryList.bind_id('');
      entryList.bind_radius('');
      entryList.bind_isolated('');
      entryList.bind_healthGage('');
      entryList.bind_color('');
      selectSocialGroup.bindGroupClear();
    },
    bind_socialGroup(c){
      if(!this.switchInfoTable) return;
      selectSocialGroup.bindGroup(staticSocialGroupArray(), c);
    },
    bind_socialGroupClear(){
      selectSocialGroup.bindGroupClear();
    },
  });


  // inject controller /////////////////////////////////////////////////////////
  let toolTip             = $SR.View('FocusEditor-ToolTip').inject(ToolTipController, {});
  let chapterInfo         = $SR.View('FocusEditor-ChapterInfo').inject(ChapterInfoController, {});
  chapterInfo.subject     = 'FOCUSED ITEM EDITOR';
  let cmdSysFormal = $SR.View('FocusEditor-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_undo    :(e) => {
      let cursor = history.pre();
      if('MultiEditor' === cursor.value) focusEditorHandler.multiEditor_activateSection(e);
      else focusEditorHandler.simulator_triggerUndo(e);
    },
    onclick_confirm :(e) => {
      let params = {
        id          : entryList.id,
        radius      : entryList.radius,
        isolated    : entryList.isolated,
        healthGage  : entryList.healthGage,
        group       : selectSocialGroup.arraySelectedGroup,
        disease     : selectDisease.arraySelectedGroup
      }
      if(state.call('simulator.isRunning')) {
        messageBox.addWarning('Please, Stop the simulation, before you set these data.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
      if(0 >= selectSocialGroup.arraySelectedGroup.length) {
        messageBox.addAlert('Please, select one or more social groups.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
      focusEditorHandler.simulator_confirmInfo(e, params);
      messageBox.addSuccess(focusId + ' data uploaded on simulation.');
      cmdSysFormal.trigger_onclickAlert();
    },
    onclick_alert     :(e)  => {
      let   contentpos        = content.getBoundingClientRect();
      content.classList.toggle(blur.filterClass);
      messageBox.toggle_msgbox(e, contentpos);
    }
  });
  let cmdPlayCtrl = $SR.View('FocusEditor-CmdPlayCtrl').inject(CmdPlayCtrlController, {
    onclick_play    :(e) => {
      focusEditorHandler.simulator_triggerPlay(e);
      return true;
    },
    onclick_stop    :(e) => {
      focusEditorHandler.simulator_triggerStop(e);
      return true;
    },
  });
  let entryList           = $SR.View('FocusEditor-Entry-List').inject(EntryListController, {});
  let selectSocialGroup   = $SR.View('FocusEditor-SelectGroup').inject(SelectSocialGPController, {});
  selectSocialGroup.label = 'Social Group';
  let selectDisease       = $SR.View('FocusEditor-SelectDisease').inject(SelectDiseaseController, {});
  selectDisease.label     = 'Infections';
  let progressBar         = $SR.View('FocusEditor-bottom-left-status').inject(ProgressBarController, {});
  progressBar.barLabel    = 'Selected One Lives';
  progressBar.rSubLabel   = 'Days';
  let applyPanel          = $SR.View('FocusEditor-ApplyPanel').inject(ApplyPanelController, {
    onclick_btnVaccine    :(e) => {
      messageBox.addInfo(`"${focusId}" got Covid-19 vaccine injection.`);
      focusEditorHandler.simulator_injectVaccine(e, [focusId])
    },
    onclick_btnHospital   :(e) => {
      messageBox.addInfo(`"${focusId}" was taken to the hospital for 7 days.`);
      focusEditorHandler.simulator_toHospital(e, [focusId])
    },
    onclick_btnMask       :(e) => {
      messageBox.addInfo(`"${focusId}" put on mask for 7 days.`);
      focusEditorHandler.simulator_putOnMask(e, [focusId])
    },
    onclick_btnDistance   :(e) => {
      messageBox.addInfo(`"${focusId}" is starting keep distance with people for 7 days.`);
      focusEditorHandler.simulator_keepDistance(e, [focusId])
    },
    onclick_btnLockdown   :(e) => {
      messageBox.addInfo(`"${focusId}" agreed to a social blockade for 7 days.`);
      focusEditorHandler.simulator_lockdown(e, [focusId])
    },
  });
  let blur                = $SR.View('FocusEditor-Filter').inject(BlurFilterController, {});
  let messageBox          = $SR.View('FocusEditor-MessageBox').inject(MessageBoxController, {
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
  let positionInfo = $SR.View('FocusEditor-PositionInfo').inject(PositionInfoController, {
    onclick_position:(e) => focusEditorHandler.simulator_activateSection(e)
  });
  positionInfo.setTooltipPosition('move to simulator', 'top', '#555', 1, 0);


  // Event handler /////////////////////////////////////////////////////////////
  entryList.onclick = (e) => {
      if(state.call('simulator.isRunning')) {
        messageBox.addWarning('Please, Stop the simulation, before you set these data.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
  }
  selectSocialGroup.onmousedown = (e) => {
      if(state.call('simulator.isRunning')) {
        messageBox.addWarning('Please, Stop the simulation, before you pick social groups.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
  }
  selectDisease.onmousedown = (e) => {
      if(state.call('simulator.isRunning')) {
        messageBox.addWarning('Please, Stop the simulation, before you pick disease.');
        cmdSysFormal.trigger_onclickAlert();
        return;
      }
  }
  toolTipEvent.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('FocusEditor' == name.split('-')[0]){
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


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage = "url(" + screenBG + ")";


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  FocusEditorController
};
