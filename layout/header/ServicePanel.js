/***
 * block:  focusView
 ***/
// Describe constant Class below
const ServicePanel = function(id) {
  return $SR.generateHtml `
  <div class="service-panel" id="${id}" >
    <button><span>Start</span></button>
    <button><span>Tutorial</span></button>
    <button><i class="fas fa-hand-holding-heart"></i><span></span></button>
  </div>
  `; // HTML end
}
export {
  ServicePanel
};
