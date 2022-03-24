import '/layout/components/positionInfo/PositionInfo.css';

/***
 * block:  PositionInfo buttons
 ***/
// Describe PositionInfo Class below
const PositionInfo   = function(id) {
  return $SR.generateHtml `
  <ul class="PositionInfo" id="${id}">
    <li><span><i class="fas fa-map-marker-alt"></i></span></li>
    <li><span><span>x</span><span>00</span></span></li>
    <li><span><span>y</span><span>00</span></span></li>
  </ul>
  `; // HTML end
}
export {
  PositionInfo
};
