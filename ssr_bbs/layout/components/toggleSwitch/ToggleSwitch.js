import '/layout/components/toggleSwitch/ToggleSwitch.css';


/***
 * block:  toggle-switch
 ***/
// Describe constant Class below
const ToggleSwitch   = function(id) {
  return $SR.generateHtml `
  <label class="toggle-switch" id="${id}">
    <input type="checkbox" checked>
    <span class="toggle-switch-slider round-circle"></span>
  </label>
  `; // HTML end
}
export {
  ToggleSwitch
};
