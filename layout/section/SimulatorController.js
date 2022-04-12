/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// import image ////////////////////////////////////////////////////////////////
import BgMap                       from '/static/img/seoul.png';
import screenBG                    from '/static/img/medickit_bg.jpg';
// import class ////////////////////////////////////////////////////////////////
import { Particle,
         Attribute                } from '/class/Particle';
import { Immunity                 } from '/class/Immunity';
import { RandomLocationOnSqure    } from '/class/RandomLocationOnSqure';
import { RandomVectorOnSqure      } from '/class/RandomVectorOnSqure';
import { StaticDiseaseArray
          as staticDiseaseArray   } from '/class/static/object/StaticDiseaseArray';

// import layout contorller ////////////////////////////////////////////////////
import { ToolTipController        } from '/layout/components/toolTip/ToolTipController';
import { FocusBridgeController    } from '/layout/section/FocusBridgeController';
import { ChapterInfoController    } from '/layout/components/chapterInfo/ChapterInfoController';
import { CmdSysFormalController   } from '/layout/section/CmdSysFormalController';
import { BlurFilterController     } from '/layout/components/blurFilter/BlurFilterController';
import { MessageBoxController     } from '/layout/components/messageBox/MessageBoxController';
import { ProgressBarController    } from '/layout/components/progressBar/ProgressBarController';
import { CommandListController    } from '/layout/section/CommandListController';
import { SpeedIndcController      } from '/layout/section/SpeedIndcController';
import { CmdPlayCtrlController    } from '/layout/section/CmdPlayCtrlController';
// import { CmdAdsController         } from '/layout/components/cmdAds/CmdAdsController';
import { CanvasMonitorController  } from '/layout/section/CanvasMonitorController';
import { StatisticsController     } from '/layout/components/statistics/StatisticsController';

// import STATIC ///////////////////////////////////////////////////////////////
import { DAY, FRAME_SETTING, DEFALUT_RADIUS } from '/class/static/DefineConst';


/***
 * block:  Section Controller
 ***/
// Describe SectionController Class below
const SimulatorController   = function(simulatorHandler) {


  // private variable & mapping ////////////////////////////////////////////////
  let   me                = this;
  let   history           = $SR.History.getInstance('PageHistory');
  let   toolTipEvent      = $SR.EventCarrier.getInstance('ToolTipEvent');
  let   onResize          = $SR.EventCarrier.getInstance('ResizeEvent');
  let   state             = $SR.VolatileState.getInstance();
  const content           = this.childNodes[4].childNodes[1];
  let   contentRect       = content.getBoundingClientRect();


  // Privilige Static Functions ////////////////////////////////////////////////
  /**
   * getHexNumCut
   * @param {Number} n 
   * @returns
   */
  const getHexNumCut = function(n){
    let k = n % 16;
    return (n - k);
  }

  /**
   * sorting
   * @param {[Array]} array 
   * @param {String} orderBy 
   * @param {String} orderId 
   * @param {String} orderType 
   * @returns {[Object]}
   */
  const sorting = function (array, orderId, orderType, orderBy) {
    let carriage = _.cloneDeep(array);
    if ('string' === orderType) {
      carriage.sort(function(a, b) {
        let nameA = a[orderId];
        let nameB = b[orderId];
        if (nameA < nameB) return ('asc' === orderBy) ? -1: 1;
        if (nameA > nameB) return ('asc' === orderBy) ?  1:-1;
        return 0;
      });
    } else if ('number' === orderType){
      carriage.sort(function(a, b) {
        if (a[orderId] > b[orderId]) return ('asc' === orderBy) ?  1:-1;
        if (a[orderId] < b[orderId]) return ('asc' === orderBy) ? -1: 1;
        return 0;
      });
    } else if ('boolean' === orderType){
      carriage.sort(function(a, b) {
        if (a[orderId] > b[orderId]) return ('asc' === orderBy) ?  1:-1;
        if (a[orderId] < b[orderId]) return ('asc' === orderBy) ? -1: 1;
        return 0;
      });
    }
    return carriage;
  };


  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
    canvasModel: {
      get: function() {
        return canvas.model;
      },
      set: function(o) {
        canvas.model = o;
      }
    }
  });


  // inject controller /////////////////////////////////////////////////////////
  let chapterInfo         = $SR.View('Simulator-ChapterInfo').inject(ChapterInfoController, {});
  chapterInfo.subject     = 'VIRUS DIFFUSION SIMULATION';
  let config              = {width: getHexNumCut(contentRect.width), height: getHexNumCut(contentRect.height),backgroundImage: BgMap};
  let canvas = $SR.View('Canvas-Monitor').inject(CanvasMonitorController, {
    // transfer mapping
    focusEditor_clearInfoTable  :()     => simulatorHandler.focusEditor_clearInfoTable(),
    focusEditor_bindSocialGroup :(a)    => simulatorHandler.focusEditor_bindSocialGroup(a),
    // resource control
    focusBridge_changeItemsCnt  :(idx)  => focusBridge.bind_selected(idx),
    focusBridge_clearFocus      :()     => focusBridge.bind_focusClear(),
    focusBridge_bindId          :(o)    => focusBridge.bindId(o),
    speedIndc_getTimefctr       :()     => speedIndc.timefactor,
    multiEditor_updateTable     :(o)    => simulatorHandler.multiEditor_updateTable(o),
    ondblclick_focusedItem      :(e, c) => {
      simulatorHandler.focusEditor_activateSection(e, new Particle( c.position, c.vector, c.attribute ));
    },
    // update Status to commandList and state info
    // params o: wheelCounter   a:particles
    trigger_updateStatus        :(o,a)  => {
      if('FocusEditor' === history.cur()) simulatorHandler.focusEditor_bindInfoTable(a);
      if('MultiEditor' === history.cur()) simulatorHandler.multiEditor_updateLivetime(o);
      if('Simulator' !== history.cur()) return;
      progressBar.rSubValue   = parseInt(o / FRAME_SETTING.DAY);
      progressBar.barValue    = parseInt(o % FRAME_SETTING.DAY);
      progressBar.secondValue = a.length;
      if(statistics.status) statistics.update(commandList.viewerFilterDisease, a);
    }
  }, config);
  // focusbirige
  let focusBridge = $SR.View('Focus-Bridge').inject(FocusBridgeController, {
    onclick_addParticle:(e) => simulatorHandler.toaster_activateSection(),
    onclick_focusEditor:(e) => {
      const c = canvas.model.particles.find( e => (e.attribute.onFocus));
      const carriage = new Particle( c.position, c.vector, c.attribute );
      simulatorHandler.focusEditor_activateSection(e, carriage);
    },
    onclick_multiEditor:(e) => {
      const c = canvas.model.particles.filter( e => (e.attribute.isSelected) );
      const carriage = [];
      c.forEach(e => { carriage.push(e.attribute.id)});
      simulatorHandler.multiEditor_activateSection(e, carriage);
    }
  });
  let cmdSysFormal        = $SR.View('Simulator-CmdSysFormal').inject(CmdSysFormalController, {
    onclick_upside      :(e)  => {
      simulatorHandler.header_activateSection();
    },
    onclick_alert       :(e)  => {
      messageBox.toggle_msgbox(e, content.getBoundingClientRect());
    }
  });
  let speedIndc = $SR.View('Simulator-SpeedIndc').inject(SpeedIndcController, {});
  // let cmdAds = $SR.View('Simulator-CmdAds').inject(CmdAdsController, {});
  let cmdPlayCtrl = $SR.View('Simulator-CmdPlayCtrl').inject(CmdPlayCtrlController, {
    onclick_forward   :(e) => speedIndc.upSpeed(),
    onclick_play      :(e) => {
      if(0 >= canvas.model.particles.length){
        return;
      }
      if (canvas.isRunning) { return; }
      canvas.update();
      canvas.play();
      return true;
    },
    onclick_stop      :(e) => {
      state.store('simulator.isRunning', false);
      canvas.stop();
      return true;
    },
    onclick_backward  :(e) => speedIndc.downSpeed(),
  });
  // bottom progressBar
  let progressBar         = $SR.View('Simulator-ProgressBar').inject(ProgressBarController, {});
  progressBar.barLabel    = 'Time';
  progressBar.rSubLabel   = 'Days';
  progressBar.secondLabel = 'Que';
  // commandList
  let commandList         = $SR.View('Simulator-Command-List').inject(CommandListController, {
    update_selectedValue(e, value, id){
      if(messageBox.visibility) messageBox.turnOffMsgbox();
      statistics.turnoff();
      filter.blur = 1;
      if('none' == commandList.viewerFilterDisease.toLowerCase()) content.classList.remove(filter.filterClass);
      else content.classList.add(filter.filterClass);
      canvas.change_viewFilter1(commandList.viewerFilterDisease);
      canvas.update();
    },
    onclick_viewerIcon(e){
      // if(messageBox.visibility) messageBox.turnOffMsgbox();
      // filter.blur = 1;
      // if('nomal' == type) content.classList.remove(filter.filterClass);
      // else content.classList.toggle(filter.filterClass);
      // canvas.change_viewFilter(type, commandList.viewerFilterDisease);
      // canvas.update();
    },
    onclick_add (e) {
      simulatorHandler.toaster_activateSection();
      focusBridge.bind_add();
    },
    onclick_list (e){
      const c = canvas.model.particles.filter( e => (e.attribute.isSelected) );
      const carriage = [];
      c.forEach(e => { carriage.push(e.attribute.id)});
      simulatorHandler.multiEditor_activateSection(e, carriage);
    },
    onclick_select(e){
      canvas.model.currentAction = "none";
      simulatorHandler.focusEditor_onInfoTable();
      canvas.model.particles.forEach(e=>{
        e.attribute.isSelected = false;
      });
      canvas.update();
      focusBridge.bind_singleSelectInfo();
    },
    onclick_selectSq (e) {
      canvas.model.currentAction = "BoxSelect";
      canvas.model.particles.forEach(e=>{
        e.attribute.onFocus = false;
      });
      focusBridge.bind_selectSqure();
      focusBridge.bind_focusClear();
      canvas.update();
      simulatorHandler.focusEditor_clearInfoTable();
    },
    onclick_del (e) {
      canvas.model.particles = canvas.model.particles.filter( e => (!e.attribute.onFocus) );
      canvas.model.particles = canvas.model.particles.filter( e => (!e.attribute.isSelected) );
      canvas.update();
      focusBridge.bind_focusClear();
      state.store('simulator.particles', {'length': canvas.model.particles.length});
      simulatorHandler.focusEditor_clearInfoTable();
    },
    onclick_clear (e) {
      // message to stop
      messageBox.addInfo('simulation stopped.');
      messageBox.addAlert('in run there was no simulation data. the simulation failed to run.');
      cmdSysFormal.trigger_onclickAlert();
      // clear canvas
      canvas.clear();
      canvas.wheelCounter     = 0;
      state.store('simulator.particles', {'length': 0});
      progressBar.rSubValue   = 0;
      progressBar.barValue    = 0;
      progressBar.secondValue = 0;
      canvas.stop();
    }
  });
  let filter              = $SR.View('Simulator-Filter').inject(BlurFilterController, {});
  let messageBox          = $SR.View('Simulator-MessageBox').inject(MessageBoxController, {
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
      if('none' == commandList.viewerFilterDisease.toLowerCase()) content.classList.remove(filter.filterClass);
      else filter.blur = 1;
    },
    turnOnMsgbox(){
      filter.blur = 4;
      content.classList.add(filter.filterClass);
    }
  });
  let toolTip             = $SR.View('Simulator-ToolTip').inject(ToolTipController, {});
  let statistics          = $SR.View('Simulator-Statistics').inject(StatisticsController, {
    onclick_this(){
      return commandList.viewerFilterDisease;
    }
  });


  // Access control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // bind: access html
    // adjust: access inner variable
    uploadInfo(c, move) {
      if(move){
        commandList.trigger_onclickSelect();
        this.activateSection();
      }
      let seleted = canvas.model.particles.find(el=>(el.attribute.id == c.id));
      seleted.attribute.group       = c.group;
      seleted.attribute.disease     = c.disease;
      seleted.attribute.radius      = Number(c.radius);
      seleted.attribute.attachHealthGage(Number(c.healthGage));
      seleted.attribute.isolated    = c.isolated;
      // update
      canvas.update();
    },
    uploadMultiPrtcls(p, move){
      if(move){
        this.activateSection();
        commandList.trigger_onclickSelectsq();
      }
      canvas.model.particles.map((e ,i)=>{
        const cnt = p.selectedPtcls.findIndex((ei)=>(ei===e.attribute.id));
        if ( 0 <= cnt ) {
          //set data
          if ( typeof p.radius !== 'undefined' ) e.attribute.radius = p.radius;
          if ( typeof p.healthGage !== 'undefined' ) e.attribute.attachHealthGage(p.healthGage);
          if ( typeof p.isolated !== 'undefined' ) e.attribute.isolated = p.isolated;
          if ( 0 < p.group.length ) e.attribute.group = p.group;
          if ( 0 < p.disease.length ) e.attribute.disease = p.disease;
        }
        return e;
      });
      canvas.update();
    },
    triggerPlay (e){
      cmdPlayCtrl.trigger_onclickPlay(e);
    },
    triggerStop (e){
      cmdPlayCtrl.trigger_onclickStop(e);
    },
    setViewFilter(diseaseName){
      if('none' != diseaseName.toLowerCase()){
        filter.blur = 1;
        _.debounce(() => content.classList.add(filter.filterClass),100)();
      }
      canvas.change_viewFilter1(diseaseName);
      canvas.update();
    },
    activateSection(){
      if(messageBox.visibility) messageBox.turnOffMsgbox();
      this.setViewFilter(commandList.viewerFilterDisease);
      history.append('Simulator');
      $SR.moveScreen(this);
    },
    triggerUndo (e){
      if('FocusEditor' === history.cur()) commandList.trigger_onclickSelect();
      if('MultiEditor' === history.cur()) commandList.trigger_onclickSelectsq();
      this.activateSection();
    },
    triggerDel (e){
      commandList.trigger_onclickDel();
    },
    triggerClear (e){
      commandList.trigger_onclickClear();
    },
    popParticles(params,cnt){
      for(let i =0;i<cnt;i++){
        let pa = new Particle(
          new RandomLocationOnSqure(canvas.width, canvas.height),
          new RandomVectorOnSqure(canvas.width, canvas.height),
          new Attribute(0, params.group, params.disease, params.radius, params.age, params.isolated)
        );
        canvas.model.particles.push(pa);
      }
      const queLength = canvas.model.particles.length;
      progressBar.secondValue = queLength;
      state.store('simulator.particles', {'length': queLength});
      canvas.update();
      simulatorHandler.toaster_updatePopCnt(queLength);
    },
    injectVaccine(e, focusId){
      focusId.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.appendImmunity(new Immunity('Astrazeneca', 'Covid19', 'AZ', 0.5, canvas.days, 100 ));
      });
      if (canvas.model.currentAction === 'none') simulatorHandler.focusEditor_bindInfoTable(canvas.model.particles);
    },
    putOnMask(e, focusId){
      focusId.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.treatPutOnMask();
      });
    },
    keepDistance(e, focusId) {
      focusId.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.treatKeepDistance();
      });
    },
    toHospital(e, focusId){
      focusId.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.treatToHospital();
      });
    },
    lockdown(e, focusId) {
      focusId.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.treatLockdown();
      });
    },
    addselectedPaticle(array) {
      canvas.model.particles.forEach((particle, i) => {
        particle.attribute.isSelected = false;
      });
      array.forEach((id, i) => {
        const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
        canvas.model.particles[match].attribute.isSelected = true;
      });
      simulatorHandler.multiEditor_updateTable(canvas.model.particles);
      canvas.update();
    },
    focusOn(id){
      canvas.model.particles.forEach((particle, i) => {
        particle.attribute.onFocus = false;
      });
      canvas.model.currentAction = 'none';
      const match = canvas.model.particles.findIndex((e)=>(e.attribute.id === id));
      canvas.model.particles[match].attribute.onFocus = true;
      return canvas.model.particles[match];
    },
    getCavansParticles(page){
      let rows = [];
      for (let i = 0; i < canvas.model.particles.length; i++) {
        const e = canvas.model.particles[i];
        rows.push(e.attribute.toTableString());
      }
      page.total = rows.length;
      let temp = sorting(rows, page.orderId, page.orderType, page.orderBy);
      page.rows = temp.slice(page.startNum, page.lastNum);
      return page;
    },
    reformCanvas(){
      contentRect = content.getBoundingClientRect();
      canvas.reform({width: getHexNumCut(contentRect.width), height: getHexNumCut(contentRect.height), backgroundImage: BgMap});
      canvas.update();
    }
  });
  me = this;


  // Lazy Initialization ///////////////////////////////////////////////////////
  me.style.backgroundImage = "url(" + screenBG + ")";
  // setViewFilter
  let extractedDiseaseNames = [];
  staticDiseaseArray().forEach((e) => extractedDiseaseNames.push(e.name));
  commandList.setViewFilter(extractedDiseaseNames);
  // select Initialization
  commandList.trigger_onclickSelect();
  state.store('simulator.particles', {'length': 0});
  _.debounce(() => {
    me.reformCanvas();
  },1000)();


  // Event handler /////////////////////////////////////////////////////////////
  toolTipEvent.onEventEmitted = (e) => {
    const name = e.detail.getEventName();
    if('Simulator' != name.split('-')[0])return;
    const cont  = e.detail.getContents();
    if(null !== cont)toolTip.open(cont);
    else toolTip.collapse();
  }
  onResize.onEventEmitted = function(e){
    const name = e.detail.getEventName();
    if('window' != name.split('-')[0])return;
    const cont  = e.detail.getContents();
    cmdPlayCtrl.trigger_onclickStop(e);
    _.debounce(function(e){
      messageBox.addWarning('This Simulater resized, Simulation stoped');
      messageBox.turnOnMsgbox(e, content.getBoundingClientRect());
      me.reformCanvas();
    }, 300)();
  }

  
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  SimulatorController
};
