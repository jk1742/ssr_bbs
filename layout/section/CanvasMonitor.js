/***
 * block:  focusView
 ***/
// Describe Layout below
const CanvasMonitor   = function(id) {
  return $SR.generateHtml `
  <canvas id ="${id}" style="position:relative;">
  `; // HTML end
}
export {
  CanvasMonitor
};
