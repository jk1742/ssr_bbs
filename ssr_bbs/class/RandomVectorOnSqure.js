import { Vector } from '/class/Vector';
const DEC_POINT = 4;
/**
 * class: RandomVectorOnSqure
 **/
 // Describe RandomVectorOnSqure Class below
const RandomVectorOnSqure = function(canvasWidth, canvasHeight) {
  const x = Number(($SR.getRandomIntInclusive(-canvasWidth, canvasWidth) / (canvasWidth/2)))//.toFixed(DEC_POINT));
  const y = Number(($SR.getRandomIntInclusive(-canvasHeight, canvasHeight) / (canvasHeight/2)))//.toFixed(DEC_POINT));
  return new Vector( x, y);
}

// Declare RandomVectorOnSqure Class  *** Do not change line sequence ***
export { RandomVectorOnSqure };
