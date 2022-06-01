import '/layout/components/messageBox/MessageBox.css';

/***
 * block:  focusView
 ***/
// Describe Layout below
const MessageBox   = function(id) {
  return $SR.generateHtml `
  <div id="${id}" class="msgBox-overlay" style="display:none;">
  </div>
  `; // HTML end
}
export {
  MessageBox
}
