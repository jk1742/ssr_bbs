import '/layout/components/speedIndc/SpeedIndc.css';

/***
 * block:  speed control buttons
 ***/
// Describe SpeedCtrlBar Class below
const SpeedIndc   = function(id) {
  return $SR.generateHtml `
  <div id ="${id}" class="speed-indicator" data-index="1">
    <a>&#188;<span></span></a>
    <a>&#189;<span></span></a>
    <a>1<span></span></a>
    <a>2<span></span></a>
    <a>4<span></span></a>
  </div>
  `; // HTML end
}
export {
  SpeedIndc
};
