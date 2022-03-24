import '/layout/support/Contents.css';

/***
 * block:  Contents
 ***/
// Describe constant Class below
const Contents   = function(id) {
  return $SR.generateHtml `
  <div class="support-contents" id="${id}">
  </div>
  `; // HTML end
}
export {
  Contents
};
