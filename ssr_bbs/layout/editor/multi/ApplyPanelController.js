import { BtnAnimate               } from '/layout/components/btnAnimate/BtnAnimate';
import { BtnAnimateController     } from '/layout/components/btnAnimate/BtnAnimateController';


/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const ApplyPanelController   = function (applyPanelhandler) {

  // private variable //////////////////////////////////////////////////////////
  let   btnVaccine;
  let   btnHospotal;
  let   btnMask;
  let   btnDistance;
  let   btnLockdown;

  // mapping ///////////////////////////////////////////////////////////////////
  const template      = this.firstChild;

  // Event handler /////////////////////////////////////////////////////////////
  // inject.onclick = (e) => {
  //     applyPanelhandler.onclick_inject(e, this.paticleCnt);
  // }

  // Privilige Static Functions ////////////////////////////////////////////////
  //

  // Access Contorl: getter & setter ///////////////////////////////////////////
  // Object.defineProperties(this, {
  //   paticleCnt: {
  //     get: function() {
  //       const o = Number(paticleCnt.value);
  //       return ('NaN' === o)? 0:o;
  //     }
  //   }
  // });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    // onclick_btnVaccine (e) {
    //   console.log('ApplyPanelController/BtnAnimateController', e);
    // }
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  template.appendChild(new BtnAnimate('MultiEditor-ApplyPanel-Mask','fas fa-head-side-mask','Mask'));
  btnMask = $SR.View('MultiEditor-ApplyPanel-Mask').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnMask(e),
  });
  template.appendChild(new BtnAnimate('MultiEditor-ApplyPanel-Distance','fas fa-people-arrows','Distance')); //<i class="fas fa-user-lock"></i>
  btnDistance = $SR.View('MultiEditor-ApplyPanel-Distance').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnDistance(e),
  });
  template.appendChild(new BtnAnimate('MultiEditor-ApplyPanel-Lockdown','fas fa-user-lock','Lockdown')); //<i class="fas fa-user-lock"></i>
  btnLockdown = $SR.View('MultiEditor-ApplyPanel-Lockdown').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnLockdown(e),
  });
  template.appendChild(new BtnAnimate('MultiEditor-ApplyPanel-Hospital','fas fa-procedures','Hospital'));
  btnHospotal = $SR.View('MultiEditor-ApplyPanel-Hospital').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnHospital(e),
  });
  template.appendChild(new BtnAnimate('MultiEditor-ApplyPanel-Vaccine','fas fa-syringe','Vaccine'));
  btnVaccine = $SR.View('MultiEditor-ApplyPanel-Vaccine').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnVaccine(e),
  });
    
  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ApplyPanelController
};
