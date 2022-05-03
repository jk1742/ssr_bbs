/***
 * layout:  PanelNavBtns
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const ActiveBar   = function(preId) {
  return $SR.generateHtml `
  <div class="column" id="${preId}">
  </div>
  `; // HTML end
}
export {
  ActiveBar
};
