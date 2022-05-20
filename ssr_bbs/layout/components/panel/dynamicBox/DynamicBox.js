/***
 * layout:  DynamicBox
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const DynamicBox   = function(modelId, style) {
  return $SR.generateHtml `
  <div data-id="${modelId}" style="${style}">
  </div>
  `; // HTML end
}
export {
  DynamicBox
};
