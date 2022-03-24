import '/layout/components/btnAnimate/BtnAnimate.css';


/***
 * block:  focusView
 ***/
// Describe Layout below
const BtnAnimate   = function(id, icon, value) {
  return $SR.generateHtml `
  <button class="btnAnimate round" id="${id}" >
    <span>
      <i class="${icon}"></i>
      <span>${value}</span>
    </span>
  </button>
  `; // HTML end
}
export {
  BtnAnimate
};
