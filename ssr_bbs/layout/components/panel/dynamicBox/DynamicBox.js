/***
 * layout:  DynamicBox
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const DynamicBox   = function(modelId) {
  return $SR.generateHtml `
  <div class="column" data-id="${modelId}">
  </div>
  `; // HTML end
}
export {
  DynamicBox
};
