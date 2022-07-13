/***
 * layout:  IconBox
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const IconBox   = function(modelId, style) {
  return $SR.generateHtml `
  <div data-class="${modelId}" style="${style}">
  </div>
  `; // HTML end
}
export {
  IconBox
}
