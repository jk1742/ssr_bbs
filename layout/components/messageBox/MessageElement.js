
/***
 * block:  MessageElement
 ***/
// Describe Layout below
const MessageElement   = function(id, subject, msg, type) {
  if('undefined' === typeof type) type = '';
  return $SR.generateHtml `
  <div id="${id}" class="msgBox-overlay-alert ${type}">
    <span class="msgBox-overlay-closebtn">&times;</span>
    <strong>${subject}</strong> ${msg}
  </div>
  `; // HTML end
}
export {
  MessageElement
};
