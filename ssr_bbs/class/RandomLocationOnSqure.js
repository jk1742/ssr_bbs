import { Point } from '/class/Point';
import { DEFALUT_RADIUS } from '/class/static/DefineConst';
const DEC_POINT = 4;
/**
 * class: RandomLocationOnSqure
 **/
// Describe Attribute Class below
let RandomLocationOnSqure = function(canvasWidth, canvasHeight) {
  const x = Number($SR.getRandomInt(DEFALUT_RADIUS, canvasWidth - DEFALUT_RADIUS))//.toFixed(DEC_POINT));
  const y = Number($SR.getRandomInt(DEFALUT_RADIUS, canvasHeight - DEFALUT_RADIUS))//.toFixed(DEC_POINT));
  return new Point(x,y);
}

// Declare RandomLocationOnSqure Class  *** Do not change line sequence ***
export { RandomLocationOnSqure };
