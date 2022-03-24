/* eslint-disable no-undef */
import { ServicePanel   } from '/layout/header/ServicePanel';

/***
 * block:  focusView
 ***/
// Describe constant Class below
const Header   = function(id) {
  const servicePanel  = new ServicePanel('Header-ServicePanel');
  return $SR.generateHtml `
  <header id="${id}">
    <h2 class="head_text">Supplier Portal</h2>
    <div class="cont_head">
      <div class="head_mid">
        <!-- Header-ServicePanel -->
        ${servicePanel.outerHTML}
      </div>
    </div>
  </header>
  `; // HTML end
}
export {
  Header
};
