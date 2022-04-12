/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// import library & font & icons & css
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '/static/css/style.css';

// import utility //////////////////////////////////////////////////////////////
import { Logger }  from '/class/Logger';

// import class object //////////////////////////////////////////////////////////

// import layout ///////////////////////////////////////////////////////////////
// import { Header                               } from '/layout/header/Header';
// import { Section_Simulator    as Simulator    } from '/layout/section/Section_Simulator';
// import { Section_FocusEditor  as FocusEditor  } from '/layout/editor/single/Section_FocusEditor';
// import { Section_MultiEditor  as MultiEditor  } from '/layout/editor/multi/Section_MultiEditor';
// import { Section_Toaster      as Toaster      } from '/layout/editor/toaster/Section_Toaster';

// import controller ///////////////////////////////////////////////////////////
// import { HeaderController                     } from '/layout/header/HeaderController';
// import { SimulatorController                  } from '/layout/section/SimulatorController';
// import { FocusEditorController                } from '/layout/editor/single/FocusEditorController';
// import { MultiEditorController                } from '/layout/editor/multi/MultiEditorController';
// import { ToasterController                    } from '/layout/editor/toaster/ToasterController';
// import { SupportController                    } from '/layout/support/SupportController';

// initiate ////////////////////////////////////////////////////////////////////
// import { initiate } from '/static/js/initiate';


// set logger //////////////////////////////////////////////////////////////////
let logger = new Logger();
logger.status = true;

async function getComponent() {
  // import { Support                              } from '/layout/support/Support';
  // let support = new Support('Support');
  // document.body.appendChild(support);
  const Support = await import('/layout/support/Support');  
  return Support;
 }

const buildFrame  = function(e){
  const inHeight    = window.innerHeight;
  const outHeight   = inHeight + 100;
  let   topHeight   = 0;
  let   btmHeight   = 0;
  e.style.height    = `${outHeight}px`;
  e.style.width     = `${window.innerWidth}px`;
  let   topElements = e.getElementsByClassName('frame-top');
  if(0 < topElements.length) {
    const el        = topElements[0];
    topHeight       = el.getBoundingClientRect().height;
  }
  let   bottomElements = e.getElementsByClassName('frame-btm');
  if(0 < bottomElements.length) {
    const elBtm           = bottomElements[0];
    const elHeight        = elBtm.getBoundingClientRect().height;
    elBtm.style.position  = 'absolute';
    elBtm.style.top       = `${(i * outHeight + inHeight + 2) - elHeight}px`;
    elBtm.style.left      = '0px';
    elBtm.style.right     = '0px';
    btmHeight             = elHeight;
  }
  let   midElements = e.getElementsByClassName('frame-mid');
  if(0 < midElements.length) {
    const el              = midElements[0];
    el.style.height       = `${inHeight - (topHeight + btmHeight)}px`;
  }
  return e;
}

// layout dom //////////////////////////////////////////////////////////////////
let header            = new Header('Header');
let simulatorCmpnt    = new Simulator('Simulator');
let focusEditorCmpnt  = new FocusEditor('FocusEditor');
let multiEditorCmpnt  = new MultiEditor('MultiEditor');
let toasterCmpnt      = new Toaster('Toaster');


// appending ///////////////////////////////////////////////////////////////////
document.body.appendChild(header);
document.body.appendChild(simulatorCmpnt);
document.body.appendChild(focusEditorCmpnt);
document.body.appendChild(multiEditorCmpnt);
document.body.appendChild(toasterCmpnt);




// component load //////////////////////////////////////////////////////////////
window.onload = function(){

  // set language code
  document.documentElement.lang = 'en';

  // static functions //////////////////////////////////////////////////////////
  const navigate        = function(s){
    const t = document.getElementById(s);
    t.activateSection();
  }

  // mapping ///////////////////////////////////////////////////////////////////
  header = $SR.marge(HeaderController, header, {
    simulator_activateSection     :(e)    =>  simulatorCmpnt.activateSection(),
    support_activateSection       :(e)    =>  support.activateSection()
  });
  simulatorCmpnt = $SR.marge(SimulatorController, simulatorCmpnt, {
    header_activateSection        :()     =>  header.activateSection(),
    focusEditor_activateSection   :(e, c) =>  focusEditorCmpnt.activateSection(e,c),
    focusEditor_clearInfoTable    :()     =>  focusEditorCmpnt.bind_infoTableClear(),
    focusEditor_bindSocialGroup   :(c)    =>  focusEditorCmpnt.bind_socialGroup(c),
    focusEditor_bindInfoTable     :(e)    =>  focusEditorCmpnt.bindInfoTable(e),
    focusEditor_onInfoTable       :()     =>  focusEditorCmpnt.switchInfoTable = true,
    multiEditor_activateSection   :(e, c) =>  multiEditorCmpnt.activateSection(e,c),
    multiEditor_updateTable       :(o)    =>  multiEditorCmpnt.updateTable(o),
    multiEditor_updateLivetime    :(o)    =>  multiEditorCmpnt.updateLivetime(o),
    toaster_activateSection       :()     =>  toasterCmpnt.activateSection(),
    toaster_updatePopCnt          :(o)    =>  toasterCmpnt.updatePopCnt(o),
  });

  // FocusEditorController
  focusEditorCmpnt = $SR.marge(FocusEditorController, focusEditorCmpnt, {
    simulator_uploadInfo          :(e, c) =>  simulatorCmpnt.uploadInfo(c, true),
    simulator_confirmInfo         :(e, c) =>  simulatorCmpnt.uploadInfo(c, false),
    simulator_triggerPlay         :(e, c) =>  simulatorCmpnt.triggerPlay(e),
    simulator_triggerStop         :(e, c) =>  simulatorCmpnt.triggerStop(e),
    simulator_triggerUndo         :(e, c) =>  simulatorCmpnt.triggerUndo(e),
    simulator_injectVaccine       :(e, o) =>  simulatorCmpnt.injectVaccine(e, o),
    simulator_toHospital          :(e, o) =>  simulatorCmpnt.toHospital(e, o),
    simulator_putOnMask           :(e, o) =>  simulatorCmpnt.putOnMask(e, o),
    simulator_keepDistance        :(e, o) =>  simulatorCmpnt.keepDistance(e, o),
    simulator_lockdown            :(e, o) =>  simulatorCmpnt.lockdown(e, o),
    simulator_activateSection     :(e)    =>  simulatorCmpnt.activateSection(),
    multiEditor_activateSection   :(e, c) =>  multiEditorCmpnt.activateSection(e),
  });

  // MultiEditorController
  multiEditorCmpnt = $SR.marge(MultiEditorController, multiEditorCmpnt, {
    //simulator_uploadMultiPrtcls   :(e, p) =>  simulatorCmpnt.uploadMultiPrtcls(p, true),
    //simulator_confirmMultiPrtcls  :(e, p) =>  simulatorCmpnt.uploadMultiPrtcls(p, false),
    simulator_triggerPlay         :(e, c) =>  simulatorCmpnt.triggerPlay(e),
    simulator_triggerStop         :(e, c) =>  simulatorCmpnt.triggerStop(e),
    simulator_triggerUndo         :(e, c) =>  simulatorCmpnt.triggerUndo(e),
    simulator_triggerDel          :(e)    =>  simulatorCmpnt.triggerDel(e),
    simulator_triggerClear        :(e)    =>  simulatorCmpnt.triggerClear(e),
    simulator_injectVaccine       :(e, o) =>  simulatorCmpnt.injectVaccine(e, o),
    simulator_toHospital          :(e, o) =>  simulatorCmpnt.toHospital(e, o),
    simulator_putOnMask           :(e, o) =>  simulatorCmpnt.putOnMask(e, o),
    simulator_keepDistance        :(e, o) =>  simulatorCmpnt.keepDistance(e, o),
    simulator_lockdown            :(e, o) =>  simulatorCmpnt.lockdown(e, o),
    simulator_addselectedPaticle  :(a)    =>  simulatorCmpnt.addselectedPaticle(a),
    simulator_focusOn             :(o)    =>  simulatorCmpnt.focusOn(o),
    simulator_getCavansParticles  :(c)    =>  simulatorCmpnt.getCavansParticles(c),
    focusEditor_activateSection   :(e, o) =>  focusEditorCmpnt.activateSection(e, o),
    toaster_activateSection       :()     =>  toasterCmpnt.activateSection(),
  });

  // MultiEditorController
  toasterCmpnt = $SR.marge(ToasterController, toasterCmpnt, {
    simulator_triggerStop         :(e, c) =>  simulatorCmpnt.triggerStop(e),
    simulator_triggerUndo         :(e, c) =>  simulatorCmpnt.triggerUndo(e),
    simulator_popParticles        :(p, c) =>  simulatorCmpnt.popParticles(p,c),
    multiEditor_activateSection   :(e, c) =>  multiEditorCmpnt.activateSection(e, c),
  });

  // let support = new Support('Support');
  // document.body.appendChild(support);
  // support = $SR.marge(SupportController, support, {
  //   undoNavigate                  :(e, s) =>  navigate(s)
  // });
  let support;

  getComponent().then((o) => {
    support = new o.Support('Support');
    document.body.appendChild(buildFrame(support));
    support = $SR.marge(SupportController, support, {
      undoNavigate :(e, s) =>  navigate(s)
    });
    initPayPalButton();
  });

  // initiate ////////////////////////////////////////////////////////////////////
  initiate();
  //(adsbygoogle = window.adsbygoogle || []).push({});\
  /*
  function initPayPalButton() {
    paypal.Buttons({
      style: {
        shape   : 'rect',
        color   : 'blue',
        layout  : 'horizontal',
        label   : 'paypal',
      },
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{"description":"Ticket of monthly supporters","amount":{"currency_code":"USD","value":10}}]
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      },
      onError: function(err) {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }
  */
  // initPayPalButton();
}