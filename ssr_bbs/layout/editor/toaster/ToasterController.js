/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import view block with contorller
import { ChapterInfoController      } from '/layout/components/chapterInfo/ChapterInfoController';
import { CmdSysFormalController     } from '/layout/editor/toaster/CmdSysFormalController';
import { EditorBotBarController     } from '/layout/editor/toaster/EditorBotBarController';
import { SelectSocialGPController   } from '/layout/editor/toaster/SelectSocialGPController';
import { SelectDiseaseController    } from '/layout/editor/toaster/SelectDiseaseController';
import { EntryListController        } from '/layout/editor/toaster/EntryListController';
import { ApplyPanelController       } from '/layout/editor/toaster/ApplyPanelController';
import { BlurFilterController       } from '/layout/components/blurFilter/BlurFilterController';
import { MessageBoxController       } from '/layout/components/messageBox/MessageBoxController';
import { ToolTipController          } from '/layout/components/toolTip/ToolTipController';
import { StaticSocialGroupArray
          as staticSocialGroupArray } from '/class/static/object/StaticSocialGroupArray';
import { StaticDiseaseArray
          as staticDiseaseArray     } from '/class/static/object/StaticDiseaseArray';
// import STATIC ///////////////////////////////////////////////////////////////
import { FRAME_SETTING, DEFALUT_RADIUS } from '/class/static/DefineConst';
// import background img
import screenBG  from '/static/img/operation_bg.jpg';

/**
 * controller:  ToasterController
 * @param {[Function]} toasterHandler
 * @returns
 */
const ToasterController    = function (toasterHandler) {


  // private variable & mapping ////////////////////////////////////////////////
  let   me                  = this;
  let   history             = $SR.History.getInstance('PageHistory');
  let   toolTipEvent        = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   onResize            = $SR.EventCarrier.getInstance('ResizeEvent');
  let   content             = this.childNodes[4].childNodes[1];


  // Privilige Static Functions //////////////////////////////////////////////// window.innerHeight


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
      $SR.moveScreen(this);
      history.append('Toaster');
      messageBox.turnOffMsgbox();
      selectSocialGroup.bindGroup(staticSocialGroupArray());
      selectDisease.bindGroup(staticDiseaseArray());//this.onchange_dragZone();
      selectSocialGroup.onchange_dragZone();
      selectDisease.onchange_dragZone();
    },
    bind_socialGroup(){
      selectSocialGroup.bindGroup(staticSocialGroupArray());
    },
    updatePopCnt(o){
      editBotBar.updatePopCnt(o);
    }
  });


  // inject controller /////////////////////////////////////////////////////////
  let chapterInfo         = $SR.View('Toaster-ChapterInfo').inject(ChapterInfoController, {});
  chapterInfo.subject     = 'GENERATE PARTICLES';
  let entryList           = $SR.View('Toaster-EntryList').inject(EntryListController, {});
  let cmdSysFormal        = $SR.View('Toaster-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_undo      :(e)  => {
      // Initialize
      selectSocialGroup.bindGroupClear();
      selectSocialGroup.bindGroup(staticSocialGroupArray());
      selectDisease.bindGroupClear();
      selectDisease.bindGroup(staticDiseaseArray());
      // history back
      let cursor = history.pre();
      if('MultiEditor' === cursor.value) toasterHandler.multiEditor_activateSection(e);
      else toasterHandler.simulator_triggerUndo(e);
    },
    onclick_alert     :(e)    => {
      let   contentpos        = content.getBoundingClientRect();
      content.classList.toggle(blur.filterClass);
      messageBox.toggle_msgbox(e, contentpos);
    }
  });
  let selectSocialGroup   = $SR.View('Toaster-SelectGroup').inject(SelectSocialGPController, {});
  selectSocialGroup.label = 'Social Group';
  let selectDisease       = $SR.View('Toaster-SelectDisease').inject(SelectDiseaseController, {});
  selectDisease.label     = 'Infections';
  let applyPanel          = $SR.View('Toaster-ApplyPanel').inject(ApplyPanelController, {
    onclick_inject    :(e,c)  =>  {
        const params = {
          section     : entryList.section,
          isolated    : entryList.isolated,
          radius      : entryList.radius,
          age         : entryList.age,
          group       : selectSocialGroup.arraySelectedGroup,
          disease     : selectDisease.arraySelectedGroup
        }
        if(0 >= selectSocialGroup.arraySelectedGroup.length) {
          messageBox.addInfo('simulation stopped.');
          messageBox.addAlert('Please, select one or more social groups.');
          cmdSysFormal.trigger_onclickAlert();
          return;
        }
        toasterHandler.simulator_popParticles(params, c);
        messageBox.addSuccess(c +' people append on simulation.');
    }
  });
  let editBotBar          = $SR.View('Toaster-EditBotBar').inject(EditorBotBarController, {});
  let blur                = $SR.View('Toaster-Filter').inject(BlurFilterController, {});
  let messageBox          = $SR.View('Toaster-MessageBox').inject(MessageBoxController, {
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
  let toolTip             = $SR.View('Toaster-ToolTip').inject(ToolTipController, {});


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage  = "url(" + screenBG + ")";
  entryList.isolated        = false;
  entryList.section         = 'Seoul';
  entryList.radius          = DEFALUT_RADIUS;
  entryList.age             = 30;
  

  // Event handler /////////////////////////////////////////////////////////////
  toolTipEvent.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('Toaster' == name.split('-')[0]){
      const cont  = e.detail.getContents();
      if(null !== cont)toolTip.open(cont);
      else toolTip.collapse();
    }
  }
  onResize.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('window' != name.split('-')[0])return;
    const cont  = e.detail.getContents();
    toasterHandler.simulator_triggerStop(e);
    _.debounce(function(e){
      messageBox.addWarning('This Simulater resized, Simulation stoped');
      messageBox.turnOnMsgbox(e, content.getBoundingClientRect());
    }, 300)();
  }


  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ToasterController
};
