/***
 * layout:  PanelNavBtns
 ***/
// Describe PanelNavBtns layout below
// has-text-right
const IconBtn   = function(icon) {
  return $SR.generateHtml `
  <a class="button">
    <i class="${icon}"></i>
  </a>
  `; // HTML end
}
export {
  IconBtn
}
