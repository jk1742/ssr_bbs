import '/layout/components/cmdPlayCtrl/CmdPlayCtrl.css';
/***
 * block:  speed control buttons
 ***/
// Describe SpeedCtrlBar Class below
const CmdPlayCtrl   = function(id) {
  return $SR.generateHtml `
  <div id ="${id}" class="cmd-play-ctrl">
    <button><i class="fas fa-backward"></i></button>
    <button><i class="fas fa-pause"></i></button>
    <button><i class="fas fa-play"></i></button>
    <button><i class="fas fa-forward"></i></button>
  </div>
  `; // HTML end
}
export {
  CmdPlayCtrl
};
