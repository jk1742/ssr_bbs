import { FRAME_SETTING } from '/class/static/DefineConst';
/***
 * block:  speed control buttons
 ***/
// Describe constant Class below
const EditorBotBar   = function(id) {
  return $SR.generateHtml `
  <div class="editor-bot-bar" id="${id}">
    <ul class="pop-status">
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="fas fa-male"></span></li>
      <li><span class="left-space-midium">0</span> <span>pop</span></li>
    </ul>
  </div>
  `; // HTML end
}
export {
  EditorBotBar
};
