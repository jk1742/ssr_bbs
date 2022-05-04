/***
 * layout:  DynamicBox
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const DynamicBox   = function(preId) {
  return $SR.generateHtml `
  <div class="column" id="${preId}">
  </div>
  `; // HTML end
}
export {
  DynamicBox
};
