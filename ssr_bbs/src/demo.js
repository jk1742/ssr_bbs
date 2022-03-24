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
import { Header                               } from '/layout/header/Header';
import { Section_MultiEditor  as MultiEditor  } from '/layout/editor/multi/Section_MultiEditor';
// import { Section_Simulator    as Simulator    } from '/layout/section/Section_Simulator';
// import { Section_FocusEditor  as FocusEditor  } from '/layout/editor/single/Section_FocusEditor';
// import { Section_Toaster      as Toaster      } from '/layout/editor/toaster/Section_Toaster';

// import controller ///////////////////////////////////////////////////////////
import { HeaderController                     } from '/layout/header/HeaderController';
import { MultiEditorController                } from '/layout/editor/multi/MultiEditorController';

// import { SimulatorController                  } from '/layout/section/SimulatorController';
// import { FocusEditorController                } from '/layout/editor/single/FocusEditorController';
// import { ToasterController                    } from '/layout/editor/toaster/ToasterController';
// import { SupportController                    } from '/layout/support/SupportController';

// initiate ////////////////////////////////////////////////////////////////////
import { initiate } from '/static/js/initiate';

// set logger //////////////////////////////////////////////////////////////////
let logger = new Logger();
logger.status = true;

console.log(
  'The print.js module has loaded! See the network tab in dev tools...'
);

// build plate
export default () => {
  // console.log('Button Clicked: Here\'s "some text"!', main);
  // btn_in_mod_run.onclick = () => {
  //     console.log('hello btn_in_mod_run');
  // };

  // layout dom //////////////////////////////////////////////////////////////////
  let header            = new Header('Header');
  let multiEditorCmpnt  = new MultiEditor('MultiEditor');

  const y = header.getBoundingClientRect().top + window.scrollY;
  console.log('test', y)

  // appending ///////////////////////////////////////////////////////////////////
  document.body.appendChild(header);
  document.body.appendChild(multiEditorCmpnt);

  // component load //////////////////////////////////////////////////////////////
  //window.onload = function(){

  // set language code
  document.documentElement.lang = 'en';

  // static functions //////////////////////////////////////////////////////////
  const navigate        = function(s){
    const t = document.getElementById(s);
    t.activateSection();
  }

  // mapping ///////////////////////////////////////////////////////////////////
  header = $SR.marge(HeaderController, header, {
    // simulator_activateSection     :(e)    =>  simulatorCmpnt.activateSection(),
    // support_activateSection       :(e)    =>  support.activateSection()
  });

  // MultiEditorController
  multiEditorCmpnt = $SR.marge(MultiEditorController, multiEditorCmpnt, {
    //simulator_uploadMultiPrtcls   :(e, p) =>  simulatorCmpnt.uploadMultiPrtcls(p, true),
    //simulator_confirmMultiPrtcls  :(e, p) =>  simulatorCmpnt.uploadMultiPrtcls(p, false),
    // simulator_triggerPlay         :(e, c) =>  simulatorCmpnt.triggerPlay(e),
    // simulator_triggerStop         :(e, c) =>  simulatorCmpnt.triggerStop(e),
    // simulator_triggerUndo         :(e, c) =>  simulatorCmpnt.triggerUndo(e),
    // simulator_triggerDel          :(e)    =>  simulatorCmpnt.triggerDel(e),
    // simulator_triggerClear        :(e)    =>  simulatorCmpnt.triggerClear(e),
    // simulator_injectVaccine       :(e, o) =>  simulatorCmpnt.injectVaccine(e, o),
    // simulator_toHospital          :(e, o) =>  simulatorCmpnt.toHospital(e, o),
    // simulator_putOnMask           :(e, o) =>  simulatorCmpnt.putOnMask(e, o),
    // simulator_keepDistance        :(e, o) =>  simulatorCmpnt.keepDistance(e, o),
    // simulator_lockdown            :(e, o) =>  simulatorCmpnt.lockdown(e, o),
    // simulator_addselectedPaticle  :(a)    =>  simulatorCmpnt.addselectedPaticle(a),
    // simulator_focusOn             :(o)    =>  simulatorCmpnt.focusOn(o),
    // simulator_getCavansParticles  :(c)    =>  simulatorCmpnt.getCavansParticles(c),
    // focusEditor_activateSection   :(e, o) =>  focusEditorCmpnt.activateSection(e, o),
    // toaster_activateSection       :()     =>  toasterCmpnt.activateSection(),
  });
  initiate();


};