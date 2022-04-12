import '/layout/components/toolTip/ToolTip.css';


/***
 * block:  toggle-switch
 ***/
// Describe constant Class below
const ToolTip   = function(id) {
  return $SR.generateHtml `
  <span class="tool-tip-top" id="${id}"></span>
  `; // HTML end
}
export {
  ToolTip
};
