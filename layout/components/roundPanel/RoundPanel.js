/* eslint-disable no-undef */
/***
 * block:  focusView
 ***/
// Describe Layout below
const RoundPanel   = function(id) {
  return $SR.generateHtml `
  <div class="panel" id ="${id}">
    <div class="panel-contents round text-space">
    </div>
  </div>
  `; // HTML end
}
export {
  RoundPanel
};
