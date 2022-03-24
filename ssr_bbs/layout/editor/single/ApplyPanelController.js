import { BtnAnimate               } from '/layout/components/btnAnimate/BtnAnimate';
import { BtnAnimateController     } from '/layout/editor/single/BtnAnimateController';


/***
 * Layout:  EntryList
 ***/
// Describe EntryList Class below
const ApplyPanelController   = function (applyPanelhandler) {

  // private variable //////////////////////////////////////////////////////////
  let   btnVaccine;
  let   btnHospital;
  let   btnMask;
  let   btnDistance;
  let   btnLockdown;

  // mapping ///////////////////////////////////////////////////////////////////
  const template      = this.firstChild;

  // Privilige Static Functions ////////////////////////////////////////////////

  // Access Contorl: getter & setter ///////////////////////////////////////////
  Object.defineProperties(this, {
  //   paticleCnt: {
  //     get: () => ('NaN' === o)? 0:o
  //   }
  });

  // Access Control: public functions //////////////////////////////////////////
  Object.assign(this, {
    deactivateBtnMask     :(o) => btnMask.deactivate(o),
    deactivateBtnDistance :(o) => btnDistance.deactivate(o),
    deactivateBtnHospital :(o) => btnHospital.deactivate(o),
    deactivateBtnLockdown :(o) => btnLockdown.deactivate(o)
  });

  // Lazy Initialization ///////////////////////////////////////////////////////
  template.appendChild(new BtnAnimate('FocusEditor-ApplyPanel-Mask','fas fa-head-side-mask','Mask'));
  btnMask = $SR.View('FocusEditor-ApplyPanel-Mask').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnMask(e),
  });
  template.appendChild(new BtnAnimate('FocusEditor-ApplyPanel-Distance','fas fa-people-arrows','Distance')); //<i class="fas fa-user-lock"></i>
  btnDistance = $SR.View('FocusEditor-ApplyPanel-Distance').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnDistance(e),
  });
  template.appendChild(new BtnAnimate('FocusEditor-ApplyPanel-Hospital','fas fa-procedures','Hospital'));
  btnHospital = $SR.View('FocusEditor-ApplyPanel-Hospital').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnHospital(e),
  });
  template.appendChild(new BtnAnimate('FocusEditor-ApplyPanel-Lockdown','fas fa-user-lock','Lockdown')); //<i class="fas fa-user-lock"></i>
  btnLockdown = $SR.View('FocusEditor-ApplyPanel-Lockdown').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnLockdown(e),
  });
  template.appendChild(new BtnAnimate('FocusEditor-ApplyPanel-Vaccine','fas fa-syringe','Vaccine'));
  btnVaccine = $SR.View('FocusEditor-ApplyPanel-Vaccine').inject(BtnAnimateController, {
    onclick_btn: (e) => applyPanelhandler.onclick_btnVaccine(e),
  });
  btnVaccine.underlineColor  = '#bb3e3e';
  btnVaccine.defalutColor    = '#efefef';
  this.classList.add('top-space-vlite');

  // Event handler /////////////////////////////////////////////////////////////
  // inject.onclick = (e) => {
  //     applyPanelhandler.onclick_inject(e, this.paticleCnt);
  // }

  // End of Structure //////////////////////////////////////////////////////////
  return this;
}
export {
  ApplyPanelController
};
