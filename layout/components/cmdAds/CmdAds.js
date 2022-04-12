import '/layout/components/cmdAds/CmdAds.css';

/***
 * block:  speed control buttons
 ***/
// Describe SpeedCtrlBar Class below
const CmdAds   = function(id) {
  return $SR.generateHtml `
  <div id ="${id}" class="cmd-ads">
    <button><i class="fas fa-ad"></i></button>
    <div class="cmd-ads-panel"></div>
  </div>
  `; // HTML end
}
export {
  CmdAds
};
